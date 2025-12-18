import { Booking, Stay } from "@/modal";
import catchAsync from "@/library/catch_async";
import { createBookingJoi, updateBookingJoi, quoteBookingJoi} from "@/validation";
import handleFactory from "./handle.service";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(utc);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const createBooking = handleFactory.createOne(Booking, createBookingJoi);

export const getSingleBooking = handleFactory.getOne(Booking);

export const getAllBookings = handleFactory.getAll(Booking);

export const updateBooking = handleFactory.updateOne(Booking, updateBookingJoi);

export const deleteBooking = handleFactory.deleteOne(Booking);


// Utility functions
function isWeekend(date: dayjs.Dayjs, includeFriday: boolean) {
  const day = date.day();
  if (includeFriday) return day === 5 || day === 6 || day === 0; // Fri, Sat, Sun
  return day === 6 || day === 0; // Sat, Sun
}

function countNights(startISO: string, endISO: string, includeFriday: boolean) {
  const start = dayjs.utc(startISO).startOf('day');
  const end = dayjs.utc(endISO).startOf('day');
  const nights = end.diff(start, "day");
  
  let weekend = 0;
  for (let i = 0; i < nights; i++) {
    const d = start.add(i, "day");
    if (isWeekend(d, includeFriday)) weekend++;
  }
  
  return { nights, weekend, weekday: nights - weekend };
}

function currency(n: number) {
  return Number.parseFloat(Number(n).toFixed(2));
}

function calculateTotals({
  startISO,
  endISO,
  listing,
  totalGuests,
  no_of_guests,
  extra_services_total = 0,
}: {
  startISO: string;
  endISO: string;
  listing: any;
  totalGuests: number;
  no_of_guests: any;
  extra_services_total?: number;
}) {
  // Extract pricing from the nested structure
  const pricing = listing.pricing || {};
  const rules = listing.rules || {};
  
  const includeFriday = pricing.apply_weekend_price === "Friday, Saturday, and Sunday";
  const { nights, weekend, weekday } = countNights(startISO, endISO, includeFriday);

  const weekendPriceApplied = !!(pricing.apply_weekend_price && pricing.apply_weekend_price !== "None");
  const nightly = Number(pricing.nightly_price || 0);
  const sevenPlus = Number(pricing.nightly_price_seven_plus || nightly);
  const thirtyPlus = Number(pricing.nightly_price_thirty_plus || sevenPlus);

  // Determine which price to use based on stay length
  let baseWeekdayRate = nightly;
  let baseWeekendRate = weekendPriceApplied ? Number(pricing.weekend_nightly_price || nightly) : nightly;
  
  if (nights > 30) {
    baseWeekdayRate = thirtyPlus;
    baseWeekendRate = weekendPriceApplied ? Number(pricing.weekend_nightly_price || thirtyPlus) : thirtyPlus;
  } else if (nights > 7) {
    baseWeekdayRate = sevenPlus;
    baseWeekendRate = weekendPriceApplied ? Number(pricing.weekend_nightly_price || sevenPlus) : sevenPlus;
  }

  let base = weekday * baseWeekdayRate + weekend * baseWeekendRate;

  // Cleaning/City fees - these might not be in your schema
  const cleaningFee = Number(pricing.cleaning_fee || 0);
  const cityFee = Number(pricing.city_fee || 0);
  
  // Default to one-time fees if frequency is not specified
  const totalCleaningFee = cleaningFee;
  const totalCityFee = cityFee;

  // Additional guests - these fields might not be in your schema
  let addGuestsQty = 0;
  let addGuestsPrice = 0;
  
  // Pets
  const petsPrice = Number(no_of_guests.pets || 0) * Number(pricing.price_per_pet || 0);

  // Subtotal before platform/tax/stripe
  let subtotal = base + totalCleaningFee + totalCityFee + addGuestsPrice + extra_services_total + petsPrice;

  // Platform 11%
  const platformFee = subtotal * 0.11;
  
  // Taxes
  const taxPct = Number(pricing.tax_percentage || 0) / 100;
  const taxAmount = (subtotal + platformFee) * taxPct;
  
  // Total after taxes
  const amountAfterTax = subtotal + platformFee + taxAmount;
  
  // Stripe 3%
  const stripeAmount = amountAfterTax * 0.03;
  const hostAmount = amountAfterTax - stripeAmount;

  return {
    nights,
    weekday,
    weekend,
    totalNightlyAmount: currency(base),
    totalCleaningFee: currency(totalCleaningFee),
    totalCityFee: currency(totalCityFee),
    additionalGuestsQuantity: addGuestsQty,
    additionalGuestsPrice: currency(addGuestsPrice),
    petsPrice: currency(petsPrice),
    extraServicesPrice: currency(extra_services_total),
    platformFee: currency(platformFee),
    taxAmount: currency(taxAmount),
    stripeAmount: currency(stripeAmount),
    hostAmount: currency(hostAmount),
    amountAfterTax: currency(amountAfterTax),
    totalAmount: currency(amountAfterTax + stripeAmount),
  };
}

export const getBookingAmount = catchAsync(async (req, res) => {
  try {
    // Validate with Joi instead of Zod
    const { error, value } = quoteBookingJoi.validate(req.body, { abortEarly: false });
    
    if (error) {
      return res.status(400).json({ 
        error: "Validation failed", 
        details: error.details.map(d => d.message) 
      });
    }

    const { stay, no_of_guests, arrival_date, departure_date, extra_services_total } = value;

    if (dayjs.utc(arrival_date).isBefore(dayjs.utc().startOf("day"))) {
      return res.status(400).json({ error: "Arrival date cannot be in the past." });
    }

    const listing = await Stay.findOne({ _id: stay });
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    const totalGuests = Number(no_of_guests.adults || 0) + Number(no_of_guests.children || 0);
    const minN = Number(listing.rules?.min_day_booking || 1);
    const maxN = Number(listing.rules?.max_day_booking || 365);
    const { nights } = countNights(
      arrival_date,
      departure_date,
      listing.pricing?.apply_weekend_price === "Friday, Saturday, and Sunday"
    );

    if (nights < minN) return res.status(400).json({ error: `Minimum stay is ${minN} night(s)` });
    if (nights > maxN) return res.status(400).json({ error: `Maximum stay is ${maxN} night(s)` });
    if (Number(no_of_guests.pets || 0) > 0 && !listing.rules?.pets_allowed) {
      return res.status(400).json({ error: "Pets are not allowed for this listing" });
    }
    if (Number(no_of_guests.children || 0) > 0 && !listing.rules?.children_allowed) {
      return res.status(400).json({ error: "Children are not allowed for this listing" });
    }

    const totals = calculateTotals({
      startISO: arrival_date,
      endISO: departure_date,
      listing,
      totalGuests,
      no_of_guests,
      extra_services_total: extra_services_total || 0,
    });

    return res.json({ stay, arrival_date, departure_date, no_of_guests, ...totals });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message || "Bad Request" });
  }
});