var http = require('http');

http.createServer(function (req, res) {
  console.log('%s %s', req.method, req.url);
  res.end('hello');
}).listen(process.env.PORT || 3000);