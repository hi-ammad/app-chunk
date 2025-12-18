import { expect, it } from "bun:test";
import { app, buildCreateCountryPayload, buildUpdateCountryPayload, compareTargetAgainstSource, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.country} -> should register business type`, async () => {
  const res = await app.post(Route.country).send(buildCreateCountryPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateCountryPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.country}/${buildCreateCountryPayload()._id} -> should update business`, async () => {
  const res = await app.patch(`${Route.country}/${buildCreateCountryPayload()._id}`).send(buildUpdateCountryPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateCountryPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.country}/${buildCreateCountryPayload()._id} -> should get business`, async () => {
  const res = await app.get(`${Route.country}/${buildCreateCountryPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateCountryPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.country}/${buildCreateCountryPayload()._id} -> should delete business`, async () => {

  const res = await app.delete(`${Route.country}/${buildCreateCountryPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.country} -> should get all countries`, async () => {

  const res = await app.get(`${Route.country}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.country}?select=name -> only select name`, async () => {
  const res = await app
    .get(`${Route.country}`)
    .query({ select: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.country}?sort_by=createdAt should return countries by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.country}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.country}?sort_by=-updatedAt should return countries sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.country}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.country}?page=1&limit=10 -> should get only 10 countries docs (pagination)`, async () => {

  const res = await app.get(`${Route.country}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.country}?user=${signUpTemplate._id} -> should get countries where user == ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.country}`)
    .query({ 'user': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.user).toBe(signUpTemplate._id);
  }
});
