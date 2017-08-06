import { getFunctionSignature } from '../helpers';

export default function (contract) {
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

    let outputs;
    try {
      const outputParams = JSON.parse(devDocs.return);
      outputs = method.outputs.map(param => ({ ...param, description: outputParams[param.name] }));
    } catch (e) {
      process.stderr.write(`warning: invalid @return for ${method.name} - output may be effected\n`);
      outputs = method.outputs;
    }

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
