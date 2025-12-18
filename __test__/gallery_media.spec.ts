import { expect, it } from "bun:test";
import { app, buildCreateGalleryMediaPayload, buildUpdateGalleryMediaPayload, compareTargetAgainstSource, hasOnlyKeys, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.galleryMedia} -> should register gallery media`, async () => {
  const res = await app.post(Route.galleryMedia).send(buildCreateGalleryMediaPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateGalleryMediaPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.galleryMedia}/${buildCreateGalleryMediaPayload()._id} -> should update galleryMedia`, async () => {
  const res = await app.patch(`${Route.galleryMedia}/${buildCreateGalleryMediaPayload()._id}`).send(buildUpdateGalleryMediaPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateGalleryMediaPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.galleryMedia}/${buildCreateGalleryMediaPayload()._id} -> should get galleryMedia`, async () => {
  const res = await app.get(`${Route.galleryMedia}/${buildCreateGalleryMediaPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateGalleryMediaPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.galleryMedia}/${buildCreateGalleryMediaPayload()._id} -> should delete galleryMedia`, async () => {
  const res = await app.delete(`${Route.galleryMedia}/${buildCreateGalleryMediaPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.galleryMedia} -> should get all gallery medias`, async () => {

  const res = await app.get(`${Route.galleryMedia}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.galleryMedia}?select=name -> only select name`, async () => {
  const res = await app
    .get(`${Route.galleryMedia}`)
    .query({ select: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.galleryMedia}?sort_by=createdAt should return galleryMedia by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.galleryMedia}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.galleryMedia}?sort_by=-updatedAt should return galleryMedia sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.galleryMedia}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.galleryMedia}?page=1&limit=10 -> should get only 10 gallery medias docs (pagination)`, async () => {

  const res = await app.get(`${Route.galleryMedia}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.galleryMedia}?user=${signUpTemplate._id} -> should get gallery medias where user == ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.galleryMedia}`)
    .query({ 'user': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.user).toBe(signUpTemplate._id);
  }
});
