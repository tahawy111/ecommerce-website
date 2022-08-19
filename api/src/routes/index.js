module.exports = (app) => {
  // authentication
  app.use("/api", require("./auth"));
  app.use("/api", require("./admin/auth"));
  // category
  app.use("/api", require("./category"));
  // product
  app.use("/api", require("./product"));
  // cart
  app.use("/api", require("./cart"));
  // initialData
  app.use("/api", require("./admin/initialData"));
  // Page
  app.use("/api", require("./admin/page"));
};
