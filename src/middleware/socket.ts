// import * as socket from 'socket.io'
// import Problema from '../model/ProblemaReal';
// let incidente;


// export class SocketConnection {
//     server: any
//     private io: SocketIO.Server

//     public constructor(socket: SocketIO.Server) {
//         this.io = socket;

//         this.io.on('connection', socket => {

//             socket.emit('incidente', ((incidente) => {
//                 console.log('jkasjkldnas jahsd hnjahnsd')
//             }))


//             console.log("Conectado")


//             socket.on('sousa', ((msg) => {
//                 console.log(msg);

//             }))



//             socket.on('disconnect', () => {
//                 console.log(`User disconnected.`)
//             });
//         });
//     }
// }