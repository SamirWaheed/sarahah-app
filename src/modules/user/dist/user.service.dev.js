"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.findUser = void 0;

var _indexRepo = require("../../database/repository/index.repo.js");

var _utilsIndex = require("../../utils/utils.index.js");

var findUser = function findUser(_id) {
  var user;
  return regeneratorRuntime.async(function findUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_indexRepo.userRepository.findById({
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
}; // update user_profile


exports.findUser = findUser;

var updateUser = function updateUser(_id, body) {
  var fistName, lastName, email, gender, phone, user, emailConflict;
  return regeneratorRuntime.async(function updateUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          fistName = body.fistName, lastName = body.lastName, email = body.email, gender = body.gender, phone = body.phone; //destruct data from body
          // check if user found 
          //check if email does not conflict with another user
          //hashing password
          //encrypt phone
          //update user info

          _context2.next = 3;
          return regeneratorRuntime.awrap(_indexRepo.userRepository.findById({
            _id: _id
          }));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          throw new Error('User not found', {
            cause: {
              status: 404
            }
          });

        case 6:
          if (!email) {
            _context2.next = 12;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(_indexRepo.userRepository.findOne({
            email: email
          }));

        case 9:
          emailConflict = _context2.sent;

          if (!emailConflict) {
            _context2.next = 12;
            break;
          }

          throw new Error('Email already in use', {
            cause: {
              status: 409
            }
          });

        case 12:
          return _context2.abrupt("return", user);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.updateUser = updateUser;