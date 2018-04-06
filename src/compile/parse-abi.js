import getFunctionSignature from '../helpers';
import parseOutputs from './parseOutputs';

export default function parseAbi(contract) {
  return contract.abi.map((method) => {
    const inputParams = method.inputs || [];
    const signature = method.name && `${method.name}(${inputParams.map(i => i.type).join(',')})`;
    const devDocs = (contract.devdoc.methods || {})[signature] || {};
    const userDocs = (contract.userdoc.methods || {})[signature] || {};
    // map abi inputs to devdoc inputs
    const params = devDocs.params || {};
    const inputs = inputParams.map(param => ({ ...param, description: params[param.name] }));
    const argumentList = inputParams.reduce((inputString, param) => `${inputString}${param.name}, `, '').slice(0, -2);
    // don't write this
    delete devDocs.params;

    const outputs = parseOutputs({ devDocs, method });

    return {
      ...method,
      ...devDocs,
      ...userDocs,
      inputs,
      argumentList,
      outputs,
      signature,
      signatureHash: signature && getFunctionSignature(signature),
    };
  });
}
