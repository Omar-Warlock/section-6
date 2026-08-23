const app = require('./app');
///////////////////////////////////////////
// server
///////////////////////////////////////////
const port = 3000;
app.listen(port, (err, data) => {
  if (!err) console.log(`App running on port ${port}...`);
});
