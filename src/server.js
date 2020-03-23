/* eslint-disable no-console */
import app from './app';

const port = process.env.PORT || 5000;

console.info('NODE_ENV', process.env.NODE_ENV);

app.listen(port, function init() {
  console.log('app listening at port %s', port);
});
