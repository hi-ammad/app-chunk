import { expect, it, } from "bun:test";
import { app, buildCreateBusinessPaymentPayload, buildUpdateBusinessPaymentPayload, compareTargetAgainstSource, hasOnlyKeys, Route } from './utils';
import { getAccessToken, } from './setup';

it(`POST ${Route.businessPayment} -> should register business payments`, async () => {

  const res = await app.post(Route.businessPayment).send(buildCreateBusinessPaymentPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateBusinessPaymentPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.businessPayment}/${buildCreateBusinessPaymentPayload()._id} -> should update business payments`, async () => {
  const res = await app.patch(`${Route.businessPayment}/${buildCreateBusinessPaymentPayload()._id}`).send(buildUpdateBusinessPaymentPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateBusinessPaymentPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.businessPayment}/${buildCreateBusinessPaymentPayload()._id} -> should get business payments`, async () => {
  const res = await app.get(`${Route.businessPayment}/${buildCreateBusinessPaymentPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateBusinessPaymentPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.businessPayment}/${buildCreateBusinessPaymentPayload()._id} -> should delete business payments`, async () => {

  const res = await app.delete(`${Route.businessPayment}/${buildCreateBusinessPaymentPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.businessPayment} -> should get all business payments`, async () => {

  const res = await app.get(`${Route.businessPayment}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(100);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(100);
});

it(`GET ${Route.businessPayment}?select=business -> only select business payments `, async () => {
  const res = await app
    .get(`${Route.businessPayment}`)
    .query({ select: 'business' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.businessPayment}?sort_by=status should return business payments by status in ascending order`, async () => {
  const res = await app
    .get(`${Route.businessPayment}`)
    .query({ sort_by: 'status' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const paymentStatuses = res.body.data.docs.map((b: any) => b.name);

  // Check if the names are sorted
  const sorted = [...paymentStatuses].sort((a, b) => a.localeCompare(b));
  expect(paymentStatuses).toEqual(sorted);
});

it(`GET ${Route.businessPayment}?sort_by=-status should return business payments sorted by status in descending order`, async () => {

  const res = await app
    .get(`${Route.businessPayment}`)
    .query({ sort_by: '-status' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const paymentStatuses = res.body.data.docs.map((b: any) => b.bed_type);

  // Check if the names are sorted
  const sorted = [...paymentStatuses].sort((a, b) => b.localeCompare(a));
  expect(paymentStatuses).toEqual(sorted);
});

it(`GET ${Route.businessPayment}?page=1&limit=10 -> should get only 10 business docs (pagination)`, async () => {

  const res = await app.get(`${Route.businessPayment}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.businessPayment}?stripe_payment_method=card -> should get business where stripe_payment_method == card (filtering)`, async () => {
  const res = await app.get(`${Route.businessPayment}`)
    .query({ 'stripe_payment_method': "card" })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.stripe_payment_method).toBe("card");
  }
});

it(`GET ${Route.businessPayment}?status="paid" -> should get business payment where status is "paid"  (filtering)`, async () => {
  const res = await app.get(`${Route.businessPayment}`)
    .query({ 'distance_from_runway[lt]': 40 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.status).toBe("paid");
  }
});

