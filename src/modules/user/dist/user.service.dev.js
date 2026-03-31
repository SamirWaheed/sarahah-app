"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUser = void 0;

var _index = require("../../database/models/index.js");

var _utilsIndex = require("../../utils/utils.index.js");

var findUser = function findUser(_id) {
  var user;
  return regeneratorRuntime.async(function findUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_index.User.findById({
            _id: _id
          }));

        case 2:
          user = _context.sent;

          if (user.phone) {
            user.phone = _utilsIndex.encryptionMethods.decrypt(user.phone);
          }

          return _context.abrupt("return", user);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.findUser = findUser;