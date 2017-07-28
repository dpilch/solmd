export default `
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
`;
