import fs from 'fs';

import template from './template';

export default function ({ args, data }) {
  console.log(args);
  const writeStream = fs.createWriteStream('sol.md', { flags: 'w' });
  return new Promise((resolve) => {
    data.forEach((contract) => {
      const md = template(contract);
      writeStream.write(md);
    });
    resolve(true);
  });
}
