import { expect, it } from "bun:test";
import { app, buildCreateStaySpaceTypePayload, buildUpdateStaySpaceTypePayload, compareTargetAgainstSource, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.staySpaceType} -> should register business type`, async () => {
  const res = await app.post(Route.staySpaceType).send(buildCreateStaySpaceTypePayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateStaySpaceTypePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`PATCH ${Route.staySpaceType}/${buildCreateStaySpaceTypePayload()._id} -> should update business`, async () => {
  const res = await app.patch(`${Route.staySpaceType}/${buildCreateStaySpaceTypePayload()._id}`).send(buildUpdateStaySpaceTypePayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateStaySpaceTypePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`GET ${Route.staySpaceType}/${buildCreateStaySpaceTypePayload()._id} -> should get business`, async () => {
  const res = await app.get(`${Route.staySpaceType}/${buildCreateStaySpaceTypePayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateStaySpaceTypePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`DELETE ${Route.staySpaceType}/${buildCreateStaySpaceTypePayload()._id} -> should delete business`, async () => {
  const res = await app.delete(`${Route.staySpaceType}/${buildCreateStaySpaceTypePayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.staySpaceType} -> should get all business`, async () => {

  const res = await app.get(`${Route.staySpaceType}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.staySpaceType}?select=name -> only select in doc`, async () => {
  const res = await app
    .get(`${Route.staySpaceType}`)
    .query({ select: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.staySpaceType}?sort_by=createdAt should return stay space by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.staySpaceType}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.staySpaceType}?sort_by=-updatedAt should return space types sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.staySpaceType}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.staySpaceType}?parent=${signUpTemplate._id} -> should get space types where parent === ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.staySpaceType}`)
    .query({ 'parent': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.parent).toBe(signUpTemplate._id);
  }
});
