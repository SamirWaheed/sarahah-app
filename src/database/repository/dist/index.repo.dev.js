"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BaseRepository", {
  enumerable: true,
  get: function get() {
    return _baseRepo.BaseRepository;
  }
});
Object.defineProperty(exports, "userRepository", {
  enumerable: true,
  get: function get() {
    return _userRepo["default"];
  }
});
Object.defineProperty(exports, "messageRepository", {
  enumerable: true,
  get: function get() {
    return _messageRepo["default"];
  }
});

var _baseRepo = require("./base.repo.js");

var _userRepo = _interopRequireDefault(require("./user.repo.js"));

var _messageRepo = _interopRequireDefault(require("./message.repo.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }