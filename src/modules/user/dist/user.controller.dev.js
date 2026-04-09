"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var userService = _interopRequireWildcard(require("./user.service.js"));

var _index = require("../../middlewares/index.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authenticate = _index.authMiddleware.authenticate;
var userRouter = (0, _express["default"])();
userRouter.get('/info', authenticate, function _callee(req, res, next) {
  var usrId, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          usrId = req.user.id;
          console.log(usrId);
          _context.next = 4;
          return regeneratorRuntime.awrap(userService.findUser(usrId));

        case 4:
          result = _context.sent;
          return _context.abrupt("return", res.status(200).json(result));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
userRouter.patch('/update-profile', authenticate, function _callee2(req, res, next) {
  var usrId, body, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          usrId = req.user.id;
          body = req.body;
          _context2.next = 4;
          return regeneratorRuntime.awrap(userService.updateUser(usrId, body));

        case 4:
          result = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(result));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
userRouter["delete"]('/soft-delete', authenticate, function _callee3(req, res, next) {
  var usrId, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          usrId = req.user.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(userService.softDeleteUser(usrId));

        case 3:
          result = _context3.sent;
          return _context3.abrupt("return", res.status(201).json({
            message: "Deleted Account",
            result: result
          }));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
userRouter.patch('/restore-account', authenticate, function _callee4(req, res, next) {
  var usrId, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          usrId = req.user.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(userService.restoreDeletedUser(usrId));

        case 3:
          result = _context4.sent;
          return _context4.abrupt("return", res.status(201).json({
            message: "Restore Account Successfully ",
            result: result
          }));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
userRouter["delete"]('/delete-account', authenticate, function _callee5(req, res, next) {
  var usrId, result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          usrId = req.user.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(userService.hardDeleteAccount(usrId));

        case 3:
          result = _context5.sent;
          return _context5.abrupt("return", res.status(201).json({
            message: "Deleted Account Successfully",
            result: result
          }));

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
userRouter.get('/user-messages', authenticate, function _callee6(req, res, next) {
  var usrId, result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          usrId = req.user.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(userService.getUserWithMessages(usrId));

        case 3:
          result = _context6.sent;
          return _context6.abrupt("return", res.status(200).json(result));

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});
var _default = userRouter;
exports["default"] = _default;