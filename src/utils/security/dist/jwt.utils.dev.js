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
  var decodedData = decodeToken(token);

  if (!decodedData) {
    throw new Error("Invalid Or Expired Token", {
      cause: {
        status: 401
      }
    });
  }

  var signature = detectSignatureByTypeAndRole({
    role: decodedData.role,
    tokenType: tokenType
  });

  if (!signature) {
    throw new Error("Invalid Signature", {
      cause: {
        status: 403
      }
    });
  }

  var decoded = verifyToken({
    token: token,
    secret: signature
  });

  if (!decoded) {
    throw new Error("Invalid Or Expired Token", {
      cause: {
        status: 401
      }
    });
  }

  return {
    decoded: decoded
  };
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
      break;
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
  console.log(signatures);
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
          status: 400
        }
      });
  }

  return tokenSignature;
};

exports.detectSignatureByTypeAndRole = detectSignatureByTypeAndRole;