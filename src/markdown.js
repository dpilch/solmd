import template from './template';

export default function ({ data }) {
  return new Promise((resolve) => {
    process.stdout.write('# Contract API\n');
    data.forEach((contract) => {
      const md = template(contract);
      process.stdout.write(md);
    });
    resolve('test');
  });
}
