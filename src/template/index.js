import doT from 'dot';

import docItem from './doc-item';

const def = {
  docItem,
};

const template = `
# {{=it.name}}

{{~it.abiDocs :docItem:index}}
{{#def.docItem}}
{{~}}
`;

doT.templateSettings.strip = false;

export default doT.template(template, undefined, def);
