/**
 * Created by chu on 2017/8/16 0016.
 */
const Player = require("./player");
const Room = function () {
    var that = {};
    var _playerList = [];
    that.createPlayer = function (uid, socket) {
        console.log("create player = " + uid);
        var player = Player(uid, socket);
        player.sendSyncData({
            uid: uid,
            player_list: _playerList
        });
        _playerList.push(player);
    };
    that.getPlayerCount = function () {
        return _playerList.length;
    };
    return that;
};
module.exports = Room;