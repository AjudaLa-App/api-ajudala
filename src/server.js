import app from './app';

const port = process.env.PORT || 5000;

app.listen(port, function init() {
  // eslint-disable-next-line no-console
  console.log('app listening at port %s', port);
});
