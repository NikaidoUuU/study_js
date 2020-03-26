const express = require('express');
const authCtrl = require('./auth.ctrl');

const auth = express.Router();

// auth.get('/check', authCtrl.check);

auth.post('/register', authCtrl.register);

auth.post('/login', authCtrl.login);

auth.post('/logout', authCtrl.logout);

module.exports = auth;
