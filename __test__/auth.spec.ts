import { expect, it } from "bun:test";
import { app, buildSignUpPayload, buildLoginPayload, Route } from './utils';
import { faker } from '@faker-js/faker';

/*
 *  INFO: We are not testing the signUp because we are already setting up the user in the setup file.
 * */
// it(`POST ${Route.signUp} -> should register user`, async () => {
//   const res = await app.post(Route.signUp).send(buildSignUpPayload());
//
//   expect(res.status).toBe(201);
//   expect(res.body).toHaveProperty("msg");
// }, 10000);

it(`POST ${Route.login} -> should login user`, async () => {
  const res = await app.post(Route.login).send(buildLoginPayload());

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("success");
  expect(res.body).toHaveProperty("data");
  expect(res.body.data).toHaveProperty("accessToken");
});

it(`GET ${Route.checkEmail}:email -> should confirm email is taken`, async () => {
  const res = await app.post(
    `${Route.checkEmail}/${buildSignUpPayload().email}`
  );

  expect(res.status).toBe(400);
  expect(res.body.status).toBe('fail');
  expect(res.body.message).toMatch(/already exist/i);
});

it(`GET ${Route.checkEmail}:email -> should confirm email is available`, async () => {
  const res = await app.post(
    `${Route.checkEmail}/${faker.internet.email()}`
  );

  expect(res.status).toBe(200);
  expect(res.body.status).toBe('success');
});

it(`GET ${Route.checkDisplayName}:display_name -> should confirm display_name is taken`, async () => {
  const res = await app.post(
    `${Route.checkDisplayName}/${buildSignUpPayload().display_name}`
  );

  expect(res.status).toBe(400);
  expect(res.body.status).toBe('fail');
  expect(res.body.message).toMatch(/already exist/i);
});

it(`GET ${Route.checkDisplayName}:display_name -> should confirm display_name is available`, async () => {
  const res = await app.post(
    `${Route.checkDisplayName}/${faker.internet.displayName()}`
  );

  expect(res.status).toBe(200);
  expect(res.body.status).toBe('success');
});
