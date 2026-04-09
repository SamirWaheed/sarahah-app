"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  messageRouter: true
};
Object.defineProperty(exports, "messageRouter", {
  enumerable: true,
  get: function get() {
    return _messageController["default"];
  }
});

var _messageService = require("./message.service.js");

Object.keys(_messageService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _messageService[key];
    }
  });
});

var _messageController = _interopRequireDefault(require("./message.controller.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }