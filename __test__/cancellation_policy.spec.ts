import { expect, it } from "bun:test";
import { app, buildCreateCancellationPolicyPayload, buildUpdateCancellationPolicyPayload, compareTargetAgainstSource, hasOnlyKeys, Route, signUpTemplate } from './utils';
import { getAccessToken } from "./setup";

it(`POST ${Route.cancellationPolicy} -> should register cancellationPolicy`, async () => {
  const res = await app.post(Route.cancellationPolicy).send(buildCreateCancellationPolicyPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateCancellationPolicyPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.cancellationPolicy}/${buildCreateCancellationPolicyPayload()._id} -> should update cancellationPolicy`, async () => {
  const res = await app.patch(`${Route.cancellationPolicy}/${buildCreateCancellationPolicyPayload()._id}`).send(buildUpdateCancellationPolicyPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateCancellationPolicyPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.cancellationPolicy}/${buildCreateCancellationPolicyPayload()._id} -> should get cancellationPolicy`, async () => {
  const res = await app.get(`${Route.cancellationPolicy}/${buildCreateCancellationPolicyPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateCancellationPolicyPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.cancellationPolicy}/${buildCreateCancellationPolicyPayload()._id} -> should delete cancellationPolicy`, async () => {

  const res = await app.delete(`${Route.cancellationPolicy}/${buildCreateCancellationPolicyPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.cancellationPolicy} -> should get all cancellationPolicy`, async () => {

  const res = await app.get(`${Route.cancellationPolicy}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(100);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(100);
});

it(`GET ${Route.cancellationPolicy}?select=name -> only select business types `, async () => {
  const res = await app
    .get(`${Route.cancellationPolicy}`)
    .query({ select: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.cancellationPolicy}?sort_by=createdAt should return cancellationPolicies by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.cancellationPolicy}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.cancellationPolicy}?sort_by=-updatedAt should return cancellationPolicies sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.cancellationPolicy}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.cancellationPolicy}?page=1&limit=10 -> should get only 10 cancellationPolicies docs (pagination)`, async () => {

  const res = await app.get(`${Route.cancellationPolicy}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.cancellationPolicy}?user=${signUpTemplate._id} -> should get cancellationPolicies where user == ${signUpTemplate._id}(filtering)`, async () => {
  const res = await app.get(`${Route.cancellationPolicy}`)
    .query({ 'user': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.user).toBe(signUpTemplate._id);
  }
});

