import fs from 'fs';

import template from './template';

export default function ({ args, data }) {
  const writeStream = fs.createWriteStream(args.dest, { flags: 'w' });
  return new Promise((resolve) => {
    data.forEach((contract) => {
      writeStream.write(`* [${contract.name}](#${contract.name.toLowerCase()})\n`);
      contract.abiDocs.forEach((docItem) => {
        if (typeof docItem.name !== 'undefined') {
          writeStream.write(`  * [${docItem.name}](#${docItem.type}-${docItem.name.toLowerCase()})\n`);
        }
      });
    });

    data.forEach((contract) => {
      const md = template(contract);
      writeStream.write(md);
    });
    resolve(writeStream.end());
  });
}
