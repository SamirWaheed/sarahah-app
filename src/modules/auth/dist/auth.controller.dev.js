"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var authService = _interopRequireWildcard(require("./auth.service.js"));

var _index = require("../../middlewares/index.js");

var _googleAuthLibrary = require("google-auth-library");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authenticate = _index.authMiddleware.authenticate;
var authRouter = (0, _express["default"])();
authRouter.post('/signup', (0, _index.unifiedResponse)(function _callee(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(authService.signUp(req.body));

        case 2:
          result = _context.sent;
          return _context.abrupt("return", {
            message: "User Created Successfully",
            data: result,
            meta: {
              statusCode: 201
            }
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}));
authRouter.post('/login', (0, _index.unifiedResponse)(function _callee2(req, res) {
  var _ref, tokens;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(authService.login(req.body));

        case 2:
          _ref = _context2.sent;
          tokens = _ref.tokens;
          return _context2.abrupt("return", {
            message: "login Successfully",
            data: tokens,
            meta: {
              statusCode: 200
            }
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}));
authRouter.post('/refresh', (0, _index.unifiedResponse)(function _callee3(req, res, next) {
  var result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(authService.refreshToken(req.headers));

        case 2:
          result = _context3.sent;
          return _context3.abrupt("return", {
            message: "Token Refreshed Successfully",
            data: result
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}));
authRouter.post("/gmail/register", (0, _index.unifiedResponse)(function _callee4(req, res, next) {
  var result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(authService.gmailSignUp(req.body));

        case 2:
          result = _context4.sent;
          return _context4.abrupt("return", {
            message: "User Created Successfully",
            data: result,
            meta: {
              statusCode: 201
            }
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}));
authRouter.post("/gmail/login", (0, _index.unifiedResponse)(function _callee5(req, res, next) {
  var result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(authService.gmailLogin(req.body));

        case 2:
          result = _context5.sent;
          return _context5.abrupt("return", {
            message: "login Successfully",
            data: result
          });

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}));
authRouter.post("/logout", authenticate, (0, _index.unifiedResponse)(function _callee6(req, res, next) {
  var result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(authService.logout(req.user, req.headers.refreshtoken));

        case 2:
          result = _context6.sent;
          return _context6.abrupt("return", {
            message: "Logout Successfully",
            data: result,
            meta: {
              statusCode: 200
            }
          });

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}));
authRouter.put("/verify-otp", (0, _index.unifiedResponse)(function _callee7(req, res, next) {
  var result;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(authService.verifyOtp(req.body));

        case 2:
          result = _context7.sent;
          return _context7.abrupt("return", {
            message: "Email verified Successfully",
            data: result,
            meta: {
              statusCode: 201
            }
          });

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}));
authRouter.post("/resend-otp", (0, _index.unifiedResponse)(function _callee8(req, res, next) {
  var result;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(authService.resendOtp(req.body));

        case 2:
          result = _context8.sent;
          return _context8.abrupt("return", {
            message: "OTP sent Successfully",
            data: result,
            meta: {
              statusCode: 200
            }
          });

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
}));
var _default = authRouter;
exports["default"] = _default;