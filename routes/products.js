var express = require('express');
var router = express.Router();
var Product = require("../models/Product");

//route to render a page for adding
router.get('/products/add', function(req, res, next) {
  res.render('products/add');
});
//handles posted data and redirect to another route
router.post('/products/add', async function(req, res, next) {
  let product = new Product(req.body);
  await product.save();
  return res.redirect("/products");
});
//render edit page for a specific product
//product id is received in url 
//get a product from db and pass it to view for rendering a form filled with data
router.get('/products/edit/:id', async function(req, res, next) {
  let product = await Product.findById(req.params.id);
  return res.render("products/edit",{product});
});
//update posted product and redirect
router.post('/products/edit/:id', async function(req, res, next) {
  let product = await Product.findById(req.params.id);
  product.name= req.body.name;
  await product.save();
  return res.redirect("/products");
});
//delete a product and redirect
router.get('/products/delete/:id', async function(req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.redirect("/products");
});
//get products from db and pass it to view for rendering
router.get('/products', async function(req, res, next) {
  let products = await Product.find();
  res.render('products/index',{products});
});

module.exports = router;
