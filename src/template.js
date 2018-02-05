function formatTable(argList) {
  const columns = [
    ['type', t => `*${t}*`],
    ['name'],
    ['description'],
    ['indexed', i => `${i ? '' : 'not '}indexed`],
  ].filter(([col]) => argList.some(obj => obj[col] != null && obj[col] !== ''));
  if (columns.length > 0) {
    //         return `| ${ columns.map(([col]) => `**${ col }**`).join(' | ') } |
    // |${ columns.map(([col]) => '-').join('|') }|
    return `${argList.map(obj => `| ${columns.map(([col, fmt]) => (fmt ? fmt(obj[col]) : obj[col])).join(' | ')} |`).join('\n')}`;
  }
  return '';
}

const template = it => `
# ${it.name}

${it.author ? `${it.author}

` : ''}${it.abiDocs.map(docItem => (docItem.type === 'event' || docItem.type === 'function' ?
  `## *${docItem.type}* ${docItem.name}

${[
    `${it.name}.${docItem.name}(${docItem.argumentList})`,
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

` : ''}` : '')).join('')}---`;

export default template;
