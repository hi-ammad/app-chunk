import { expect, it } from "bun:test";
import { app, buildCreateTransactionPayload, buildUpdateTransactionPayload, compareTargetAgainstSource, Route } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.transaction} -> should register transaction`, async () => {
  const res = await app.post(Route.transaction).send(buildCreateTransactionPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateTransactionPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`PATCH ${Route.transaction}/${buildCreateTransactionPayload()._id} -> should update transaction`, async () => {
  const res = await app.patch(`${Route.transaction}/${buildCreateTransactionPayload()._id}`).send(buildUpdateTransactionPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateTransactionPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`GET ${Route.transaction}/${buildCreateTransactionPayload()._id} -> should get transaction`, async () => {
  const res = await app.get(`${Route.transaction}/${buildCreateTransactionPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateTransactionPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toBe(field.targetValue);
    }
  }
});

it(`DELETE ${Route.transaction}/${buildCreateTransactionPayload()._id} -> should delete transaction`, async () => {
  const res = await app.delete(`${Route.transaction}/${buildCreateTransactionPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.transaction} -> should get all transaction`, async () => {

  const res = await app.get(`${Route.transaction}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.transaction}?page=1&limit=10 -> should get only 10 transactiones (pagination)`, async () => {

  const res = await app.get(`${Route.transaction}?page=1&limit=10`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(10);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(10);
});

it(`GET ${Route.transaction}?type=0 -> should get transactiones where type == 0 (filtering)`, async () => {
  const res = await app.get(`${Route.transaction}`)
    .query({ type: 0 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.type).toBe(0);
  }
});

it(`GET ${Route.transaction}?status=1&type=1 -> should get transactiones where status === 1 & type === 1(filtering)`, async () => {
  const res = await app.get(`${Route.transaction}`)
    .query({ status: 1, type: 1 })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.status).toBe(1);
    expect(doc.type).toBe(1);
  }
});

it(`GET ${Route.transaction}?sort_by=purpose should return transactiones sorted by name in ascending order`, async () => {
  const res = await app
    .get(`${Route.transaction}`)
    .query({ sort_by: 'purpose' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const names = res.body.data.docs.map((b: any) => b.name);

  // Check if the names are sorted
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(sorted);
});

it(`GET ${Route.transaction}?sort_by=-amount should return transactiones sorted by amount in descending order`, async () => {

  const res = await app
    .get(`${Route.transaction}`)
    .query({ sort_by: '-amount' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const names = res.body.data.docs.map((b: any) => b.name);

  // Check if the names are sorted
  const sorted = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sorted);
});
