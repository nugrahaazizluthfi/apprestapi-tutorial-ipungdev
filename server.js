const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const routes = require('./router');

routes(app);

app.use('/auth', require('./middleware'));

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
