module.exports = (app) => {
  // authentication
  app.use('/api', require('./auth'));
  app.use('/api', require('./admin/auth'));
  // category
  app.use('/api', require('./category'));
  // product
  app.use('/api', require('./product'));
  // cart
  app.use('/api', require('./cart'));
};
