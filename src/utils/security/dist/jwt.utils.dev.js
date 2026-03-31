"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _envConfig = require("../../config/env.config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var secret = _envConfig.authN.AUTH_KEY;

var generateToken = function generateToken(payload) {
  return _jsonwebtoken["default"].sign(payload, secret, {
    expiresIn: "".concat(1, "hour")
  });
};

exports.generateToken = generateToken;

var verifyToken = function verifyToken(token) {
  return _jsonwebtoken["default"].verify(token, secret);
};

exports.verifyToken = verifyToken;