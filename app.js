require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var categoryRouter = require('./routes/categories');
var brandRouter = require('./routes/brands');
var orderRouter = require('./routes/orders');
var cartItemRouter = require('./routes/cartItems');
var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');
var initRouter = require('./routes/init');

var app = express();

// Import Sequelize and models
const sequelize = require('./config/database');
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Brand = require('./models/Brand');
const Order = require('./models/Order');
const CartItem = require('./models/CartItem');

// Import auth middleware
const { authenticateJWT, isAdmin } = require('./middlewares/authMiddleware');

// Synchronize the database
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(error => {
    console.error('Unable to synchronize the database:', error);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter); // Product routes
app.use('/categories', categoryRouter); // Category routes
app.use('/brands', brandRouter); // Brand routes
app.use('/orders', orderRouter); // Order routes
app.use('/cartItems', cartItemRouter); // Cart Item routes
app.use('/auth', authRouter); // Authentication routes
app.use('/admin', adminRouter); // Admin routes
app.use('/init', initRouter); // Initialization route

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
