import { expect, it } from "bun:test";
import { app, buildCreateReviewPayload, buildUpdateReviewPayload, compareTargetAgainstSource, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.review} -> should register business type`, async () => {
  const res = await app.post(Route.review).send(buildCreateReviewPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateReviewPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.review}/${buildCreateReviewPayload()._id} -> should update business`, async () => {
  const res = await app.patch(`${Route.review}/${buildCreateReviewPayload()._id}`).send(buildUpdateReviewPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateReviewPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.review}/${buildCreateReviewPayload()._id} -> should get business`, async () => {
  const res = await app.get(`${Route.review}/${buildCreateReviewPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateReviewPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.review}/${buildCreateReviewPayload()._id} -> should delete business`, async () => {
  const res = await app.delete(`${Route.review}/${buildCreateReviewPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.review} -> should get all business`, async () => {

  const res = await app.get(`${Route.review}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.review}?select=name -> only select name`, async () => {
  const res = await app
    .get(`${Route.review}`)
    .query({ select: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.review}?sort_by=createdAt should reviews return by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.review}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.review}?sort_by=-updatedAt should return reviews sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.review}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.review}?page=1&limit=10 -> should get only 10 reviews docs (pagination)`, async () => {

  const res = await app.get(`${Route.review}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.review}?user=${signUpTemplate._id} -> should get gallery medias where user == ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.review}`)
    .query({ 'user': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.user).toBe(signUpTemplate._id);
  }
});

it(`GET ${Route.review}?type=1 -> should return guest-to-business reviews`, async () => {
  const res = await app.get(`${Route.review}`)
    .query({ 'type': 1 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.type).toBe(1);
  }
});

it(`GET ${Route.review}?type=2 -> should return host-to-guest reviews`, async () => {
  const res = await app.get(`${Route.review}`)
    .query({ 'type': 2 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.type).toBe(2);
  }
});

it(`GET ${Route.review}?type=3 -> should return guest-to-host reviews`, async () => {
  const res = await app.get(`${Route.review}`)
    .query({ 'type': 3 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.type).toBe(3);
  }
});

it(`GET ${Route.review}?user=${signUpTemplate._id} -> should return guest reviews`, async () => {
  const res = await app.get(`${Route.review}`)
    .query({ 'guest': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.guest).toBe(signUpTemplate._id);
  }
});

//  TODO: PUT CORRECT STAY ID
it(`GET ${Route.review}?stay=${signUpTemplate._id} -> should return stay reviews`, async () => {
  const res = await app.get(`${Route.review}`)
    .query({ 'stay': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.stay).toBe(signUpTemplate._id);
  }
});
