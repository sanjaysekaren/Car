var bodyParser = require('body-parser');
var Model = require('../Models/models');

var productModel = Model.products;
var shopModel = Model.shops;

module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));

    app.get('/api/getAllProductDetails', async function(req,res){
        await productModel.find({},function(err,result){
            if (err) throw err;
            console.log(result.length);
            res.send(result); 
        })
    });

    app.get('/api/getAllShopDetails',async function(req,res){
        await shopModel.find({},function(err,result){
            if(err) throw err;
            console.log(result.length);
            res.send(result);
        })
    })

    app.get('/api/getProductDetailsByName/:pname', function(req,res){
        productModel.find({name:req.params.pname},function(err,result){
            if (err) throw err;
            res.send(result);
        })
    })

    app.get('/api/getProductDetailsAboveLimit/:lname',function(req,res){
        productModel.find({price:{$gt:req.params.lname}},function(err,result){
            if (err) throw err;
            res.send(result);
        })
    })
    
    app.get('/api/getalldetails',function(req,res){
        shopModel.aggregate([{$lookup:{from:"products",localField:"products",foreignField:"id",as:"aggregateDetails"}}],function(err,result){
            console.log(result.length);
            res.send(result);
        });
    })

    app.post('/api/addNewProduct', async function(req,res){
        if(req.body.id){
            console.log('update');
        await productModel.findByIdAndUpdate(req.body.id,{...req.body},function(err,result){
            
            if(err) throw err;
            res.send('Success');
        })
        }
        else{
            console.log('insert');
            await productModel.insertMany({...req.body},function(err,result){
                if(err) throw err;
                res.send('Success');
            })
        }
    })
}