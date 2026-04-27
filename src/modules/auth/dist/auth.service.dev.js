"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.gmailLogin = exports.gmailSignUp = exports.refreshToken = exports.login = exports.signUp = void 0;

var _index = require("../../config/index.js");

var _indexRepo = require("../../database/repository/index.repo.js");

var _crypto = _interopRequireWildcard(require("crypto"));

var _jwtUtils = require("../../utils/security/jwt.utils.js");

var _utilsIndex = require("../../utils/utils.index.js");

var _googleAuthLibrary = require("google-auth-library");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var client = new _googleAuthLibrary.OAuth2Client();

var buildTokens = function buildTokens(data) {
  var payload = {
    id: data._id,
    role: data.role,
    email: data.email
  };

  var _jwtMethods$generateL = _utilsIndex.jwtMethods.generateLoginCredentials({
    payload: payload,
    options: {
      accessOptions: {
        expiresIn: _index.jwtConfig[data.role].accessExpirationTimeSec,
        jwtid: (0, _crypto.randomUUID)()
      },
      refreshOptions: {
        expiresIn: _index.jwtConfig[data.role].refreshExpirationTimeSec,
        jwtid: (0, _crypto.randomUUID)()
      }
    }
  }),
      accessToken = _jwtMethods$generateL.accessToken,
      refreshToken = _jwtMethods$generateL.refreshToken;

  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  };
};

