var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var sqlite = require('sqlite-sync');

// Conectando ao banco de dados
sqlite.connect('./model/database.db');

sqlite.run("CREATE TABLE pessoas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome CHAR(100), email CHAR(100));");

// child process
var exec = require('child_process').exec

app.use('/app', express.static(path.join(__dirname,'/app')));
app.use('/bootstrap', express.static(path.join(__dirname,'/bootstrap')));
app.use('/angular2', express.static(path.join(__dirname,'/angular2')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
});


app.get('/api/pessoas', function(req,res){
	res.send(sqlite.run("SELECT * FROM pessoas"));
});

app.post('/api/pessoas', function(req, res){
	console.log(req.body);
	res.send(req.body);
});


app.listen(3000, function(){
	exec('start http://localhost:3000');
});