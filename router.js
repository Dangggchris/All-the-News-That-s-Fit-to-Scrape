module.exports = app => {

  const route = require('./routes/route.js');

  app.use('/', route);

}