import fs from 'fs';

import parseAbi from './parse-abi';
import solc from './solc';

function compile({ contracts, output }) {
  process.stdout.write(`Generating output for ${Object.keys(contracts).length} contracts...\n`);
  Object.keys(contracts).forEach((contractName) => {
    const contract = contracts[contractName];
    const { fileName } = contract;
    const { devdoc } = contract;
    const { author, title } = devdoc;
    const data = {
      author,
      title,
      fileName: fileName.replace(process.env.PWD, ''),
      name: contractName,
      abiDocs: parseAbi(contract),
    };
    return fs.writeFileSync(`${output}/${contractName}.json`, `${JSON.stringify(data)}\n`);
  });
}


export default function (opts) {
  const output = `${process.env.PWD}/${opts.tmp}`;
  return solc(opts.src).then(({ contracts }) => {
    compile({ ...opts, output, contracts });
  });
}
