import { expect, it } from "bun:test";
import { app, buildCreateSquawkTagPayload, buildUpdateSquawkTagPayload, compareTargetAgainstSource, hasOnlyKeys, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.squawkTag} -> should register business type`, async () => {
  const res = await app.post(Route.squawkTag).send(buildCreateSquawkTagPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateSquawkTagPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.squawkTag}/${buildCreateSquawkTagPayload()._id} -> should update business`, async () => {
  const res = await app.patch(`${Route.squawkTag}/${buildCreateSquawkTagPayload()._id}`).send(buildUpdateSquawkTagPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateSquawkTagPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.squawkTag}/${buildCreateSquawkTagPayload()._id} -> should get business`, async () => {
  const res = await app.get(`${Route.squawkTag}/${buildCreateSquawkTagPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateSquawkTagPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.squawkTag}/${buildCreateSquawkTagPayload()._id} -> should delete business`, async () => {
  const res = await app.delete(`${Route.squawkTag}/${buildCreateSquawkTagPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.squawkTag} -> should get all business`, async () => {

  const res = await app.get(`${Route.squawkTag}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.squawkTag}?select=name -> only select name`, async () => {
  const res = await app
    .get(`${Route.squawkTag}`)
    .query({ select: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.squawkTag}?sort_by=createdAt should return squawk categrories by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.squawkTag}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.squawkTag}?sort_by=-updatedAt should return squawks sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.squawkTag}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.squawkTag}?page=1&limit=10 -> should get only 10 squawks docs (pagination)`, async () => {

  const res = await app.get(`${Route.squawkTag}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.squawkTag}?user=${signUpTemplate._id} -> should get squawks where user == ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.squawkTag}`)
    .query({ 'user': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.user).toBe(signUpTemplate._id);
  }
});
