const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../../models/User');

const checkLoggedIn = (req, res, next) => {
  if (res.locals.user) next();
  else next(createError(401));
};

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const now = Math.floor(Date.now() / 1000);

    res.locals.user = {
      _id: decoded._id,
      username: decoded.username
    };

    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const newToken = user.generateToken();

      res.cookies('access_token', newToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      });
    }

    return next();
  } catch (e) {
    return next();
  }
};

module.exports = {
  jwtMiddleware,
  checkLoggedIn
};
