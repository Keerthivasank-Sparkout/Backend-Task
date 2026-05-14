const env = require('../config/env');
const { createToken, sanitizeUser } = require('../services/tokenService');
const { verifyGoogleCredential } = require('../services/googleAuthService');
const { upsertUser } = require('../services/userService');

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!env.googleClientId) {
      return res.status(500).json({ message: 'GOOGLE_CLIENT_ID is not configured.' });
    }

    if (!credential) {
      return res.status(400).json({ message: 'Google credential is required.' });
    }

    const payload = await verifyGoogleCredential(credential);

    if (!payload?.email_verified) {
      return res.status(401).json({ message: 'Google email is not verified.' });
    }

    const user = await upsertUser({
      googleId: payload.sub,
      name: payload.name || payload.email,
      email: payload.email,
      picture: payload.picture || '',
    });

    return res.json({
      token: createToken(user),
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error('Google login failed:', error.message);
    return res.status(401).json({ message: 'Google authentication failed.' });
  }
};

const getCurrentUser = (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};

const logout = (req, res) => {
  res.json({ message: 'Logged out successfully.' });
};

module.exports = {
  googleLogin,
  getCurrentUser,
  logout,
};
