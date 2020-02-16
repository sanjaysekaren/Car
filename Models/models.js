var mongoose = require('mongoose');

var scehma = mongoose.Schema;

var productsSchemaModel = new scehma({
    name:String,
    price:Number,
    
}) 

var shopSchemaModel = new scehma({
    name:String,
    owner:String,
    produts:Array
})

var products = mongoose.model('products',productsSchemaModel,'products');
var shops = mongoose.model('shops',shopSchemaModel,'shop');

module.exports = {products,shops};

