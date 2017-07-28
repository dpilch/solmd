import parseAbi from './parse-abi';
import solc from './solc';

function compile({ contracts }) {
  const data = [];
  Object.keys(contracts).forEach((contractName) => {
    const contract = contracts[contractName];
    const { fileName } = contract;
    const { devdoc } = contract;
    const { author, title } = devdoc;
    data.push({
      author,
      title,
      fileName: fileName.replace(process.env.PWD, ''),
      name: contractName,
      abiDocs: parseAbi(contract),
    });
  });

  return data;
}


export default function (opts) {
  return solc(opts._).then(({ contracts }) => (
    compile({ ...opts, contracts })
  ));
}
