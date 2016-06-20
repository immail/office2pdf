'use strict';

const http = require('http');
const url  = require('url');

const server = http.createServer((request, response) => {

   if (is_local_host(request)) {
    const result   = url.parse(request.url, true);
    const filename = result.query['file'];

     execute(`unoconv -f pdf /tmp/${filename}`)
        .then(name => {
          response.writeHead(200, {"Content-Type" : "text/plain"});
          res.write('success')
          response.end();
        })
        .catch(err => {
          response.writeHead(400, {"Content-Type" : "text/plain"});
          res.write(err.errror)
          response.end();
        });

   } else {
     response.end();
   }
});

function is_local_host(request) {
  return /^localhost/.test(request.headers.host);
}

server.listen(process.env.OFFICE_TO_PDF || 3000, function(){
  console.log('Conversor no ar');
});
