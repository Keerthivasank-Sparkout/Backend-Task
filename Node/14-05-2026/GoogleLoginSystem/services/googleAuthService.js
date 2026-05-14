const { OAuth2Client } = require('google-auth-library');

const env = require('../config/env');

const googleClient = new OAuth2Client(env.googleClientId);

const verifyGoogleCredential = async (credential) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: env.googleClientId,
  });

  return ticket.getPayload();
};

module.exports = {
  verifyGoogleCredential,
};
