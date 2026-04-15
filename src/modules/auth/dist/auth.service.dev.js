"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshToken = exports.login = exports.signUp = void 0;

var _envConfig = require("../../config/env.config.js");

var _indexRepo = require("../../database/repository/index.repo.js");

var _utilsIndex = require("../../utils/utils.index.js");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var signUp = function signUp(body) {
  var firstName, lastName, email, password, gender, role, phone, checkEmail, hashPass, user, newUser;
  return regeneratorRuntime.async(function signUp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          firstName = body.firstName, lastName = body.lastName, email = body.email, password = body.password, gender = body.gender, role = body.role, phone = body.phone;
          _context.next = 3;
          return regeneratorRuntime.awrap(_indexRepo.userRepository.findByEmail({
            email: email
          }, {
            email: 1
          }));

        case 3:
          checkEmail = _context.sent;

          if (!checkEmail) {
            _context.next = 6;
            break;
          }

          throw new Error("Email Already Exist", {
            cause: {
              status: 409
            }
          });

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_utilsIndex.hashingMethods.hashingPassword(password));

        case 8:
          hashPass = _context.sent;
          user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPass,
            gender: gender,
            role: role
          };

          if (phone) {
            user.phone = _utilsIndex.encryptionMethods.encrypt(phone);
          }

          _context.next = 13;
          return regeneratorRuntime.awrap(_indexRepo.userRepository.createDocument(user));

        case 13:
          newUser = _context.sent;
          return _context.abrupt("return", newUser);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.signUp = signUp;

var login = function login(body) {
  var email, password, user, verify, payload, _jwtMethods$generateL, accessToken, refreshToken, _user$toObject, hashedPass, safeUser;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = body.email, password = body.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_indexRepo.userRepository.findByEmail({
            email: email
          }, {
            password: 1,
            email: 1,
            role: 1
          }));

        case 3:
          user = _context2.sent;
          console.log(user.email);
          console.log(user.password);

          if (user) {
            _context2.next = 8;
            break;
          }

          throw new Error("Email not Found", {
            cause: {
              status: 404
            }
          });

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(_utilsIndex.hashingMethods.verifyPassword(user.password, password));

        case 10:
          verify = _context2.sent;

          if (verify) {
            _context2.next = 13;
            break;
          }

          throw new Error("Invalid Password", {
            cause: {
              status: 409
            }
          });

        case 13:
          payload = {
            id: user._id,
            role: user.role,
            email: user.email
          };
          _jwtMethods$generateL = _utilsIndex.jwtMethods.generateLoginCredentials({
            payload: payload,
            options: {
              accessOptions: {
                expiresIn: _envConfig.jwtConfig[user.role].accessExpirationTime
              },
              refreshOptions: {
                expiresIn: _envConfig.jwtConfig[user.role].refreshExpirationTime
              }
            }
          }), accessToken = _jwtMethods$generateL.accessToken, refreshToken = _jwtMethods$generateL.refreshToken;
          _user$toObject = user.toObject(), hashedPass = _user$toObject.password, safeUser = _objectWithoutProperties(_user$toObject, ["password"]);
          return _context2.abrupt("return", {
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: safeUser
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.login = login;

var refreshToken = function refreshToken(header) {
  var refreshToken, _jwtMethods$authentic, decoded, payload, _jwtMethods$generateL2, accessToken;

  return regeneratorRuntime.async(function refreshToken$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          refreshToken = header.authorization;
          _jwtMethods$authentic = _utilsIndex.jwtMethods.authenticateToken({
            token: refreshToken,
            tokenType: _utilsIndex.Token_Type.Refresh
          }), decoded = _jwtMethods$authentic.decoded;
          payload = {
            id: decoded.id,
            role: decoded.role,
            email: decoded.email
          };
          _jwtMethods$generateL2 = _utilsIndex.jwtMethods.generateLoginCredentials({
            payload: payload,
            options: {
              accessOptions: {
                expiresIn: _envConfig.jwtConfig[decoded.role].accessExpirationTime
              }
            },
            requiredToken: _utilsIndex.Token_Type.Access
          }), accessToken = _jwtMethods$generateL2.accessToken;
          return _context3.abrupt("return", {
            accessToken: accessToken
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.refreshToken = refreshToken;