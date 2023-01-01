const express = require('express');
const routes = require('./routes');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
  secret: 'productInventory',
  resave: true, 
  saveUninitialized: false
}));

app.use('/', routes);

app.get('/', (req, res) => {
  res.send('yo');
});

// fetch user log

app.listen(3000, () => {
  console.log('Server started!');
});
