import { expect, it } from "bun:test";
import { app, buildCreateSquawkPayload, buildUpdateSquawkPayload, compareTargetAgainstSource, hasOnlyKeys, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.squawk} -> should register squawk`, async () => {
  const res = await app.post(Route.squawk).send(buildCreateSquawkPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateSquawkPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.squawk}/${buildCreateSquawkPayload()._id} -> should update squawk`, async () => {
  const res = await app.patch(`${Route.squawk}/${buildCreateSquawkPayload()._id}`).send(buildUpdateSquawkPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateSquawkPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.squawk}/${buildCreateSquawkPayload()._id} -> should get squawk`, async () => {
  const res = await app.get(`${Route.squawk}/${buildCreateSquawkPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateSquawkPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.squawk}/${buildCreateSquawkPayload()._id} -> should delete squawk`, async () => {
  const res = await app.delete(`${Route.squawk}/${buildCreateSquawkPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.squawk} -> should get all squawk`, async () => {

  const res = await app.get(`${Route.squawk}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.squawk}?select=html -> only select name`, async () => {
  const res = await app
    .get(`${Route.squawk}`)
    .query({ select: 'html' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['html'])).toBeTrue();
  }
});

it(`GET ${Route.squawk}?sort_by=createdAt should return squawks by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.squawk}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.squawk}?sort_by=-updatedAt should return squawks sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.squawk}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.squawk}?page=1&limit=10 -> should get only 10 squawks docs (pagination)`, async () => {

  const res = await app.get(`${Route.squawk}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.squawk}?user=${signUpTemplate._id} -> should get squawks where user == ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.squawk}`)
    .query({ 'user': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.user).toBe(signUpTemplate._id);
  }
});
