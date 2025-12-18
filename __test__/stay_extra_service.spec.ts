import { expect, it } from "bun:test";
import { app, buildCreateStayExtraServicePayload, buildUpdateStayExtraServicePayload, compareTargetAgainstSource, hasOnlyKeys, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.stayExtraService} -> should register stay extra service type`, async () => {
  const res = await app.post(Route.stayExtraService).send(buildCreateStayExtraServicePayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateStayExtraServicePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`PATCH ${Route.stayExtraService}/${buildCreateStayExtraServicePayload()._id} -> should update stay extra service`, async () => {
  const res = await app.patch(`${Route.stayExtraService}/${buildCreateStayExtraServicePayload()._id}`).send(buildUpdateStayExtraServicePayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateStayExtraServicePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`GET ${Route.stayExtraService}/${buildCreateStayExtraServicePayload()._id} -> should get stay extra service`, async () => {
  const res = await app.get(`${Route.stayExtraService}/${buildCreateStayExtraServicePayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateStayExtraServicePayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`DELETE ${Route.stayExtraService}/${buildCreateStayExtraServicePayload()._id} -> should delete stay extra service`, async () => {
  const res = await app.delete(`${Route.stayExtraService}/${buildCreateStayExtraServicePayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.stayExtraService} -> should get all stay extra service`, async () => {

  const res = await app.get(`${Route.stayExtraService}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.stayExtraService}?select=price,quantity -> only select calendar  `, async () => {
  const res = await app
    .get(`${Route.stayExtraService}`)
    .query({ select: 'price,quantity' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys
      (doc, ['price,quantity,'])).toBeTrue();
  }
});

it(`GET ${Route.stayExtraService}?sort_by=createdAt should return calendar  by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.stayExtraService}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.stayExtraService}?sort_by=-updatedAt should return stay extra service sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.stayExtraService}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.stayExtraService}?page=1&limit=10 -> should get only 10 stayExtraService docs (pagination)`, async () => {

  const res = await app.get(`${Route.stayExtraService}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.stayExtraService}?price[gt]=400 -> should get stay extra services where price > 400 (filtering)`, async () => {
  const res = await app.get(`${Route.stayExtraService}`)
    .query({ 'price[gt]': 400 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.price).toBeGreaterThan(400);
  }
});

it(`GET ${Route.stayExtraService}?stay=${signUpTemplate._id} -> should get stay extra services where stay === ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.stayExtraService}`)
    .query({ 'stay': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.stay).toBe(signUpTemplate._id);
  }
});

