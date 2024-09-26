const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const consign = require("consign");
const cors = require("cors");

module.exports = () => {
  const app = express();

  // Variáveis da aplicação
  app.set("port", process.env.PORT || config.get("server.port"));

  // Middlewares
  app.use(bodyParser.json());
  app.use(cors());

  // Endpoints
  consign({ cwd: "api" })
    .then("data")
    .then("controllers")
    .then("routes")
    .into(app);

  return app;
};
