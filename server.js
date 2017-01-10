/*var http=require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Hi Server Check\n');
}).listen(3000,'localhost');*/

var express=require('express');
var donors=require('./routes/donors');
var app=express();
var bodyParser = require('body-parser');
/*app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});*/
/*app.use(bodyParser.urlencoded({
    extended: true
}));*/
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json());
app.get('/donors',donors.listAllDonors);
app.get('/donors/:id',donors.findDonorById);
app.post('/donors',donors.addDonor);
app.put('/donors/:id',donors.updateDonor);
// app.delete('/donors/:id',donors.deleteDonor);
var port=Number(process.env.PORT || 3000);
app.listen(port);