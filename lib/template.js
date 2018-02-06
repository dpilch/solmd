'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var markdownTable = require('markdown-table');

function formatTable(argList) {
  var columns = [['type', function (t) {
    return '*' + t + '*';
  }], ['name'], ['description'], ['indexed', function (i) {
    return (i ? '' : 'not ') + 'indexed';
  }]].filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        col = _ref2[0];

    return argList.some(function (obj) {
      return obj[col] != null && obj[col] !== '';
    });
  });
  if (columns.length > 0) {
    return markdownTable([columns.map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          col = _ref4[0];

      return col;
    })].concat(_toConsumableArray(argList.map(function (obj) {
      return columns.map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            col = _ref6[0],
            fmt = _ref6[1];

        return fmt ? fmt(obj[col]) : obj[col];
      });
    }))));
  }
  return '';
}

var template = function template(it) {
  return '# ' + it.name + '\n\n' + (it.title ? it.title + '\n\n' : '') + (it.author ? it.author + '\n\n' : '') + it.abiDocs.map(function (docItem) {
    return '## *' + docItem.type + '*' + (docItem.type !== 'constructor' ? ' ' + docItem.name : '') + '\n\n' + ['' + it.name + (docItem.type !== 'constructor' ? '.' + docItem.name : '') + '(' + docItem.argumentList + ')', docItem.anonymous ? '`anonymous`' : null, docItem.stateMutability ? '`' + docItem.stateMutability + '`' : null, docItem.signatureHash ? '`' + docItem.signatureHash + '`' : null].filter(function (v) {
      return v != null;
    }).join(' ') + '\n\n' + (docItem.notice ? '**' + docItem.notice + '**\n\n' : '') + (docItem.details ? '> ' + docItem.details + '\n\n' : '') + (docItem.inputs.length > 0 ? (docItem.type === 'event' ? 'Arguments' : 'Inputs') + '\n\n' + formatTable(docItem.inputs) + '\n\n' : '') + (docItem.outputs.length > 0 ? 'Outputs\n\n' + formatTable(docItem.outputs) + '\n\n' : '');
  }).join('') + '---';
};

exports.default = template;