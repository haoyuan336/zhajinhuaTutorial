/**
 * Created by chu on 2017/8/16 0016.
 */
const Player = function (spec) {
    var that = {};
    var _uid = spec.uid;
    var _socket = spec.socket;
    var _event = spec.event;
    var _index = spec.index;

    _socket.on("disconnect", function () {
       console.log("玩家掉线");
        _event.fire("disconnect", _uid);
    });
    _socket.on("start_game", function () {
        console.log("player start game");
        _event.fire("start_game");
    });

    that.sendSyncData = function (data) {
        console.log("send sync data  = " + JSON.stringify(data));
        _socket.emit("sync_data", data);
    };

    const sendCreatePlayerMessage = function (data) {
        if (data.uid != _uid){
            console.log("send create player message = " + JSON.stringify(data));
            _socket.emit("player_join", data);
        }
    };
    _event.on("send_create_player_message", sendCreatePlayerMessage);

    const sendPlayerOffline = function (uid) {
        _socket.emit("player_offline", uid);
    };
    _event.on("player_offline", sendPlayerOffline);

    const sendChangeHouseManager = function (uid) {
        _socket.emit("change_house_manager", uid);
    };
    _event.on("change_house_manager_id", sendChangeHouseManager);



    that.getUid = function () {
        return _uid;
    };
    that.getIndex = function () {
        return _index
    };
    that.destroy = function () {
        _event.off("player_offline", sendPlayerOffline);
        _event.off("send_create_player_message", sendCreatePlayerMessage);
        _event.off("change_house_manager_id", sendChangeHouseManager);
    };

    return that;
};
module.exports = Player;