export default function parseOutputs({ devDocs, method }) {
  let outputs = [];
  try {
    if (typeof devDocs.return !== 'undefined') {
      const outputParams = JSON.parse(devDocs.return);
      outputs = method.outputs.map(param => (
        { ...param, description: outputParams[param.name] }
      ));
    }
  } catch (e) {
    process.stderr.write(`warning: invalid @return for ${method.name} - output may be effected\n`);
    outputs = method.outputs; // eslint-disable-line prefer-destructuring
  }

  return outputs;
}
