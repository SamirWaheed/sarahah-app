"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function get() {
    return _userModel["default"];
  }
});
Object.defineProperty(exports, "Message", {
  enumerable: true,
  get: function get() {
    return _messageModel["default"];
  }
});

var _userModel = _interopRequireDefault(require("./user.model.js"));

var _messageModel = _interopRequireDefault(require("./message.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }