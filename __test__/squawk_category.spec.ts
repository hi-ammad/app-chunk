import { expect, it } from "bun:test";
import { app, buildCreateSquawkCategoryPayload, buildUpdateSquawkCategoryPayload, compareTargetAgainstSource, hasOnlyKeys, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.squawkCategory} -> should register squawk category`, async () => {
  const res = await app.post(Route.squawkCategory).send(buildCreateSquawkCategoryPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateSquawkCategoryPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.squawkCategory}/${buildCreateSquawkCategoryPayload()._id} -> should update squawk category`, async () => {
  const res = await app.patch(`${Route.squawkCategory}/${buildCreateSquawkCategoryPayload()._id}`).send(buildUpdateSquawkCategoryPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateSquawkCategoryPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.squawkCategory}/${buildCreateSquawkCategoryPayload()._id} -> should get squawk category`, async () => {
  const res = await app.get(`${Route.squawkCategory}/${buildCreateSquawkCategoryPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateSquawkCategoryPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.squawkCategory}/${buildCreateSquawkCategoryPayload()._id} -> should delete squawk category`, async () => {
  const res = await app.delete(`${Route.squawkCategory}/${buildCreateSquawkCategoryPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.squawkCategory} -> should get all squawk categrories`, async () => {

  const res = await app.get(`${Route.squawkCategory}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.squawkCategory}?select=name -> only select name`, async () => {
  const res = await app
    .get(`${Route.squawkCategory}`)
    .query({ select: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.squawkCategory}?sort_by=createdAt should return squawk categrories by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.squawkCategory}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.squawkCategory}?sort_by=-updatedAt should return squawks sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.squawkCategory}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.squawkCategory}?page=1&limit=10 -> should get only 10 squawks docs (pagination)`, async () => {

  const res = await app.get(`${Route.squawkCategory}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.squawkCategory}?user=${signUpTemplate._id} -> should get squawks where user == ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.squawkCategory}`)
    .query({ 'user': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.user).toBe(signUpTemplate._id);
  }
});
