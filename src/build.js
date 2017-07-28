import compile from './compile';
import markdown from './markdown';

export default function (args) {
  compile(args).then((data) => {
    markdown({ args, data }).then(succ => succ);
  });
}
