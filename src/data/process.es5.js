import _regeneratorRuntime from 'babel-runtime/regenerator';

var justDo = function () {
  var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
    var files;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return glob('*-????.js', {
              cwd: __dirname
            });

          case 2:
            files = _context.sent;


            console.log(files);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function justDo() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import fse from 'fs-extra';
import glob from 'globbly';

justDo().then(function () {
  process.exit(0);
}, function (err) {
  console.error(err);
  process.exit(1);
});
