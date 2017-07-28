import doT from 'dot';

const template = `
# {{=it.name}}

{{~it.abiDocs :docItem:index}}{{? docItem.type === 'function'}}
## {{=docItem.type}} {{=docItem.name}} \`{{=docItem.signatureHash}}\`
{{?docItem.notice}}
**{{=docItem.notice}}**
{{?}}
{{?docItem.details}}> {{=docItem.details}}
{{?}}
{{? docItem.inputs.length > 0 }}Inputs
| | | |
|-|-|-|{{~docItem.inputs :input}}
| *{{=input.type}}* | {{=input.name}} | {{=input.description}} |{{~}}{{?}}
{{? docItem.outputs.length > 0 }}Outputs
| | | |
|-|-|-|{{~docItem.outputs :output}}
| {{=output.type}} | {{=output.name}} | {{=output.description}} |{{~}}{{?}}{{?}}
{{~}}
---`;

doT.templateSettings.strip = false;

export default doT.template(template);