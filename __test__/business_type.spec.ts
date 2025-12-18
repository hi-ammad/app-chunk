import { expect, it } from "bun:test";
import { app, buildCreateBusinessTypePayload, buildUpdateBusinessTypePayload, compareTargetAgainstSource, hasOnlyKeys, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';


it(`POST ${Route.businessType} -> should register business type`, async () => {

  const res = await app.post(Route.businessType).send(buildCreateBusinessTypePayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateBusinessTypePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.businessType}/${buildCreateBusinessTypePayload()._id} -> should update business`, async () => {
  const res = await app.patch(`${Route.businessType}/${buildCreateBusinessTypePayload()._id}`).send(buildUpdateBusinessTypePayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateBusinessTypePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.businessType}/${buildCreateBusinessTypePayload()._id} -> should get business`, async () => {
  const res = await app.get(`${Route.businessType}/${buildCreateBusinessTypePayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateBusinessTypePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.businessType}/${buildCreateBusinessTypePayload()._id} -> should delete business`, async () => {

  const res = await app.delete(`${Route.businessType}/${buildCreateBusinessTypePayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.businessType} -> should get all business`, async () => {

  const res = await app.get(`${Route.businessType}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(100);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(100);
});

it(`GET ${Route.businessType}?select=name -> only select business types `, async () => {
  const res = await app
    .get(`${Route.businessType}`)
    .query({ select: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.businessType}?sort_by=createdAt should return business types by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.businessType}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.businessType}?sort_by=-updatedAt should return business types sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.businessType}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.businessType}?page=1&limit=10 -> should get only 10 business types docs (pagination)`, async () => {

  const res = await app.get(`${Route.businessType}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.businessType}?user=${signUpTemplate._id} -> should get business where stripe_type_method == card (filtering)`, async () => {
  const res = await app.get(`${Route.businessType}`)
    .query({ 'user': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.user).toBe(signUpTemplate._id);
  }
});

