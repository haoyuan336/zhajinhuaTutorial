/**
 * Created by chu on 2017/8/16 0016.
 */
const Player = function (spec) {
    var that = {};
    var _uid = spec.uid;
    var _socket = spec.socket;
    var _event = spec.event;
    var _index = spec.index;
    var _cardList = [];
    _socket.on("disconnect", function () {
       console.log("玩家掉线");
        _event.fire("disconnect", _uid);
    });
    _socket.on("start_game", function () {
        console.log("player start game");
        _event.fire("start_game");
    });
    _socket.on("look_card", function () {
        _event.fire("look_card", _uid);
        _socket.emit("show_card", _cardList);
    });
    _socket.on("player_choose_rate", function (rate) {
        console.log("player choose rate" + rate);
        _event.fire("choose_rate", {
            uid: _uid,
            rate: rate
        });
    });
    _socket.on("pk_choose_player", function (uid) {
        console.log("pk choose player" + uid);
        _event.fire("player_pk", {
            uid: _uid,
            targetUid: uid
        });
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
    const pushCard = function () {
        _socket.emit("push_card");
    };
    _event.on("push_cards", pushCard);
    const playerLookCard = function (uid) {
        _socket.emit("player_look_card", uid);
    };
    _event.on("look_card", playerLookCard);

    const playerChooseRate = function (data) {
      console.log("send player choose rate" + JSON.stringify(data));
      _socket.emit("player_choose_rate", data);
    };
    // _event.on("choose_rate", playerChooseRate);
    _event.on("update_player_rate", playerChooseRate);


    const sendTurnPlayerMessage = function (data) {
        _socket.emit("turn_player_message", data);
    };
    _event.on("turn_player_index", sendTurnPlayerMessage);
    that.getUid = function () {
        return _uid;
    };
    const sendPKResult = function (data) {
        _socket.emit("pk_result", data);
    };
    _event.on("pk_result", sendPKResult);
    that.getIndex = function () {
        return _index
    };
    that.destroy = function () {
        _event.off("player_offline", sendPlayerOffline);
        _event.off("send_create_player_message", sendCreatePlayerMessage);
        _event.off("change_house_manager_id", sendChangeHouseManager);
        _event.off("push_card", pushCard);
        _event.off("look_card", playerLookCard);
        _event.off("player_choose_rate", playerChooseRate);
        _event.off("turn_player_index", sendTurnPlayerMessage);
    };

    that.pushOneCard = function (card) {
        _cardList.push(card);
        console.log(_uid + "get " + JSON.stringify(card));
    };
    that.getCardList = function () {
        return _cardList;
    };
    return that;
};
module.exports = Player;