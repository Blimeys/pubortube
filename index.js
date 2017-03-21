var express = require('express');
var app = express();

app.use('/scripts',express.static(__dirname + '/scripts'));

app.use('/css',express.static(__dirname + '/css'));


app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html')
});
app.get('/tubeUsers.json', function(req,res){
  res.sendFile(__dirname + '/tubeUsers.json')
});


app.listen(5000, function(){
  console.log('Server started on Localhost - listening on port 3000')
});

app.set('port', (process.env.PORT || 5000));
