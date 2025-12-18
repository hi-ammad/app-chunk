import { expect, it } from "bun:test";
import { app, applyFieldsFromObject, buildCreateBusinessPayload, buildUpdateBusinessPayload, compareTargetAgainstSource, hasOnlyKeys, Route } from './utils';
import { getAccessToken } from './setup';


it(`POST ${Route.business} -> should register business`, async () => {

  const res = await applyFieldsFromObject(app.post(Route.business), buildCreateBusinessPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateBusinessPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.business}/${buildCreateBusinessPayload()._id} -> should update business`, async () => {
  const res = await app.patch(`${Route.business}/${buildCreateBusinessPayload()._id}`).send(buildUpdateBusinessPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateBusinessPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.business}/${buildCreateBusinessPayload()._id} -> should get business`, async () => {

  const res = await app.get(`${Route.business}/${buildCreateBusinessPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateBusinessPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.business}/${buildCreateBusinessPayload()._id} -> should delete business`, async () => {

  const res = await app.delete(`${Route.business}/${buildCreateBusinessPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});


it(`GET ${Route.business} -> should get all business`, async () => {

  const res = await app.get(`${Route.business}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(100);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(100);
});

it(`GET ${Route.business}?select=name`, async () => {
  const res = await app
    .get(`${Route.business}`)
    .query({ select: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.business}?sort_by=name should return business by name in ascending order`, async () => {
  const res = await app
    .get(`${Route.business}`)
    .query({ sort_by: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const names = res.body.data.docs.map((b: any) => b.name);

  // Check if the names are sorted
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(sorted);
});

it(`GET ${Route.business}?sort_by=-name should return business sorted by name in descending order`, async () => {

  const res = await app
    .get(`${Route.business}`)
    .query({ sort_by: '-name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const names = res.body.data.docs.map((b: any) => b.bed_type);

  // Check if the names are sorted
  const sorted = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sorted);
});

it(`GET ${Route.business}?page=1&limit=10 -> should get only 10 business docs (pagination)`, async () => {

  const res = await app.get(`${Route.business}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.business}?distance_from_runway[gt]=10 -> should get business where distance_from_runway > 10 (filtering)`, async () => {
  const res = await app.get(`${Route.business}`)
    .query({ 'distance_from_runway[gt]': 10 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.distance_from_runway).toBeGreaterThan(10);
  }
});

it(`GET ${Route.business}?distance_from_runway[lt]=10 -> should get business where distance_from_runway < 40 (filtering)`, async () => {
  const res = await app.get(`${Route.business}`)
    .query({ 'distance_from_runway[lt]': 40 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.distance_from_runway).toBeLessThan(40);
  }
});

it(`GET ${Route.business}?distance_from_runway=10 -> should get business where bed == 10 (filtering)`, async () => {
  const res = await app.get(`${Route.business}`)
    .query({ 'distance_from_runway': 10 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.distance_from_runway).toBe(10);
  }
});

it(`GET ${Route.business}?distance_from_runway[gt]=10&distance_from_runway[lt]=20 -> should get business where distance_from_runway > 10 and < 20 (filtering)`, async () => {
  const res = await app.get(`${Route.business}`)
    .query({ 'bed_type': 1, 'bed[gt]': 20 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.distance_from_runway).toBeGreaterThan(10);
    expect(doc.distance_from_runway).toBeLessThan(20);
  }
});
