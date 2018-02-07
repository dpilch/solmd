const markdownTable = require('markdown-table');

const isAccessor = ({
  stateMutability, inputs, outputs,
}) =>
  stateMutability === 'view' &&
  inputs.every(({ name, description }) => !name && !description) &&
  outputs.length === 1 && !outputs[0].name && !outputs[0].description;

function formatTable(argList) {
  const columns = [
    ['type', t => `*${t}*`],
    ['name', n => `\`${n}\``],
    ['description'],
  ].filter(([col]) => argList.some(obj => obj[col] != null && obj[col] !== ''));
  if (columns.length > 0) {
    return markdownTable([
      columns.map(([col]) => col),
      ...argList.map(obj =>
        columns.map(([col, fmt]) =>
          (fmt ? fmt(obj[col]) : obj[col])))]);
  }
  return '';
}

const formatMethod = docItem => `${docItem.name}(${
  docItem.inputs.map(({ type, indexed, name }) => `*${type}*${
    indexed ? ' indexed' : ''
  }${
    name ? ` \`${name}\`` : ''
  }`).join(', ')
})`;

const formatMethodAnchor = docItem => formatMethod(docItem).toLowerCase().replace(/ /g, '-').replace(/[^-\w]+/g, '');

export const tableOfContents = (it) => {
  const eventsDocs = it.abiDocs.filter(({ type }) => type === 'event');
  const functionDocs = it.abiDocs.filter(docItem => docItem.type === 'function' && !isAccessor(docItem));
  return `* [${it.name}](#${it.name.toLowerCase()})
${it.abiDocs.some(docItem => docItem.type === 'function' && isAccessor(docItem)) ? `  * [Accessors](#accessors)
` : ''}${eventsDocs.length > 0 ? `  * [Events](#events)
${eventsDocs.map(docItem => `    * [${formatMethod(docItem)}](#${formatMethodAnchor(docItem)})`).join('\n')}
` : ''}${functionDocs.length > 0 ? `  * [Functions](#functions)
${functionDocs.map(docItem => `    * [${formatMethod(docItem)}](#${formatMethodAnchor(docItem)})`).join('\n')}
` : ''}`;
};

const constructorNote = (it) => {
  const constructorDoc = it.abiDocs.find(({ type }) => type === 'constructor');

  return `- **Constructor**: ${it.name}(${
    constructorDoc ? constructorDoc.inputs.map(({ type, name }) => `*${type}* \`${name}\``).join(', ') : ''
  })
`;
};

const fallbackNote = (it) => {
  const fallbackDoc = it.abiDocs.find(({ type }) => type === 'fallback');

  return fallbackDoc ? `- This contract has a \`${fallbackDoc.stateMutability}\` fallback function.

` : '- This contract does **not** have a fallback function.\n\n';
};

const eventsSection = (it) => {
  const eventsDocs = it.abiDocs.filter(({ type }) => type === 'event');
  if (eventsDocs.length === 0) return '';

  return `## Events

${eventsDocs.map(docItem => `### ${formatMethod(docItem)}

${
  docItem.anonymous ? 'This event is `anonymous`' : `**Signature hash**: \`${docItem.signatureHash}\``
}`).join('\n\n')}

`;
};

const accessorsSection = (it) => {
  const accessorDocs = it.abiDocs.filter(docItem =>
    docItem.type === 'function' && isAccessor(docItem));
  if (accessorDocs.length === 0) return '';

  return `## Accessors

${accessorDocs.map(docItem => `* *${docItem.outputs[0].type}* ${formatMethod(docItem)} \`${docItem.signatureHash}\``).join('\n')}

`;
};

const functionsSection = (it) => {
  const functionDocs = it.abiDocs.filter(docItem =>
    docItem.type === 'function' && !isAccessor(docItem));
  if (functionDocs.length === 0) return '';

  return `## Functions

${functionDocs.map(docItem =>
    `### ${formatMethod(docItem)}

${[
    docItem.stateMutability ? `- **State mutability**: \`${docItem.stateMutability}\`` : null,
    docItem.signatureHash ? `- **Signature hash**: \`${docItem.signatureHash}\`` : null,
    docItem.author ? `- **Author**: ${docItem.author}` : null,
    docItem.notice ? `- **Notice**: ${docItem.notice}` : null,
  ].filter(v => v != null).join('\n')}

${docItem.details ? `${docItem.details}

` : ''}${docItem.inputs.length > 0 ? `#### Inputs

${formatTable(docItem.inputs)}

` : ''}${docItem.outputs.length > 0 ? `#### Outputs

${formatTable(docItem.outputs)}` : ''}`).join('\n\n')}`;
};

export const template = it => `# ${it.name}

${it.title ? `### ${it.title}

` : ''}${it.author ? `- **Author**: ${it.author}
` : ''}${
  constructorNote(it)
}${
  fallbackNote(it)
}${
  accessorsSection(it)
}${
  eventsSection(it)
}${
  functionsSection(it)
}
`;
