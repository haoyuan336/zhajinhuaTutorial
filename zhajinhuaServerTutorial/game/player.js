/**
 * Created by chu on 2017/8/16 0016.
 */
const Player = function (uid, socket) {
    var that = {};
    var _uid = uid;
    var _socket = socket;

    console.log("player init" + uid);
    return that;
};
module.exports = Player;