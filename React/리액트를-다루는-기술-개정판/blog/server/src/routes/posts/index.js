const express = require('express');
const postsCtrl = require('./posts.ctrl');
const { checkLoggedIn } = require('../../lib/middlewares/auth');

const posts = express.Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

posts.get('/:post_id', postsCtrl.getPostById, postsCtrl.read);
posts.put('/:post_id', checkLoggedIn, postsCtrl.getPostById, postsCtrl.checkOwnPost, postsCtrl.update);
posts.delete('/:post_id', checkLoggedIn, postsCtrl.getPostById, postsCtrl.checkOwnPost, postsCtrl.remove);

module.exports = posts;
