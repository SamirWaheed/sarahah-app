"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectSignatureByTypeAndRole = exports.detectSecretByRole = exports.generateLoginCredentials = exports.authenticateToken = exports.decodeToken = exports.verifyToken = exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _envConfig = require("../../config/env.config.js");

var _utilsIndex = require("../utils.index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateToken = function generateToken(_ref) {
  var payload = _ref.payload,
      secret = _ref.secret,
      options = _ref.options;
  return _jsonwebtoken["default"].sign(payload, secret, options);
};

exports.generateToken = generateToken;

var verifyToken = function verifyToken(_ref2) {
  var token = _ref2.token,
      secret = _ref2.secret;
  return _jsonwebtoken["default"].verify(token, secret);
};

exports.verifyToken = verifyToken;

var decodeToken = function decodeToken(token) {
  return _jsonwebtoken["default"].decode(token);
};

exports.decodeToken = decodeToken;

var authenticateToken = function authenticateToken(token, tokenType) {
  var data, _detectSignatureByTyp, tokenSignature, decodedData, isBlacklisted;

  return regeneratorRuntime.async(function authenticateToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = decodeToken(token);

          if (data) {
            _context.next = 3;
            break;
          }

          throw new Error("Invalid Or Expired Token", {
            cause: {
              statusCode: 401
            }
          });

        case 3:
          _detectSignatureByTyp = detectSignatureByTypeAndRole({
            role: data.role,
            tokenTypes: tokenType
          }), tokenSignature = _detectSignatureByTyp.tokenSignature;

          if (tokenSignature) {
            _context.next = 6;
            break;
          }

          throw new Error("Invalid Signature", {
            cause: {
              statusCode: 403
            }
          });

        case 6:
          decodedData = verifyToken({
            token: token,
            secret: tokenSignature
          });

          if (decodedData) {
            _context.next = 9;
            break;
          }

          throw new Error("Invalid Or Expired Token", {
            cause: {
              statusCode: 401
            }
          });

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(_utilsIndex.stringServices.getKey({
            key: "Blacklist:".concat(tokenType, ":").concat(decodedData.jti)
          }));

        case 11:
          isBlacklisted = _context.sent;
          console.log(isBlacklisted);

          if (!isBlacklisted) {
            _context.next = 15;
            break;
          }

          throw new Error("Token has been blacklisted", {
            cause: {
              statusCode: 401
            }
          });

        case 15:
          return _context.abrupt("return", {
            decodedData: decodedData
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.authenticateToken = authenticateToken;

var generateLoginCredentials = function generateLoginCredentials(_ref3) {
  var payload = _ref3.payload,
      options = _ref3.options,
      requiredToken = _ref3.requiredToken;
  var signature = detectSignatureByTypeAndRole({
    role: payload.role,
    both: true
  });
  var accessToken, refreshToken;

  switch (requiredToken) {
    case _utilsIndex.Token_Type.Access:
      accessToken = generateToken({
        payload: payload,
        secret: signature.accessSignature,
        options: options.accessOptions
      });
      break;

    case _utilsIndex.Token_Type.Refresh:
      refreshToken = generateToken({
        payload: payload,
        secret: signature.refreshSignature,
        options: options.refreshOptions
      });
      break;

    default:
      accessToken = generateToken({
        payload: payload,
        secret: signature.accessSignature,
        options: options.accessOptions
      });
      refreshToken = generateToken({
        payload: payload,
        secret: signature.refreshSignature,
        options: options.refreshOptions
      });
  }

  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  };
};

exports.generateLoginCredentials = generateLoginCredentials;

var detectSecretByRole = function detectSecretByRole(_ref4) {
  var role = _ref4.role;
  var signature;

  switch (role) {
    case _utilsIndex.User_Role.Admin:
      signature = _envConfig.jwtConfig.admin;
      break;

    case _utilsIndex.User_Role.User:
      signature = _envConfig.jwtConfig.user;
      break;

    default:
      signature = _envConfig.jwtConfig.user;
  }

  return signature;
};

exports.detectSecretByRole = detectSecretByRole;

var detectSignatureByTypeAndRole = function detectSignatureByTypeAndRole(_ref5) {
  var role = _ref5.role,
      tokenTypes = _ref5.tokenTypes,
      _ref5$both = _ref5.both,
      both = _ref5$both === void 0 ? false : _ref5$both;
  var signatures = detectSecretByRole({
    role: role
  });
  var tokenSignature;

  if (both) {
    return signatures;
  }

  switch (tokenTypes) {
    case _utilsIndex.Token_Type.Access:
      tokenSignature = signatures.accessSignature;
      break;

    case _utilsIndex.Token_Type.Refresh:
      tokenSignature = signatures.refreshSignature;
      break;

    default:
      throw new Error("Invalid Token Type", {
        cause: {
          statusCode: 400
        }
      });
  }

  return {
    tokenSignature: tokenSignature
  };
};

exports.detectSignatureByTypeAndRole = detectSignatureByTypeAndRole;