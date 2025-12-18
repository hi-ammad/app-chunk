import { expect, it } from "bun:test";
import { app, buildCreateStayPlaceTypePayload, buildUpdateStayPlaceTypePayload, compareTargetAgainstSource, hasOnlyKeys, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.stayPlaceType} -> should register business type`, async () => {
  const res = await app.post(Route.stayPlaceType).send(buildCreateStayPlaceTypePayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateStayPlaceTypePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`PATCH ${Route.stayPlaceType}/${buildCreateStayPlaceTypePayload()._id} -> should update business`, async () => {
  const res = await app.patch(`${Route.stayPlaceType}/${buildCreateStayPlaceTypePayload()._id}`).send(buildUpdateStayPlaceTypePayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateStayPlaceTypePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`GET ${Route.stayPlaceType}/${buildCreateStayPlaceTypePayload()._id} -> should get business`, async () => {
  const res = await app.get(`${Route.stayPlaceType}/${buildCreateStayPlaceTypePayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateStayPlaceTypePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`DELETE ${Route.stayPlaceType}/${buildCreateStayPlaceTypePayload()._id} -> should delete business`, async () => {
  const res = await app.delete(`${Route.stayPlaceType}/${buildCreateStayPlaceTypePayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.stayPlaceType} -> should get all business`, async () => {

  const res = await app.get(`${Route.stayPlaceType}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.stayPlaceType}?select=name -> only select in doc `, async () => {
  const res = await app
    .get(`${Route.stayPlaceType}`)
    .query({ select: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.stayPlaceType}?sort_by=createdAt should return place types by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.stayPlaceType}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.stayPlaceType}?sort_by=-updatedAt should return place types sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.stayPlaceType}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.stayPlaceType}?parent=${signUpTemplate._id} -> should get place types where stay === ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.stayPlaceType}`)
    .query({ 'parent': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.parent).toBe(signUpTemplate._id);
  }
});
