const Joi = require('@hapi/joi');
const createError = require('http-errors');
const User = require('../../models/User');

// const check = (req, res, next) => {
//   const { user } = res.locals;

//   if (!user) {
//     next(createError(401));
//   }

//   res.json(user);
// };

const register = async (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),
    password: Joi.string().required()
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return next(createError(400, validationResult.error));
  }

  try {
    const { username, password } = req.body;
    const existingUser = await User.findByUsername(username);

    if (existingUser) {
      return next(createError(409));
    }

    const newUser = new User({ username });
    await newUser.setPassword(password);
    await newUser.save();

    const token = newUser.generateToken();
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    });

    res.json(newUser.serialize());
  } catch (e) {
    next(createError(500));
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(createError(401));
  }

  try {
    const user = await User.findByUsername(username);

    if (!user) {
      return next(createError(401));
    }

    const validation = await user.checkPassword(password);

    if (!validation) {
      next(createError(401));
    }

    const token = user.generateToken();
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    });

    res.json(user.serialize());
  } catch (e) {
    next(createError(500));
  }
};

const logout = (req, res) => {
  res.cookie('access_token');
  res.status(204).end();
};

module.exports = {
  register,
  login,
  logout
};
