var http = require('http');
var url = require('url');
var exec = require('child_process').exec;


function execute(command, callback){
        exec(command, function(error, stdout, stderr)
        {
          callback(stdout);
        }
    );
};


var server = http.createServer(function(request, response){

  /*
    Caso queria habilitar este módulo para acesso público
    apagar if abaixo.
  */
  if(request.headers.host === "localhost:3000"){

    var result = url.parse(request.url, true);

    var filename = result.query['file'];

     execute("unoconv -f pdf /tmp/"+ filename, function(name){
       response.writeHead(200, {"Content-Type" : "text/html"});
       response.end();
     });

   }else{
     response.end();
   }


});

server.listen(3000, function(){
  console.log('Conversor no ar');
});
