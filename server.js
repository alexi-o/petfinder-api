var express = require('express'),
    app = express();

// Routes


// Endpoints
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Server
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});