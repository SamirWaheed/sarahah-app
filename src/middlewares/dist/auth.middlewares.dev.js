"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = exports.authenticate = void 0;

var _utilsIndex = require("../utils/utils.index.js");

var authenticate = function authenticate(req, res, next) {
  var authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token required", {
      cause: {
        status: 401
      }
    });
  }

  var token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Invalid Or Expired Token", {
      cause: {
        status: 401
      }
    });
  }

  var data = _utilsIndex.jwtMethods.authenticateToken(token, _utilsIndex.Token_Type.Access);

  req.user = data;
  next();
};

exports.authenticate = authenticate;

var authorize = function authorize(roles) {
  return function (req, res, next) {
    var userRole = req.user.role;

    if (!roles.includes(userRole)) {
      throw new Error("Unauthorized Access", {
        cause: {
          status: 403
        }
      });
    }

    next();
  };
};

exports.authorize = authorize;