const fs = require('fs');
const http = require('http');
const child_process = require('child_process')



http.createServer((req, res) => {
    res.writeHead(200);

    let mainFile = 'hello.jt'

    let path = './examples/hello/' + mainFile



    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        //console.log(data);

        const worker = child_process.fork('./src/Read/Lexing/Lexing.js')

        let sendData = {
            data: data,
            path: path,
            mainFile: mainFile
        }
        worker.send(sendData)

    });

}).listen(8000);

console.log('Listening on port 8000');