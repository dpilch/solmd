'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var markdownTable = require('markdown-table');

var isAccessor = function isAccessor(_ref) {
  var stateMutability = _ref.stateMutability,
      inputs = _ref.inputs,
      outputs = _ref.outputs;
  return stateMutability === 'view' && inputs.every(function (_ref2) {
    var name = _ref2.name,
        description = _ref2.description;
    return !name && !description;
  }) && outputs.length === 1 && !outputs[0].name && !outputs[0].description;
};

function formatTable(argList) {
  var columns = [['type', function (t) {
    return '*' + t + '*';
  }], ['name', function (n) {
    return '`' + n + '`';
  }], ['description']].filter(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        col = _ref4[0];

    return argList.some(function (obj) {
      return obj[col] != null && obj[col] !== '';
    });
  });
  if (columns.length > 0) {
    return markdownTable([columns.map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          col = _ref6[0];

      return col;
    })].concat(_toConsumableArray(argList.map(function (obj) {
      return columns.map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            col = _ref8[0],
            fmt = _ref8[1];

        return fmt ? fmt(obj[col]) : obj[col];
      });
    }))));
  }
  return '';
}

var formatMethod = function formatMethod(docItem) {
  return docItem.name + '(' + docItem.inputs.map(function (_ref9) {
    var type = _ref9.type,
        indexed = _ref9.indexed,
        name = _ref9.name;
    return '*' + type + '*' + (indexed ? ' indexed' : '') + (name ? ' `' + name + '`' : '');
  }).join(', ') + ')';
};

var formatMethodAnchor = function formatMethodAnchor(docItem) {
  return formatMethod(docItem).toLowerCase().replace(/ /g, '-').replace(/[^-\w]+/g, '');
};

var tableOfContents = exports.tableOfContents = function tableOfContents(it) {
  var cNameLower = it.name.toLowerCase();
  var eventsDocs = it.abiDocs.filter(function (_ref10) {
    var type = _ref10.type;
    return type === 'event';
  });
  var functionDocs = it.abiDocs.filter(function (docItem) {
    return docItem.type === 'function' && !isAccessor(docItem);
  });
  return '* [' + it.name + '](#' + it.name.toLowerCase() + ')\n' + (it.abiDocs.some(function (docItem) {
    return docItem.type === 'function' && isAccessor(docItem);
  }) ? '  * [Accessors](#' + cNameLower + '-accessors)\n' : '') + (eventsDocs.length > 0 ? '  * [Events](#' + cNameLower + '-events)\n' + eventsDocs.map(function (docItem) {
    return '    * [' + formatMethod(docItem) + '](#' + cNameLower + '.' + formatMethodAnchor(docItem) + ')';
  }).join('\n') + '\n' : '') + (functionDocs.length > 0 ? '  * [Functions](#' + cNameLower + '-functions)\n' + functionDocs.map(function (docItem) {
    return '    * [' + formatMethod(docItem) + '](#' + cNameLower + '.' + formatMethodAnchor(docItem) + ')';
  }).join('\n') + '\n' : '');
};

var constructorNote = function constructorNote(it) {
  var constructorDoc = it.abiDocs.find(function (_ref11) {
    var type = _ref11.type;
    return type === 'constructor';
  });

  return '- **Constructor**: ' + it.name + '(' + (constructorDoc ? constructorDoc.inputs.map(function (_ref12) {
    var type = _ref12.type,
        name = _ref12.name;
    return '*' + type + '* `' + name + '`';
  }).join(', ') : '') + ')\n';
};

var fallbackNote = function fallbackNote(it) {
  var fallbackDoc = it.abiDocs.find(function (_ref13) {
    var type = _ref13.type;
    return type === 'fallback';
  });

  return fallbackDoc ? '- This contract has a `' + fallbackDoc.stateMutability + '` fallback function.\n' : '- This contract does **not** have a fallback function.\n';
};

var accessorsSection = function accessorsSection(it) {
  var accessorDocs = it.abiDocs.filter(function (docItem) {
    return docItem.type === 'function' && isAccessor(docItem);
  });
  if (accessorDocs.length === 0) return '';

  return '\n## ' + it.name + ' Accessors\n\n' + accessorDocs.map(function (docItem) {
    return '* *' + docItem.outputs[0].type + '* ' + formatMethod(docItem) + ' `' + docItem.signatureHash + '`';
  }).join('\n') + '\n';
};

var eventsSection = function eventsSection(it) {
  var eventsDocs = it.abiDocs.filter(function (_ref14) {
    var type = _ref14.type;
    return type === 'event';
  });
  if (eventsDocs.length === 0) return '';

  return '\n## ' + it.name + ' Events\n\n' + eventsDocs.map(function (docItem) {
    return '### ' + it.name + '.' + formatMethod(docItem) + '\n\n' + (docItem.anonymous ? 'This event is `anonymous`' : '**Signature hash**: `' + docItem.signatureHash + '`');
  }).join('\n\n') + '\n';
};

var functionsSection = function functionsSection(it) {
  var functionDocs = it.abiDocs.filter(function (docItem) {
    return docItem.type === 'function' && !isAccessor(docItem);
  });
  if (functionDocs.length === 0) return '';

  return '\n## ' + it.name + ' Functions\n\n' + functionDocs.map(function (docItem) {
    return '### ' + it.name + '.' + formatMethod(docItem) + '\n\n' + [docItem.stateMutability ? '- **State mutability**: `' + docItem.stateMutability + '`' : null, docItem.signatureHash ? '- **Signature hash**: `' + docItem.signatureHash + '`' : null, docItem.author ? '- **Author**: ' + docItem.author : null, docItem.notice ? '- **Notice**: ' + docItem.notice : null].filter(function (v) {
      return v != null;
    }).join('\n') + '\n' + (docItem.details ? '\n' + docItem.details + '\n' : '') + (docItem.inputs.length > 0 ? '\n#### Inputs\n\n' + formatTable(docItem.inputs) + '\n' : '') + (docItem.outputs.length > 0 ? '\n#### Outputs\n\n' + formatTable(docItem.outputs) + '\n' : '');
  }).join('\n');
};

var template = exports.template = function template(it) {
  return '# ' + it.name + '\n\n' + (it.title ? '### ' + it.title + '\n\n' : '') + (it.author ? '- **Author**: ' + it.author + '\n' : '') + constructorNote(it) + fallbackNote(it) + accessorsSection(it) + eventsSection(it) + functionsSection(it);
};