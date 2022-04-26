"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = model;

var _pathsResolved = require("./paths-resolved");

var _path = _interopRequireDefault(require("path"));

var _promises = _interopRequireDefault(require("fs/promises"));

var _commander = require("commander");

var _camelCase = _interopRequireDefault(require("../../util-shared/camel-case"));

var _snakeCase = _interopRequireDefault(require("../../util-shared/snake-case"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var program = new _commander.Command(); //TODO: Create parsed attributes option.

program.requiredOption("--name <modelName>");

var STUB_MIGRATION = _path["default"].resolve("./cli/stubs/model-migration.stub.ts");

var STUB_MODEL_DEFINITION = _path["default"].resolve("./cli/stubs/model.stub.ts");

function model(_x) {
  return _model.apply(this, arguments);
}

function _model() {
  _model = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args) {
    var _program$opts, modelName, camelCaseModelName, snakeCaseModelName, contentStubMigration, contentStubModelDefinition;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            program.parse(args);
            _program$opts = program.opts(), modelName = _program$opts.name;
            camelCaseModelName = (0, _camelCase["default"])(modelName, true);
            snakeCaseModelName = (0, _snakeCase["default"])(modelName);
            _context.next = 6;
            return _promises["default"].readFile(STUB_MIGRATION);

          case 6:
            contentStubMigration = _context.sent.toString();
            _context.next = 9;
            return _promises["default"].readFile(STUB_MODEL_DEFINITION);

          case 9:
            contentStubModelDefinition = _context.sent.toString();
            _context.next = 12;
            return _promises["default"].writeFile("".concat(_pathsResolved.MIGRATIONS_PATH, "/").concat(+new Date(), "_create-table-").concat(snakeCaseModelName, ".ts"), contentStubMigration.replace(/\[model\-name\]/g, snakeCaseModelName));

          case 12:
            _context.next = 14;
            return _promises["default"].writeFile("".concat(_pathsResolved.MODELS_PATH, "/").concat(snakeCaseModelName, ".ts"), contentStubModelDefinition.replace(/\[model\-name\]/g, camelCaseModelName));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _model.apply(this, arguments);
}
