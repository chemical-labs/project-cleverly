const app = require('./app');

const port = process.env.PORT || 5000;
app.listen(port, '192.168.1.12', () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://192.168.1.12:${port}`);
  /* eslint-enable no-console */
});
