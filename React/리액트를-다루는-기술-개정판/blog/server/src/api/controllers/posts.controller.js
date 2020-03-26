import mongoose from 'mongoose';
import createError from 'http-errors';
import Post from '../../models/post';

export const getPostById = async (req, res, next) => {
  const { ObjectId } = mongoose.Types;
  const { post_id: postId } = req.params;

  if (!ObjectId.isValid(postId)) return next(createError(400));

  try {
    const post = await Post.findById(postId);
    if (!post) return next(createError(404));

    res.locals.post = post;
    next();
  } catch (e) {
    next(createError(400));
  }
};

export const list = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.json(posts);
  } catch (e) {
    next(createError(400));
  }
};

export const write = async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(201).json(newPost);
  } catch (e) {
    next(createError(400));
  }
};

export const read = async (req, res) => {
  const { post } = res.locals;
  res.json(post);
};

export const update = async (req, res, next) => {
  const { post } = res.locals;

  try {
    await Post.updateOne(post, req.body);
    res.end();
  } catch (e) {
    next(createError(400));
  }
};

export const remove = async (req, res, next) => {
  const { post } = res.locals;

  try {
    await Post.deleteOne(post);
    res.status(204).end();
  } catch (e) {
    next(createError(400));
  }
};

