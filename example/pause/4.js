var http = require('http');
var fs = require('fs');
var pauseStream = require('pause-stream');

var server = http.createServer(function (req, res) {
    var id = Math.random().toString(16).slice(2);
    var dir = __dirname + '/data/' + id;
    
    var ps = pauseStream();
    ps.pause();
    
    fs.mkdir(dir, function (err) {
        var ws = fs.createWriteStream(dir + '/output.txt');
        req.pipe(ws);
        
        req.on('end', function () {
            res.end(id + '\n');
        });
    });
});
server.listen(8000);
