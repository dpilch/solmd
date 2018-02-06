const markdownTable = require('markdown-table');

function formatTable(argList) {
  const columns = [
    ['type', t => `*${t}*`],
    ['name'],
    ['description'],
    ['indexed', i => `${i ? '' : 'not '}indexed`],
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

const template = it => `# ${it.name}

${it.title ? `${it.title}

` : ''}${it.author ? `${it.author}

` : ''}${it.abiDocs.map(docItem =>
  `## *${docItem.type}*${docItem.type !== 'constructor' ? ` ${docItem.name}` : ''}

${[
    `${it.name}${docItem.type !== 'constructor' ? `.${docItem.name}` : ''}(${docItem.argumentList})`,
    docItem.anonymous ? '`anonymous`' : null,
    docItem.stateMutability ? `\`${docItem.stateMutability}\`` : null,
    docItem.signatureHash ? `\`${docItem.signatureHash}\`` : null,
  ].filter(v => v != null).join(' ')}

${docItem.notice ? `**${docItem.notice}**

` : ''}${docItem.details ? `> ${docItem.details}

` : ''}${docItem.inputs.length > 0 ? `${docItem.type === 'event' ? 'Arguments' : 'Inputs'}

${formatTable(docItem.inputs)}

` : ''}${docItem.outputs.length > 0 ? `Outputs

${formatTable(docItem.outputs)}

` : ''}`).join('')}---`;

export default template;
