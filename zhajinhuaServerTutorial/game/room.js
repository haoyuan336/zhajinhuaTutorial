/**
 * Created by chu on 2017/8/16 0016.
 */
const Player = require("./player");
const EventListener = require("./event-listener");
const CardController = require('./card-controller');
const Room = function () {
    var that = {};
    var _playerList = [];
    var _event = EventListener({});
    var _cardController = CardController();
    _cardController.init();
    var _currentTotalRate = 0;
    var _turnPlayerIndex = 0;
    var _currentMaxRate = 0;
    const getIndex = function () {
        var seatMap = {};
        for (var i = 0 ; i < _playerList.length ; i ++){
            seatMap[_playerList[i].getIndex()] = true;
        }
        for (var i = 0 ; i < 6 ; i ++){
            if (!seatMap.hasOwnProperty(i)){
                return i;
            }
        }
    }

    ;
    that.createPlayer = function (uid, socket) {
        var currentIndex = getIndex();

        console.log("current index = " + currentIndex);
        console.log("create player = " + uid);
        var player = Player({
            uid: uid,
            socket: socket,
            event: _event,
            index: currentIndex
        });
        _playerList.push(player);


        var playerDatas = [];
        for (var i = 0 ; i < _playerList.length ; i ++){
            var pl = _playerList[i];
            playerDatas.push({
                uid: pl.getUid(),
                index: pl.getIndex()
            });
        }

        player.sendSyncData({
            uid: uid,
            index: player.getIndex(),
            house_manager_id: _playerList[0].getUid(),
            players_data: playerDatas
        });

        _event.fire("send_create_player_message", {
            uid: uid,
            index: player.getIndex()
        })
    };
    that.getPlayerCount = function () {
        return _playerList.length;
    };

    _event.on("disconnect", function (uid) {

       for (var i = 0 ; i < _playerList.length ; i ++){
           if (_playerList[i].getUid() === uid){
               _playerList[i].destroy();
              _playerList.splice(i , 1);
           }
       }
        if (_playerList.length === 0){
            return;
        }
       _event.fire("player_offline",uid);
       _event.fire("change_house_manager_id", _playerList[0].getUid());
    });
    _event.on("start_game", function () {

       console.log("房主决定开始游戏");
        pushCard();
        turnPlayer();
    });
    _event.on("choose_rate", function (data) {
       var rate = data.rate;
        _currentMaxRate = data.rate;
       _currentTotalRate += rate;
        data.totalRate = _currentTotalRate;
        // data.maxRate = _currentMaxRate;
        _event.fire("update_player_rate", data);
        turnPlayer();
    });


    const pushCard = function () {
        for (var i = 0 ; i < 3 ; i ++){
            for (var j = 0 ; j < _playerList.length ; j ++){
                var player = _playerList[j];
                player.pushOneCard(_cardController.popCard());
            }
        }
        _event.fire("push_cards");
    };



    const playerPK = function (data) {
        console.log("player pk = " + JSON.stringify(data));
        var map = {};
        for (var i = 0 ; i < _playerList.length ; i ++){
            map[_playerList[i].getUid()] = _playerList[i];
        }
        console.log("map = " + JSON.stringify(map));

        var player1 = map[data.uid];
        console.log("player1 = " + JSON.stringify(player1));
        var player2 = map[data.targetUid];
        var result = _cardController.pkCards(player1.getCardList(), player2.getCardList());
        console.log("result = " + result);
        _event.fire("pk_result", {
            win_uid: result?data.uid:data.targetUid,
            lose_uid: result?data.targetUid:data.uid
        })
    };
    _event.on("player_pk",playerPK);
    const turnPlayer = function () {
        var uid = undefined;
        for (var  i = 0 ; i < _playerList.length ; i ++){
            if (_playerList[i].getIndex() === _turnPlayerIndex){
                uid = _playerList[i].getUid();
            }
        }

        _event.fire("turn_player_index", {
            totalRate: _currentTotalRate,
            uid: uid,
            maxRate: _currentMaxRate
        });


        _turnPlayerIndex ++;
        if (_turnPlayerIndex >= _playerList.length){
            _turnPlayerIndex = 0;
        }
    };


    return that;
};
module.exports = Room;