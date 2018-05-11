"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dot = _interopRequireDefault(require("dot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const template = `
# {{=it.name}}
{{? it.author }}
{{=it.author}}{{?}}
{{~it.abiDocs :docItem:index}}{{? docItem.type === 'event'}}## *{{=docItem.type}}* {{=docItem.name}}

{{=it.name}}.{{=docItem.name}}({{=docItem.argumentList}}) {{?docItem.anonymous}}\`anonymous\` {{?}}\`{{=docItem.signatureHash}}\`

{{? docItem.inputs.length > 0 }}Arguments

| **type** | **name** | **description** |
|-|-|-|{{~docItem.inputs :argument}}
| *{{=argument.type}}* | {{=argument.name}} | {{? argument.indexed === false}}not {{?}}indexed |{{~}}{{?}}
{{?}}{{? docItem.type === 'function'}}
## *{{=docItem.type}}* {{=docItem.name}}

{{=it.name}}.{{=docItem.name}}({{=docItem.argumentList}}) \`{{=docItem.stateMutability}}\` \`{{=docItem.signatureHash}}\`
{{?docItem.notice}}
**{{=docItem.notice}}**
{{?}}
{{?docItem.details}}> {{=docItem.details}}
{{?}}
{{? docItem.inputs.length > 0 }}Inputs

| **type** | **name** | **description** |
|-|-|-|{{~docItem.inputs :input}}
| *{{=input.type}}* | {{=input.name}} | {{=input.description}} |{{~}}{{?}}
{{? docItem.outputs.length > 0 }}
Outputs

| **type** | **name** | **description** |
|-|-|-|{{~docItem.outputs :output}}
| *{{=output.type}}* | {{=output.name}} | {{=output.description}} |{{~}}{{?}}{{?}}
{{~}}
---`;
_dot.default.templateSettings.strip = false;

var _default = _dot.default.template(template);

exports.default = _default;