'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dot = require('dot');

var _dot2 = _interopRequireDefault(_dot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '\n# {{=it.name}}\n{{? it.author }}\n{{=it.author}}{{?}}\n{{~it.abiDocs :docItem:index}}{{? docItem.type === \'function\'}}\n## *{{=docItem.type}}* {{=docItem.name}}\n\n{{=it.name}}.{{=docItem.name}}({{=docItem.argumentList}}){{?docItem.payable}}`payable`{{?}} `{{=docItem.signatureHash}}`\n{{?docItem.notice}}\n**{{=docItem.notice}}**\n{{?}}\n{{?docItem.details}}> {{=docItem.details}}\n{{?}}\n{{? docItem.inputs.length > 0 }}Inputs\n\n| | | |\n|-|-|-|{{~docItem.inputs :input}}\n| *{{=input.type}}* | {{=input.name}} | {{=input.description}} |{{~}}{{?}}\n{{? docItem.outputs.length > 0 }}Outputs\n\n| | | |\n|-|-|-|{{~docItem.outputs :output}}\n| *{{=output.type}}* | {{=output.name}} | {{=output.description}} |{{~}}{{?}}{{?}}\n{{~}}\n---';

_dot2.default.templateSettings.strip = false;

exports.default = _dot2.default.template(template);