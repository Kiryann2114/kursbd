var Connection = require('tedious').Connection;
var config = {
    server: '192.168.3.11',
    authentication: {
        type: 'default',
        options: {
            userName: 'TEST',
            password: '123'
        }
    },
    options: {
        validateBulkLoadParameters:false,
        encrypt: false,
        database: 'KURSBD'
    }
};

var connection = new Connection(config);
connection.on('connect', function(err) {
    if(!err) {
        console.log("Connected");
    }
});

var Request = require('tedious').Request;

connection.connect();

let tovs = '';
let itog = 0;
let koltov = 0;
let datetime = '';

function executeStatement( zapros ) {
    var request = new Request(zapros, function(err) {
        if (err) {
            console.log("ошибка запроса: " + err);}
    });
    var result = '';
    let str = '';
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                result+= "NULL";
            } else {
                result+= column.value + "|";
            }
        });
        let res = result.split('|')
        str = str + 'КОД:...................................' + res[0] + '\n'+
            res[1] + '     ' +res[3]+ '             ' + (res[2]) + '\n';
        itog = itog + parseInt(res[2]);
        koltov = koltov + 1;
        result ="";
    });

    const date = new Date();
    datetime = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+'     '+date.getHours()+':'+date.getMinutes();

    request.on('done', function(rowCount, more) {});
    request.on("requestCompleted", function (rowCount, more) {
        tovs = str;
        let res = fs.readFileSync('docs/CHEKOBR.txt').toString();
        res = res.replace('TOVARS',tovs);
        tovs = '';
        res = res.replace('ITOG',itog.toString());
        res = res.replace('ITOG',itog.toString());
        itog = 0;
        res = res.replace('KOLTOV',koltov.toString());
        koltov = 0;
        res = res.replace('DATATIME',datetime);
        fs.writeFileSync('docs/CHEK.txt', res);
    });
    connection.execSql(request);
}


const Server = require("socket.io").Server;
const app = require("express")();
const cors = require("cors");
const fs = require("fs");

app.use(cors());

const server = require('http').createServer(app);
const io = new Server(server, {
        cors: {
            origin: "http://localhost:63342",
            methods: ["GET", "POST"],
            credentials: true
        }
    })

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('genChek', (zapros) => {
        executeStatement(zapros);
    });

    socket.on('updatedata', (zapros) => {
        executeStatement(zapros);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});