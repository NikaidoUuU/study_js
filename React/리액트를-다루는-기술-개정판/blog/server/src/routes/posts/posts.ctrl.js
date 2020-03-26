const mongoose = require('mongoose');
const createError = require('http-errors');
const Joi = require('@hapi/joi');
const Post = require('../../models/Post');
const User = require('../../models/User');

const getPostById = async (req, res, next) => {
  const { ObjectId } = mongoose.Types;
  const { post_id: postId } = req.params;

  if (!ObjectId.isValid(postId)) {
    return next(createError(400));
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return next(createError(404));
    }

    res.locals.post = post;
    next();
  } catch (e) {
    next(createError(500));
  }
};

const checkOwnPost = (req, res, next) => {
  const { user, post } = res.locals;

  if (String(post.user._id) !== user._id) {
    return next(createError(403));
  }

  next();
};

const list = async (req, res, next) => {
  const { tag, username } = req.query;
  const page = Number(req.query.page || '1');

  if (page < 1) {
    return next(createError(400));
  }

  const user = await User.findByUsername(username) || { _id: null };

  const query = {
    ...(username ? { user: user._id } : {}),
    ...(tag ? { tags: tag } : {})
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean();
    const postCount = await Post.countDocuments(query);

    res.set('Last-Page', Math.ceil(postCount / 10));
    res.json(posts.map(post => ({
      ...post,
      content: post.content.length < 200 ? post.content : `${post.content.slice(0, 200)}...`
    })));
  } catch (e) {
    next(createError(500));
  }
};

const write = async (req, res, next) => {
  const { user } = res.locals;
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return next(createError(400, validationResult.error));
  }

  try {
    const newPost = await Post.create({ ...req.body, user: user._id });
    res.status(201).json(newPost);
  } catch (e) {
    next(createError(500));
  }
};

const read = (req, res) => {
  const { post } = res.locals;
  res.json(post);
};

const update = async (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    tags: Joi.array().items(Joi.string())
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return next(createError(400, validationResult.error));
  }

  try {
    const { post } = res.locals;
    await Post.updateOne(post, req.body);

    res.json(post);
  } catch (e) {
    next(createError(500));
  }
};

const remove = async (req, res, next) => {
  const { post } = res.locals;

  try {
    await Post.deleteOne(post);
    res.status(204).end();
  } catch (e) {
    next(createError(500));
  }
};

module.exports = {
  getPostById,
  checkOwnPost,
  list,
  write,
  read,
  update,
  remove
};
