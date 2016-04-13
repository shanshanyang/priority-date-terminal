const spawn = require('child_process').spawn;
// const child = spawn('node', ['priority-date-terminal.js']);
//
// process.stderr.pipe(child.stderr);
if (process.argv[2] === 'child') {
  // console.log('i am inside the child');
  require('child_process').exec('node priority-date-terminal.js');
} else {
  var child = spawn(process.execPath, [__filename, 'child'], {
    stdio: 'inherit'
  });
  // child.stdout.on('data', data => {
  //   console.log('from child: ',data.toString());
  // })
  // child.stdout.pipe(process.stdout)
}
