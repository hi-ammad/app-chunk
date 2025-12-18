import { expect, it } from "bun:test";
import { app, Route } from './utils';

it(`GET ${Route.ping}- should return 200 OK & Respone must be <Pong 😄>`, async () => {
  const response = await app.get(Route.ping);
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ ping: 'Pong 😄' });
});

it(`GET ${Route.clearCache} - should return 200 OK & Respone must be <Pong 😄>`, async () => {
  const response = await app.get(Route.clearCache);
  expect(response.status).toBe(200);
});

