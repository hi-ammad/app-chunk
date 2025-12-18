import { expect, it } from "bun:test";
import { app, buildCreateBookingPayload, buildUpdateBookingPayload, compareTargetAgainstSource, hasOnlyKeys, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.booking} -> should register booking`, async () => {
  const res = await app.post(Route.booking).send(buildCreateBookingPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateBookingPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.booking}/${buildCreateBookingPayload()._id} -> should update booking`, async () => {
  const res = await app.patch(`${Route.booking}/${buildCreateBookingPayload()._id}`).send(buildUpdateBookingPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateBookingPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.booking}/${buildCreateBookingPayload()._id} -> should get booking`, async () => {
  const res = await app.get(`${Route.booking}/${buildCreateBookingPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateBookingPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.booking}/${buildCreateBookingPayload()._id} -> should delete booking`, async () => {
  const res = await app.delete(`${Route.booking}/${buildCreateBookingPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.booking} -> should get all bookings`, async () => {

  const res = await app.get(`${Route.booking}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.booking}?select=amount,taxes -> only select booking  `, async () => {
  const res = await app
    .get(`${Route.booking}`)
    .query({ select: 'amount,taxes' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['amount,'])).toBeTrue();
  }
});

it(`GET ${Route.booking}?sort_by=createdAt should return booking  by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.booking}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.booking}?sort_by=-updatedAt should return booking  sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.booking}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.booking}?page=1&limit=10 -> should get only 10 booking  docs (pagination)`, async () => {

  const res = await app.get(`${Route.booking}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.booking}?amount[gt]=300 -> should get where amount > 300 (filtering)`, async () => {
  const res = await app.get(`${Route.booking}`)
    .query({ 'amount[gt]': 300 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.amount).toBeGreaterThan(300);
  }
});


it(`GET ${Route.booking}?amount[lt]=300 -> should get where amount < 300 (filtering)`, async () => {
  const res = await app.get(`${Route.booking}`)
    .query({ 'amount[lt]': 300 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.amount).toBeLessThan(300);
  }
});

it(`GET ${Route.booking}?no_of_guests=10 -> should get where no_of_guests == 10 (filtering)`, async () => {
  const res = await app.get(`${Route.booking}`)
    .query({ 'no_of_guests': 10 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.no_of_guests).toBe(10);
  }
});

it(`GET ${Route.booking}?taxes[gt]=300&taxes[lt]=600 -> should get where amount > 300 (filtering)`, async () => {
  const res = await app.get(`${Route.booking}`)
    .query({ 'taxes[gt]': 300, 'taxes[lt]': 600 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.taxes).toBeGreaterThan(300);
    expect(doc.taxes).toBeLessThan(600);
  }
});

it(`GET ${Route.booking}?stay=${signUpTemplate._id} -> should get where stay === ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.booking}`)
    .query({ 'stay': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.stay).toBe(signUpTemplate._id);
  }
});
