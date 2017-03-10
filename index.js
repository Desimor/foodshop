var express = require('express');
var server = express();
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;
var mongoURI = process.env.MONGOURI || require('./secrets').mongoURI;

mongoose.connect(mongoURI);

var foodSchema = mongoose.Schema({
    price: Number,
    category: String,
    isGlutenFree: Boolean,
    calories: Number
});

var Food = mongoose.model('Food', foodSchema);

// var spagetti = new Food({
//     price: 60,
//     category: 'noodles',
//     isGlutenFree: 'yes' == 'yes',
//     calories: 400
// });
// spagetti.save(function(err, data){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

server.get('/food', function(req, res){
    Food.find({}, function(err, documents){
        if(err){
            res.status(500).json({
                msg: err
            });
        } else {
            res.status(200).json({
                food: documents
            });
        }
    });
});

server.get('/food/:id', function(req, res){
    Food.find({_id: req.params.id}, function(err, documents){
        if(err){
            res.status(500).json({
                msg: err
            });
        } else {
            res.status(200).json({
                food: documents
            });
        }
    });
});

server.listen(port, function(){
    console.log("Now listening on port...", port);
})