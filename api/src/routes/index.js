module.exports = (app) => {
  app.use("/api", require("./auth.js"));
  app.use("/api", require("./admin/auth"));
};
