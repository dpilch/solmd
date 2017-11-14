import doT from 'dot';

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
|-|-|-|{{~docItem.inputs :argument}}
|-|-|-|{{~docItem.inputs :input}}
| *{{=input.type}}* | {{=input.name}} | {{=input.description}} |{{~}}{{?}}
{{? docItem.outputs.length > 0 }}
Outputs

| **type** | **name** | **description** |
|-|-|-|{{~docItem.outputs :output}}
| *{{=output.type}}* | {{=output.name}} | {{=output.description}} |{{~}}{{?}}{{?}}
{{~}}
---`;

doT.templateSettings.strip = false;

export default doT.template(template);
