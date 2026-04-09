"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = bootstrap;

var _express = _interopRequireDefault(require("express"));

var _envConfig = require("./src/config/env.config.js");

var _index = require("./src/middlewares/index.js");

var _dbConnection = _interopRequireDefault(require("./src/database/db.connection.js"));

var _index2 = require("./src/modules/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = _envConfig.appConfig.port;

function bootstrap(app) {
  (0, _dbConnection["default"])();
  app.use(_express["default"].json());
  app.use('/auth', _index2.authRouter);
  app.use('/users', _index2.userRouter);
  app.use('/messages', _index2.messageRouter);
  app.use(_index.errorHandler);
  app.listen(port, function () {
    console.log("Server Running", port);
  });
}