require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const hpp = require('hpp');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const { jwtMiddleware } = require('./lib/middlewares/auth');
const authAPIRouter = require('./routes/auth');
const postsAPIRouter = require('./routes/posts');

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.once('open', () => console.log('✔️  MongoDB Connected'));
db.on('error', e => console.error('❌  MongoDB Connection Error ', e));

app.use(compression());
app.use(hpp());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(jwtMiddleware);

app.use('/auth', authAPIRouter);
app.use('/posts', postsAPIRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err);
});

app.listen(process.env.PORT, () => {
  console.log(`✔️  Listening to port ${process.env.PORT}`);
});
