import doT from 'dot';

const template = `
# {{=it.name}}
{{? it.author }}
{{=it.author}}{{?}}
{{~it.abiDocs :docItem:index}}{{? docItem.type === 'function'}}
## *{{=docItem.type}}* {{=docItem.name}}

{{=it.name}}.{{=docItem.name}}({{=docItem.argumentList}}){{?docItem.payable}}\`payable\`{{?}} \`{{=docItem.signatureHash}}\`
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
| *{{=output.type}}* | {{=output.name}} | {{=output.description}} |{{~}}{{?}}{{?}}
{{~}}
---`;

doT.templateSettings.strip = false;

export default doT.template(template);
