"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = bootstrap;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _index = require("./src/config/index.js");

var _dbConnection = _interopRequireDefault(require("./src/database/db.connection.js"));

var _utilsIndex = require("./src/utils/utils.index.js");

var _index2 = require("./src/middlewares/index.js");

var _index3 = require("./src/modules/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = _index.appConfig.port;

function bootstrap(app) {
  (0, _dbConnection["default"])();
  (0, _utilsIndex.redisConnection)(); // app.use (cors(corsOptions));

  app.use(_express["default"].json());
  app.use('/api/auth', _index3.authRouter);
  app.use('/users', _index3.userRouter);
  app.use('/messages', _index3.messageRouter);
  app.use(_index2.errorHandler);
  app.listen(port, function () {
    console.log("Server Running", port);
  });
}