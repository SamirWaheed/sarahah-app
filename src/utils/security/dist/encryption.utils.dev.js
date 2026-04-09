"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encrypt = encrypt;
exports.decrypt = decrypt;

var _crypto = _interopRequireDefault(require("crypto"));

var _envConfig = require("../../config/env.config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var encryptionKey = Buffer.from(_envConfig.encryption.ENCRYPTION_KEY, "hex");

function encrypt(plainText) {
  var iv = _crypto["default"].randomBytes(Number(_envConfig.encryption.IV_LENGTH));

  var cipher = _crypto["default"].createCipheriv("aes-256-cbc", encryptionKey, iv);

  var encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher["final"]()]);
  return "".concat(iv.toString('hex'), ":").concat(encrypted.toString('hex'));
}

function decrypt(text) {
  var _text$split = text.split(':'),
      _text$split2 = _slicedToArray(_text$split, 2),
      ivBuffer = _text$split2[0],
      encryptText = _text$split2[1];

  var iv = Buffer.from(ivBuffer, "hex");

  var decipher = _crypto["default"].createDecipheriv("aes-256-cbc", encryptionKey, iv);

  var decrypted = decipher.update(encryptText, "hex", "utf-8");
  decrypted += decipher["final"]("utf-8");
  return decrypted;
}