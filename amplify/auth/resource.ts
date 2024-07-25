import { defineAuth } from '@aws-amplify/backend';
import { preSignUp } from './pre-sign-up/resource';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Welcome to SuperApp!",
      verificationEmailBody: (createCode) => `Use this code to confirm your account in SuperApp: ${createCode()}`,
    },
  },

  multifactor: {
    mode: 'REQUIRED',
    totp: true
  },

  userAttributes: {
    birthdate: {
      mutable: true,
      required: true,
    }
  },

  triggers: {
    preSignUp
  }
});
