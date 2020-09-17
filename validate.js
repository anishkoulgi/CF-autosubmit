module.exports = (argv) => {
  let f1 = true,
    f2 = true;

  if (argv.code && argv.file) {
    const { code: problem, file: fileName } = argv;

    if (problem.length > 5) f1 = false;
    if (!fileName.includes('.')) f2 = false;
  } else {
    f1 = false;
    f2 = false;
  }

  return f1 & f2;
};
