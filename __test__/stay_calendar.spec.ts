import { expect, it } from "bun:test";
import { app, buildCreateStayCalendarPayload, buildUpdateStayCalendarPayload, compareTargetAgainstSource, hasOnlyKeys, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.calendar} -> should register calendar `, async () => {
  const res = await app.post(Route.calendar).send(buildCreateStayCalendarPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateStayCalendarPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`PATCH ${Route.calendar}/${buildCreateStayCalendarPayload()._id} -> should update calendar`, async () => {
  const res = await app.patch(`${Route.calendar}/${buildCreateStayCalendarPayload()._id}`).send(buildUpdateStayCalendarPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateStayCalendarPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`GET ${Route.calendar}/${buildCreateStayCalendarPayload()._id} -> should get calendar`, async () => {
  const res = await app.get(`${Route.calendar}/${buildCreateStayCalendarPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateStayCalendarPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`DELETE ${Route.calendar}/${buildCreateStayCalendarPayload()._id} -> should delete calendar`, async () => {
  const res = await app.delete(`${Route.calendar}/${buildCreateStayCalendarPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.calendar} -> should get all calendars`, async () => {

  const res = await app.get(`${Route.calendar}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.calendar}?select=provider,block_dates -> only select calendar  `, async () => {
  const res = await app
    .get(`${Route.calendar}`)
    .query({ select: 'provider,block_dates' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['provider,block_dates,'])).toBeTrue();
  }
});

it(`GET ${Route.calendar}?sort_by=createdAt should return calendar  by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.calendar}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.calendar}?sort_by=-updatedAt should return calendar  sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.calendar}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.calendar}?page=1&limit=10 -> should get only 10 calendar  docs (pagination)`, async () => {

  const res = await app.get(`${Route.calendar}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.calendar}?provider=airbnb -> should get where provider === airbnb (filtering)`, async () => {
  const res = await app.get(`${Route.calendar}`)
    .query({ 'provider': 'airbnb' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.provider).toBe('airbnb');
  }
});

it(`GET ${Route.calendar}?stay=${signUpTemplate._id} -> should get where stay === ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.calendar}`)
    .query({ 'stay': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.stay).toBe(signUpTemplate._id);
  }
});

it(`GET ${Route.calendar}?stay=${signUpTemplate._id}&provider=${signUpTemplate._id} -> should get where stay === ${signUpTemplate._id} & provider === ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.calendar}`)
    .query({ 'stay': signUpTemplate._id, 'provider': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.stay).toBe(signUpTemplate._id);
    expect(doc.provider).toBe(signUpTemplate._id);
  }
});
