import { defineFunction } from '@aws-amplify/backend';

export const sayHello = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'say-hello',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  environment: {
    NAME: 'World',
    // API_ENDPOINT: process.env.API_ENDPOINT
  },
  timeoutSeconds: 10,
  memoryMB: 128,
});