const WebSocket = require('ws');
const Constants = require("../config");

let ws = null;

const configWebSocket= (server)=>{
     ws = new WebSocket.Server({server});
    //console.log(Constants.PORT);
    ws.on("connection", (message)=>{
        console.log(`got message: ${message}`);
    })
}

module.exports = {
    configWebSocket
};