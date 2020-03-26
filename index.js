let http = require('http');	//Gives us the http
let fs = require('fs');		//Gives us fs
let path = require('path');	//Gives us "string".pathext()


const ip = '127.0.0.1'; 	//local host
const port = 3000;		//or 80

//Create the server using http module, and wait for response
http.createServer(function(request,response){
	//Print the requested object
	console.log('request ', request.url);
	//Add . to URL to convert it to local file path
	let file = '.' + request.url;
	//Redirect / to serve index.html
	if(file == './') file = './index.html';
	//Extract requested file's extension
	let extension = String(path.extname(file)).toLowerCase();
	//Define acceptable file extensions
	let mime = {'.html': 'text/html',
		'.js': 'text/javascript',
		'.css':'test/css',
		'.json':'application/json',
		'.png': 'image/png',
		'.jpg': 'image/jpg',
		'.gif': 'image/gif'
		};
	//If requested file type is not mime, default
	//to octet-stream which means "arbitrary binary data."
	let type = mime[extension] || "application/octet-stream";

	//Read the file from the hardDrive
	fs.readFile(file, function(error,content){
		if(error){
			if(error.code == 'ENOENT'){
				fs.readFile('./404.html', function(error,content){
					response.writeHead(200, {'Content-Type': type});
					response.end(content, 'utf-8');
				});
			} else{
				response.writeHead(500);
				response.end('Error: ' + error.code + '\n');
				response.end();
			}
		} else{
			response.writeHead(200, {'Content-Type': type});
			response.end(content, 'utf-8');
		}		
	});
}).listen(port,ip);


//Display server is running message
console.log('running at http://' + ip + ':' +port+'/');
