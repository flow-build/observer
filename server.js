const { startup, settings } = require('./src');

startup(settings, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('server started sucessfully');
});
