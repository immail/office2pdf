'use strict';

const http = require('http');
const url  = require('url');
const execute = require('./exec');

const server = http.createServer((request, response) => {

   if (is_local_host(request)) {
    const result   = url.parse(request.url, true);
    const filename = result.query['file'];

     execute(`unoconv -f pdf /tmp/${filename}`)
        .then(name => {

          response.writeHead(200, {"Content-Type" : "text/plain"});
          response.write('success')
          response.end();
        })
        .catch(err => {

          response.writeHead(400, {"Content-Type" : "text/plain"});
          response.write(err.errror)
          response.end();
        });

   } else {
     response.end();
   }
});

function is_local_host(request) {
  return /^localhost/.test(request.headers.host);
}

server.listen(process.env.OFFICE_TO_PDF || 6800, function(){
  console.log('Conversor no ar');
});
