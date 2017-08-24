/**
 * Created by chu on 2017/8/16 0016.
 */
var Socket = require("socket.io");
var Room = require("./room");
const SocketServer = function (server) {
    var that = Socket(server);
    var _roomList = [];
    that.on("connection", function (socket) {
        console.log("a user connection");
        socket.on("login", function (uid) {
            console.log("玩家注册" + uid);

            if (_roomList.length === 0){
                _roomList.push(Room());
            }
            if ( _roomList[_roomList.length - 1].getPlayerCount() >= 6){
                _roomList.push(Room());
            }
            _roomList[_roomList.length - 1].createPlayer(uid,socket);
        });


    });
    return that;
};
module.exports = SocketServer;