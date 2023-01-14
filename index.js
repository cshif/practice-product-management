if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));

app.use('/', routes);

app.get('/', (req, res) => {
  res.send('yo');
});

app.listen(process.env.PORT, () => {
  console.log('Server started!');
});
