import template from './template';

export default function ({ data }) {
  return new Promise((resolve) => {
    data.forEach((contract) => {
      const md = template(contract);
      process.stdout.write(md);
    });
    resolve(true);
  });
}