var verifyGoogleToken = function verifyGoogleToken(token) {
  var ticket;
  return regeneratorRuntime.async(function verifyGoogleToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(client.verifyIdToken({
            idToken: token,
            audience: _index.gcpConfig.webClientId
          }));

        case 2:
          ticket = _context.sent;
          return _context.abrupt("return", ticket.getPayload());

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var createOrUpdateGoogleUser = function createOrUpdateGoogleUser(user, payload) {
  var given_name, family_name, email, sub;
  return regeneratorRuntime.async(function createOrUpdateGoogleUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          given_name = payload.given_name, family_name = payload.family_name, email = payload.email, sub = payload.sub;

          if (!user) {
            _context2.next = 7;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(_indexRepo.userRepository.findAndUpdateDocument({
            _id: user._id,
            data: {
              firstName: given_name,
              lastName: family_name,
              email: email
            },
            options: {
              "new": true
            }
          }));

        case 4:
          return _context2.abrupt("return", _context2.sent);

        case 7:
          _context2.t0 = regeneratorRuntime;
          _context2.t1 = _indexRepo.userRepository;
          _context2.t2 = email;
          _context2.t3 = given_name;
          _context2.t4 = family_name;
          _context2.t5 = _utilsIndex.Provider_Type.Google;
          _context2.t6 = sub;
          _context2.next = 16;
          return regeneratorRuntime.awrap(_utilsIndex.hashingMethods.hashingPassword(_crypto["default"].randomBytes(12).toString("hex")));

        case 16:
          _context2.t7 = _context2.sent;
          _context2.t8 = {
            email: _context2.t2,
            firstName: _context2.t3,
            lastName: _context2.t4,
            provider: _context2.t5,
            googleId: _context2.t6,
            password: _context2.t7
          };
          _context2.t9 = _context2.t1.createDocument.call(_context2.t1, _context2.t8);
          _context2.next = 21;
          return _context2.t0.awrap.call(_context2.t0, _context2.t9);

        case 21:
          return _context2.abrupt("return", _context2.sent);

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var signUp = function signUp(body) {
  var firstName, lastName, email, password, gender, role, phone, checkEmail, hashPass, user, newUser;
  return regeneratorRuntime.async(function signUp$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          firstName = body.firstName, lastName = body.lastName, email = body.email, password = body.password, gender = body.gender, role = body.role, phone = body.phone;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_indexRepo.userRepository.findByEmail({
            email: email
          }, {
            email: 1
          }));

        case 3:
          checkEmail = _context3.sent;

          if (!checkEmail) {
            _context3.next = 6;
            break;
          }

          throw new Error("Email Already Exist", {
            cause: {
              statuscode: 409
            }
          });

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(_utilsIndex.hashingMethods.hashingPassword(password));

        case 8:
          hashPass = _context3.sent;
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

          _context3.next = 13;
          return regeneratorRuntime.awrap(_indexRepo.userRepository.createDocument(user));

        case 13:
          newUser = _context3.sent;
          return _context3.abrupt("return", newUser);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.signUp = signUp;

var login = function login(body) {
  var email, password, user, verify, _buildTokens, accessToken, refreshToken, _user$toObject, hashedPass, safeUser;

  return regeneratorRuntime.async(function login$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          email = body.email, password = body.password;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_indexRepo.userRepository.findByEmail({
            email: email
          }, {
            password: 1,
            email: 1,
            role: 1
          }));

        case 3:
          user = _context4.sent;

          if (user) {
            _context4.next = 6;
            break;
          }

          throw new Error("Email not Found", {
            cause: {
              statusCode: 404
            }
          });

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(_utilsIndex.hashingMethods.verifyPassword(user.password, password));

        case 8:
          verify = _context4.sent;

          if (verify) {
            _context4.next = 11;
            break;
          }

          throw new Error("Invalid Password", {
            cause: {
              statusCode: 409
            }
          });

        case 11:
          _buildTokens = buildTokens(user), accessToken = _buildTokens.accessToken, refreshToken = _buildTokens.refreshToken;
          _user$toObject = user.toObject(), hashedPass = _user$toObject.password, safeUser = _objectWithoutProperties(_user$toObject, ["password"]);
          return _context4.abrupt("return", {
            tokens: {
              accessToken: accessToken,
              refreshToken: refreshToken
            },
            user: safeUser
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.login = login;

var refreshToken = function refreshToken(header) {
  var refreshToken, _jwtMethods$authentic, decoded, payload, _jwtMethods$generateL2, accessToken;

  return regeneratorRuntime.async(function refreshToken$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
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
                expiresIn: _index.jwtConfig[decoded.role].accessExpirationTime
              }
            },
            requiredToken: _utilsIndex.Token_Type.Access
          }), accessToken = _jwtMethods$generateL2.accessToken;
          return _context5.abrupt("return", {
            accessToken: accessToken
          });

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.refreshToken = refreshToken;

var gmailSignUp = function gmailSignUp(body) {
  var idToken, payload, user, userdata;
  return regeneratorRuntime.async(function gmailSignUp$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          idToken = body.idToken;
          _context6.next = 3;
          return regeneratorRuntime.awrap(verifyGoogleToken(idToken));

        case 3:
          payload = _context6.sent;

          if (!(!payload || !payload.email_verified)) {
            _context6.next = 6;
            break;
          }

          throw new Error("Invalid Email ", {
            cause: {
              statusCode: 401
            }
          });

        case 6:
          _context6.next = 8;
          return regeneratorRuntime.awrap(_indexRepo.userRepository.findOne({
            $or: [{
              email: payload.email,
              googleId: payload.sub
            }],
            provider: _utilsIndex.Provider_Type.Google
          }));

        case 8:
          user = _context6.sent;
          _context6.next = 11;
          return regeneratorRuntime.awrap(createOrUpdateGoogleUser({
            user: user,
            payload: payload
          }));

        case 11:
          userdata = _context6.sent;
          return _context6.abrupt("return", buildTokens(userData));

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.gmailSignUp = gmailSignUp;

var gmailLogin = function gmailLogin(body) {
  var idToken, payload, user;
  return regeneratorRuntime.async(function gmailLogin$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          idToken = body.idToken;
          _context7.next = 3;
          return regeneratorRuntime.awrap(verifyGoogleToken(idToken));

        case 3:
          payload = _context7.sent;

          if (!(!payload || !payload.email_verified)) {
            _context7.next = 6;
            break;
          }

          throw new Error("Invalid Email ", {
            cause: {
              statusCode: 401
            }
          });

        case 6:
          _context7.next = 8;
          return regeneratorRuntime.awrap(_indexRepo.userRepository.findOne({
            $or: [{
              email: payload.email,
              googleId: payload.sub
            }],
            provider: _utilsIndex.Provider_Type.Google
          }));

        case 8:
          user = _context7.sent;

          if (user) {
            _context7.next = 11;
            break;
          }

          throw new Error("User Not found ", {
            cause: {
              statusCode: 404
            }
          });

        case 11:
          return _context7.abrupt("return", buildTokens(user));

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.gmailLogin = gmailLogin;

var logout = function logout(accessTokenData, refreshToken) {
  var _ref, refreshTokenData, refreshExpiration, refreshTokenId, accessExpiration, accessTokenId;

  return regeneratorRuntime.async(function logout$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap((0, _jwtUtils.authenticateToken)(refreshToken, _utilsIndex.Token_Type.Refresh));

        case 2:
          _ref = _context8.sent;
          refreshTokenData = _ref.decodedData;
          refreshExpiration = refreshTokenData.exp, refreshTokenId = refreshTokenData.jti;
          accessExpiration = accessTokenData.exp, accessTokenId = accessTokenData.jti;
          Promise.all([(0, _utilsIndex.blacklistTokens)("Blacklist:".concat(_utilsIndex.Token_Type.Refresh, ":").concat(refreshTokenId), refreshExpiration), (0, _utilsIndex.blacklistTokens)("Blacklist:".concat(_utilsIndex.Token_Type.Access, ":").concat(accessTokenId), accessExpiration)]);
          return _context8.abrupt("return", true);

        case 8:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.logout = logout;