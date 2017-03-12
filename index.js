var express = require('express');
var app = express();

app.use('/scripts',express.static(__dirname + '/scripts'));


app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html')
});
app.get('/tubeUsers.json', function(req,res){
  res.sendFile(__dirname + '/tubeUsers.json')
});


app.listen(3000, function(){
  console.log('Server started - listening on port 3000')
})
