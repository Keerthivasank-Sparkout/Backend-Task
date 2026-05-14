const { findUserFromToken } = require('../services/userService');

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required.' });
    }

    const user = await findUserFromToken(token);
    if (!user) {
      return res.status(401).json({ message: 'User session is no longer valid.' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
