
const io = require("socket.io-client");

const socket = io("http://34.68.209.220:3000");

socket.on("connect", (result => {
        socket.emit('verificar-votacao', '5c384edb-7aea-413e-abac-e38552d5faf4')
        socket.on('5c384edb-7aea-413e-abac-e38552d5faf4', (sas) => {
            console.log(sas);
            
        })
}))

