var express = require('express'),
	app = express(),
	router = express.Router(),
	bodyParser = require('body-parser'),
	path = require('path'),
	sqlite = require('sqlite-sync');

sqlite.connect('./model/database.db');

sqlite.run("CREATE TABLE pessoas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome CHAR(100), email CHAR(100));");

var exec = require('child_process').exec

app.use(bodyParser.json());

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
	sqlite.insert('pessoas', req.body, function(id){
		res.send({'id':id});	
	});
});

app.put("/api/pessoas/:id", function(req, res){
	var id = req.params.id;
	var body = req.body;
	sqlite.update('pessoas', body, {id:id}, function(result){
		res.send({result:result});
	});
});

app.delete('/api/pessoas/:id', function(req, res){
	var id = req.params.id;
	sqlite.delete('pessoas',{id: id}, function(result){
		res.send({result:result});
	})
});

app.listen(3000, function(){
	exec('start http://localhost:3000');
});