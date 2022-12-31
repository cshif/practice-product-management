const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'product_inventory'
});

db.connect(error => {
  if (error) throw error;
  console.log('connected!');
});

const app = express();
app.set('view engine', 'pug');
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', { message: '/' });
});

// create user
app.post('/user', (req, res) => {
  const form = {
    account: req.body.account,
    password: req.body.password
  };
  const sql = 'INSERT INTO user SET ?';
  db.query(sql, form, error => {
    if (error) throw error;
    res.send('user created!');
  });
});

// login

// create product
app.post('/product', (req, res) => {
  const form = {
    name: req.body.name,
    price: req.body.price
  };
  const sql = 'INSERT INTO product_list SET ?';
  db.query(sql, form, error => {
    if (error) throw error;
    res.send('product created!');
  });
});

// fetch product list
app.get('/product', (req, res) => {
  const sql = 'SELECT * FROM product_list'
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(`product list fetched! ${JSON.stringify(result)}`);
  });
});

// fetch product
app.get('/product/:id', (req, res) => {
  const sql = `SELECT * FROM product_list WHERE id = ${req.params.id}`
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(`product fetched! ${JSON.stringify(result)}`);
  });
});

// update product
app.put('/product/:id', (req, res) => {
  const sql = `UPDATE product_list SET name = '${req.body.name}', price = '${req.body.price}' WHERE id = ${req.params.id}`;
  db.query(sql, error => {
    if (error) throw error;
    res.send('product updated!'); 
  });
});

// delete product
app.delete('/product/:id', (req, res) => {
  const sql = `DELETE FROM product_list WHERE id = ${req.params.id}`;
  db.query(sql, error => {
    if (error) throw error;
    res.send('product deleted!');
  });
});

// fetch user log

app.listen(3000, () => {
  console.log('Server started!');
});

module.exports = db;