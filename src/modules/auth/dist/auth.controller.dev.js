"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var authService = _interopRequireWildcard(require("./auth.service.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authRouter = (0, _express["default"])();
authRouter.post('/signup', function _callee(req, res, next) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req);
          _context.next = 3;
          return regeneratorRuntime.awrap(authService.signUp(req.body));

        case 3:
          result = _context.sent;
          return _context.abrupt("return", res.status(201).json(result));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
authRouter.post('/login', function _callee2(req, res, next) {
  var _ref, accessToken, refreshToken, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(authService.login(req.body));

        case 2:
          _ref = _context2.sent;
          accessToken = _ref.accessToken;
          refreshToken = _ref.refreshToken;
          user = _ref.user;
          return _context2.abrupt("return", res.status(200).json({
            message: "login Successfully",
            token: accessToken,
            refreshToken: refreshToken,
            user: user
          }));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
authRouter.post('/refresh', function _callee3(req, res, next) {
  var result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(authService.refreshToken(req.headers));

        case 2:
          result = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(result));

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var _default = authRouter;
exports["default"] = _default;