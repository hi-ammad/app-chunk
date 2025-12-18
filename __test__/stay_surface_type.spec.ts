import { expect, it } from "bun:test";
import { app, buildCreateStaySurfaceTypePayload, buildUpdateStaySurfaceTypePayload, compareTargetAgainstSource, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.staySurfaceType} -> should register surface type`, async () => {
  const res = await app.post(Route.staySurfaceType).send(buildCreateStaySurfaceTypePayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateStaySurfaceTypePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`PATCH ${Route.staySurfaceType}/${buildCreateStaySurfaceTypePayload()._id} -> should update surface type`, async () => {
  const res = await app.patch(`${Route.staySurfaceType}/${buildCreateStaySurfaceTypePayload()._id}`).send(buildUpdateStaySurfaceTypePayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateStaySurfaceTypePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`GET ${Route.staySurfaceType}/${buildCreateStaySurfaceTypePayload()._id} -> should get surface type`, async () => {
  const res = await app.get(`${Route.staySurfaceType}/${buildCreateStaySurfaceTypePayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateStaySurfaceTypePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`DELETE ${Route.staySurfaceType}/${buildCreateStaySurfaceTypePayload()._id} -> should delete surface type`, async () => {
  const res = await app.delete(`${Route.staySurfaceType}/${buildCreateStaySurfaceTypePayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.staySurfaceType} -> should get all surface type`, async () => {

  const res = await app.get(`${Route.staySurfaceType}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.staySurfaceType}?select=name -> only select in doc`, async () => {
  const res = await app
    .get(`${Route.staySurfaceType}`)
    .query({ select: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.staySurfaceType}?sort_by=createdAt should return stay surface by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.staySurfaceType}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.staySurfaceType}?sort_by=-updatedAt should return surface types sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.staySurfaceType}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.staySurfaceType}?parent=${signUpTemplate._id} -> should get surface types where parent === ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.staySurfaceType}`)
    .query({ 'parent': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.parent).toBe(signUpTemplate._id);
  }
});
