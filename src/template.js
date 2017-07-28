import doT from 'dot';


const template = `
# {{=it.name}}

{{~it.abiDocs :method:index}}
## {{=method.name}}

{{~}}
`;

doT.templateSettings.strip = false;

export default doT.template(template);
