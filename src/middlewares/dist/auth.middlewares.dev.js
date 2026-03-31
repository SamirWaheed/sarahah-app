"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = void 0;

var _utilsIndex = require("../utils/utils.index.js");

var authenticate = function authenticate(req, res, next) {
  var authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    throw new Error("Token required", {
      cause: {
        status: 401
      }
    });
  }

  var token = authHeader.split(" ")[1];
  console.log(token);

  if (!token) {
    throw new Error("Invalid Or Expired Token", {
      cause: {
        status: 401
      }
    });
  }

  var decoded = _utilsIndex.jwtMethods.verifyToken(token);

  req.user = decoded;
  next();
};

exports.authenticate = authenticate;