"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseRepository = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseRepository =
/*#__PURE__*/
function () {
  function BaseRepository(model) {
    _classCallCheck(this, BaseRepository);

    this._model = model;
  }

  _createClass(BaseRepository, [{
    key: "createDocument",
    value: function createDocument(data) {
      return regeneratorRuntime.async(function createDocument$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this._model.create(data));

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findById",
    value: function findById(id) {
      var select,
          _args2 = arguments;
      return regeneratorRuntime.async(function findById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              select = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _context2.next = 3;
              return regeneratorRuntime.awrap(this._model.findById(id).select(select));

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findOne",
    value: function findOne(filter) {
      var select,
          _args3 = arguments;
      return regeneratorRuntime.async(function findOne$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              select = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.next = 3;
              return regeneratorRuntime.awrap(this._model.findOne(filter).select(select));

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findAll",
    value: function findAll(filter) {
      var select,
          _args4 = arguments;
      return regeneratorRuntime.async(function findAll$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              select = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.next = 3;
              return regeneratorRuntime.awrap(this._model.find(filter).select(select));

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateDocument",
    value: function updateDocument(id, data) {
      var options,
          _args5 = arguments;
      return regeneratorRuntime.async(function updateDocument$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {
                "new": true
              };
              _context5.next = 3;
              return regeneratorRuntime.awrap(this._model.findByIdAndUpdate(id, data, options));

            case 3:
              return _context5.abrupt("return", _context5.sent);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "deleteDocument",
    value: function deleteDocument(id) {
      var options,
          _args6 = arguments;
      return regeneratorRuntime.async(function deleteDocument$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {
                "new": true
              };
              _context6.next = 3;
              return regeneratorRuntime.awrap(this._model.findByIdAndDelete(id, options));

            case 3:
              return _context6.abrupt("return", _context6.sent);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "deleteMany",
    value: function deleteMany(filter) {
      return regeneratorRuntime.async(function deleteMany$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this._model.deleteMany(filter));

            case 2:
              return _context7.abrupt("return", _context7.sent);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "softDeleteDocument",
    value: function softDeleteDocument(id) {
      return regeneratorRuntime.async(function softDeleteDocument$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this._model.findByIdAndUpdate(id, {
                isDeleted: true,
                deletedAt: new Date()
              }));

            case 2:
              return _context8.abrupt("return", _context8.sent);

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "restoreDeletedDocument",
    value: function restoreDeletedDocument(id) {
      return regeneratorRuntime.async(function restoreDeletedDocument$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this._model.findByIdAndUpdate(id, {
                isDeleted: false,
                deletedAt: null
              }));

            case 2:
              return _context9.abrupt("return", _context9.sent);

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }]);

  return BaseRepository;
}();

exports.BaseRepository = BaseRepository;