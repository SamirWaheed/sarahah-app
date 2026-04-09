"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMessage = void 0;

var _indexRepo = require("../../database/repository/index.repo.js");

var createMessage = function createMessage(messageData, receiverId) {
  var content, message;
  return regeneratorRuntime.async(function createMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          content = messageData.content;

          if (receiverId) {
            _context.next = 3;
            break;
          }

          throw new Error("Receiver ID is required");

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_indexRepo.messageRepository.createDocument({
            content: content,
            receiver: [receiverId]
          }));

        case 5:
          message = _context.sent;
          return _context.abrupt("return", message);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.createMessage = createMessage;