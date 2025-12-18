import { expect, it } from "bun:test";
import { app, buildCreateTestimonialPayload, buildUpdateTestimonialPayload, compareTargetAgainstSource, Route, signUpTemplate } from './utils';
import { getAccessToken } from './setup';

it(`POST ${Route.testimonial} -> should register testimonial`, async () => {
  const res = await app.post(Route.testimonial).send(buildCreateTestimonialPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(201);
  expect(res.body.status).toBe("success");
  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildCreateTestimonialPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`PATCH ${Route.testimonial}/${buildCreateTestimonialPayload()._id} -> should update testimonial`, async () => {
  const res = await app.patch(`${Route.testimonial}/${buildCreateTestimonialPayload()._id}`).send(buildUpdateTestimonialPayload())
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateTestimonialPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`GET ${Route.testimonial}/${buildCreateTestimonialPayload()._id} -> should get testimonial`, async () => {
  const res = await app.get(`${Route.testimonial}/${buildCreateTestimonialPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  // Compare the response body with the expected payload
  const compareResult = compareTargetAgainstSource(res.body.data.doc, buildUpdateTestimonialPayload());
  if (compareResult.length > 0) {
    for (const field of compareResult) {
      expect(field.sourceValue).toEqual(field.targetValue);
    }
  }
});

it(`DELETE ${Route.testimonial}/${buildCreateTestimonialPayload()._id} -> should delete testimonial`, async () => {
  const res = await app.delete(`${Route.testimonial}/${buildCreateTestimonialPayload()._id}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(204);
  expect(res.body).toEqual({});
});

it(`GET ${Route.testimonial} -> should get all testimonial`, async () => {

  const res = await app.get(`${Route.testimonial}`)
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.results).toBe(30);
  expect(res.body.status).toBe("success");
  expect(res.body.data.docs.length).toBe(30);
});

it(`GET ${Route.testimonial}?select=name -> only select in doc`, async () => {
  const res = await app
    .get(`${Route.testimonial}`)
    .query({ select: 'name' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  for (const doc of res.body.data.docs) {
    expect(hasOnlyKeys(doc, ['name'])).toBeTrue();
  }
});

it(`GET ${Route.testimonial}?sort_by=createdAt should return testimonials by createdAt in ascending order`, async () => {
  const res = await app
    .get(`${Route.testimonial}`)
    .query({ sort_by: 'createdAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.createdAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => a.localeCompare(b));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.testimonial}?sort_by=-updatedAt should return testimonial sorted by updatedAt in descending order`, async () => {

  const res = await app
    .get(`${Route.testimonial}`)
    .query({ sort_by: '-updatedAt' })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  const docs = res.body.data.docs.map((b: any) => b.updatedAt);

  // Check if the names are sorted
  const sorted = [...docs].sort((a, b) => b.localeCompare(a));
  expect(docs).toEqual(sorted);
});

it(`GET ${Route.testimonial}?parent=${signUpTemplate._id} -> should get surface types where parent === ${signUpTemplate._id} (filtering)`, async () => {
  const res = await app.get(`${Route.testimonial}`)
    .query({ 'parent': signUpTemplate._id })
    .set('Authorization', `Bearer ${getAccessToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");

  for (const doc of res.body.data.docs) {
    expect(doc.parent).toBe(signUpTemplate._id);
  }
});
