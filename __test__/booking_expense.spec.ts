import { expect, it } from "bun:test";
import { app, buildCreateBookingExpensePayload, buildUpdateBookingExpensePayload, compareTargetAgainstSource, hasOnlyKeys, Route } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.bookingExpense} -> should register booking expense`, async () => {
  const res = await app.post(Route.bookingExpense).send(buildCreateBookingExpensePayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateBookingExpensePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.bookingExpense}/${buildCreateBookingExpensePayload()._id} -> should update booking expense`, async () => {
  const res = await app.patch(`${Route.bookingExpense}/${buildCreateBookingExpensePayload()._id}`).send(buildUpdateBookingExpensePayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateBookingExpensePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.bookingExpense}/${buildCreateBookingExpensePayload()._id} -> should get single booking expense`, async () => {
  const res = await app.get(`${Route.bookingExpense}/${buildCreateBookingExpensePayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateBookingExpensePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.bookingExpense}/${buildCreateBookingExpensePayload()._id} -> should delete business`, async () => {
  const res = await app.delete(`${Route.bookingExpense}/${buildCreateBookingExpensePayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.bookingExpense} -> should get all booking expense`, async () => {

  const res = await app.get(`${Route.bookingExpense}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});


it(`GET ${Route.bookingExpense}?select=bed,bed_type`, async () => {
  const res = await app
    .get(`${Route.bookingExpense}`)
    .query({ select: 'bed,bed_type' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['bed,bed_type,id'])).toBeTrue();
  }
});

it(`GET ${Route.bookingExpense}?sort_by=bed_type should return booking expense by bed_type in ascending order`, async () => {
  const res = await app
    .get(`${Route.bookingExpense}`)
    .query({ sort_by: 'bed_type' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const names = res.body.data.docs.map((b: any) => b.name);

  // Check if the names are sorted
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(sorted);
});

it(`GET ${Route.bookingExpense}?sort_by=-bed_type should return booking expense sorted by bed_type in descending order`, async () => {

  const res = await app
    .get(`${Route.bookingExpense}`)
    .query({ sort_by: '-bed_type' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const names = res.body.data.docs.map((b: any) => b.bed_type);

  // Check if the names are sorted
  const sorted = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sorted);
});

it(`GET ${Route.bookingExpense}?page=1&limit=10 -> should get only 10 booking exppense docs (pagination)`, async () => {

  const res = await app.get(`${Route.bookingExpense}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.bookingExpense}?bed[gt]=10 -> should get booking expense where bed > 10 (filtering)`, async () => {
  const res = await app.get(`${Route.bookingExpense}`)
    .query({ 'bed[gt]': 10 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.bed).toBeGreaterThan(10);
  }
});

it(`GET ${Route.bookingExpense}?bed[lt]=10 -> should get booking expense where bed < 40 (filtering)`, async () => {
  const res = await app.get(`${Route.bookingExpense}`)
    .query({ 'bed[lt]': 40 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.bed).toBeLessThan(40);
  }
});

it(`GET ${Route.bookingExpense}?bed=10 -> should get booking expense where bed == 10 (filtering)`, async () => {
  const res = await app.get(`${Route.bookingExpense}`)
    .query({ 'bed': 10 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.bed).toBe(10);
  }
});

it(`GET ${Route.bookingExpense}?bed_type=1&bed[gt]=20 -> should get booking expense where distance_from_runway < 5 (filtering)`, async () => {
  const res = await app.get(`${Route.bookingExpense}`)
    .query({ 'bed_type': 1, 'bed[gt]': 20 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.bed).toBeLessThan(10);
  }
});


