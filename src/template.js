import doT from 'dot';

const template = `
# {{=it.name}}

{{~it.abiDocs :docItem:index}}
## {{=docItem.name}}

{{=docItem.notice}}

{{=docItem.details}}

Inputs
| | | |
|-|-|-|{{~docItem.inputs :input}}
| {{=input.type}} | {{=input.name}} | {{=input.description}} |{{~}}

Outputs
| | | |
|-|-|-|{{~docItem.outputs :output}}
| {{=output.type}} | {{=output.name}} | {{=output.description}} |{{~}}
{{~}}
`;

doT.templateSettings.strip = false;

export default doT.template(template);
