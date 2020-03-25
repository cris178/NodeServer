let http = require('http');

const ip = '127.0.0.1'; //local host
const port = 3000;

http.createServer(function(request,response){
	console.log('request ', request.url);
}).listen(port,ip);

console.log('running at http://' + ip + ':' +port+'/');
