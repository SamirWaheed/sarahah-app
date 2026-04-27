"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = exports.authenticate = void 0;

var _utilsIndex = require("../utils/utils.index.js");

var authenticate = function authenticate(req, res, next) {
  var authHeader, token, _ref, decodedData;

  return regeneratorRuntime.async(function authenticate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          authHeader = req.headers.authorization;

          if (authHeader) {
            _context.next = 3;
            break;
          }

          throw new Error({
            message: "Token required",
            statusCode: 401
          });

        case 3:
          token = authHeader.split(" ")[1];

          if (token) {
            _context.next = 6;
            break;
          }

          throw new Error("Invalid Or Expired Token", {
            cause: {
              statusCode: 401
            }
          });

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_utilsIndex.jwtMethods.authenticateToken(token, _utilsIndex.Token_Type.Access));

        case 8:
          _ref = _context.sent;
          decodedData = _ref.decodedData;
          req.user = decodedData;
          next();

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.authenticate = authenticate;

var authorize = function authorize(roles) {
  return function (req, res, next) {
    var userRole = req.user.role;

    if (!roles.includes(userRole)) {
      throw new Error("Unauthorized Access", {
        cause: {
          statusCode: 403
        }
      });
    }

    next();
  };
};

exports.authorize = authorize;