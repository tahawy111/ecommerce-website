module.exports = (app) => {
  app.use('/api', require('./auth'));
  app.use('/api', require('./admin/auth'));
  // category
  app.use('/api', require('./category'));
};
