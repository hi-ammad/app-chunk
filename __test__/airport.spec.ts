
import { expect, it } from "bun:test";
import { app, buildCreateAirportPayload, buildUpdateAirportPayload, compareTargetAgainstSource, hasOnlyKeys, Route } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.airport} -> should register airport`, async () => {
  const res = await app.post(Route.airport).send(buildCreateAirportPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateAirportPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.airport}/${buildCreateAirportPayload()._id} -> should update airport`, async () => {
  const res = await app.patch(`${Route.airport}/${buildCreateAirportPayload()._id}`).send(buildUpdateAirportPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateAirportPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.airport}/${buildCreateAirportPayload()._id} -> should get airport`, async () => {
  const res = await app.get(`${Route.airport}/${buildCreateAirportPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateAirportPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.airport}/${buildCreateAirportPayload()._id} -> should delete airport`, async () => {
  const res = await app.delete(`${Route.airport}/${buildCreateAirportPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.airport} -> should get all airport`, async () => {

  const res = await app.get(`${Route.airport}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.airport}?select=dimension_feets,dimension_meters`, async () => {
  const res = await app
    .get(`${Route.airport}`)
    .query({ select: 'dimension_feets,dimension_meters' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['dimension_feets,dimension_feets,id'])).toBeTrue();
  }
});

it(`GET ${Route.airport}?sort_by=airport_name should return airport by airport_name in ascending order`, async () => {
  const res = await app
    .get(`${Route.airport}`)
    .query({ sort_by: 'airport_name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const airportNames = res.body.data.docs.map((b: any) => b.airport_name);

  // Check if the names are sorted
  const sorted = [...airportNames].sort((a, b) => a.localeCompare(b));
  expect(airportNames).toEqual(sorted);
});

it(`GET ${Route.airport}?sort_by=dimension_feets should return airport sorted by dimension_feets in descending order`, async () => {

  const res = await app
    .get(`${Route.airport}`)
    .query({ sort_by: '-dimension_feets' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const dimension_feets = res.body.data.docs.map((b: any) => b.dimension_feets);

  // Check if the names are sorted
  const sorted = [...dimension_feets].sort((a, b) => b.localeCompare(a));
  expect(dimension_feets).toEqual(sorted);
});

it(`GET ${Route.airport}?page=1&limit=10 -> should get only 10 airport docs (pagination)`, async () => {

  const res = await app.get(`${Route.airport}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.airport}?dimension_feets[gt]=10 -> should get airports where dimension_feets > 10 (filtering)`, async () => {
  const res = await app.get(`${Route.airport}`)
    .query({ 'dimension_feets[gt]': 10 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.dimension_feets).toBeGreaterThan(10);
  }
});

it(`GET ${Route.airport})?elevation_feets[lt]=40 -> should get booking expense where elevation_feets < 40 (filtering)`, async () => {
  const res = await app.get(`${Route.airport}`)
    .query({ 'elevation_feets[lt]': 40 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.elevation_feets).toBeLessThan(40);
  }
});

it(`GET ${Route.airport}?elevation_meters=10 -> should get airport where elevation_meters == 10 (filtering)`, async () => {
  const res = await app.get(`${Route.airport}`)
    .query({ 'elevation_meters': 10 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.elevation_meters).toBe(10);
  }
});

it(`GET ${Route.airport}?elevation_feets[2]=1&elevation_meters[gt]=20 -> should get airports where elevation_feets == 2 & elevation_meters > 20 (filtering)`, async () => {
  const res = await app.get(`${Route.airport}`)
    .query({ 'elevation_feets': 2, 'elevation_meters[gt]': 20 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.elevation_feets).toBe(2);
    expect(doc.elevation_meters).toBeGreaterThan(20);
  }
});
