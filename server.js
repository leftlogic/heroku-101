var http = require('http'),
    port = process.env.PORT || 3000;

http.createServer(function (req, res) {
  console.log('%s %s', req.method, req.url);
  res.end('hello');
}).listen(port, function () {
  console.log('Server running. http://localhost:%d', port);
});