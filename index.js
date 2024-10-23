const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cors = require('cors');

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addToArr(cart, product) {
  cart.push(product);
  return cart;
}
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let product = { productId, name, price, quantity };
  let result = addToArr(cart, product);
  res.json(result);
});
//... 02 ...//
function editQuantity(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editQuantity(cart, productId, quantity);
  res.json(result);
});

//... 03 ...//
function shouldDeleteById(product, productId) {
  return product.productId !== productId;
}
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((product) => shouldDeleteById(product, productId));
  cart = result;
  res.json(result);
});

//... 04 ...//

app.get('/cart', (req, res) => {
  res.json(cart);
});

//... 05 ...//
function sumQuant(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}
app.get('/cart/total-quantity', (req, res) => {
  let result = sumQuant(cart);
  res.json({ totalQuantity: result });
});

//... 06 ...//
function sumPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price;
  }
  return totalPrice;
}
app.get('/cart/total-price', (req, res) => {
  let result = sumPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
