import compile from './compile';
import markdown from './markdown';

export default function (args) {
  return compile(args)
    .then(data => markdown({ args, data }));
}
