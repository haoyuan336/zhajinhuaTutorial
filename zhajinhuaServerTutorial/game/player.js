/**
 * Created by chu on 2017/8/16 0016.
 */
const Player = function (uid, socket) {
    var that = {};
    var _uid = uid;
    var _socket = socket;

    that.sendSyncData = function (data) {
        console.log("send sync data  = " + JSON.stringify(data));
        _socket.emit("sync_data", data);
    };

    console.log("player init" + uid);
    return that;
};
module.exports = Player;