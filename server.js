/*var http=require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Hi Server Check\n');
}).listen(3000,'localhost');*/

var express=require('express');
var donors=require('./routes/donors');
var app=express();
/*app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});*/
app.get('/donors',donors.listAllDonors);
app.get('/donors/:id',donors.findDonorById);
app.post('/donors',donors.addDonor);
app.put('/donors/:id',donors.updateDonor);
// app.delete('/donors/:id',donors.deleteDonor);
app.listen(3000);