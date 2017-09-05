import global from './global'
import EventListener from './event-listener'
cc.Class({
    extends: cc.Component,

    properties: {
       player_node_prefab: {
           default: null,
           type: cc.Prefab
       },
        player_pos_list: {
            default: [],
            type:cc.Node
        },
        game_ready_ui: {
            default: null,
            type: cc.Node
        }
    },


    onLoad: function () {
        this._index = 0;
        this.playerNodeList = [];
        this.game_ready_ui.active = false;
        global.gameEventListener = EventListener({});
        global.gameEventListener.on("sync_data",  (data)=> {
            console.log("game world sync data = " + JSON.stringify(data));
            global.playerData.uid = data.uid;
            global.playerData.house_manager_id = data.house_manager_id;
            console.log("house manager = " + data.house_manager_id);
            if ( data.uid === data.house_manager_id){
                this.game_ready_ui.active = true;
            }
            var _playersData = data.players_data;
            this._index = data.index;

            for (var i = 0 ; i < _playersData.length ; i ++){
                var playerData = _playersData[i];
                this.createPlayer(playerData.uid, playerData.index);
            }
        });
        global.gameEventListener.on("player_join", (data)=>{
            this.createPlayer(data.uid, data.index);
        });
        global.gameEventListener.on("player_offline", (uid)=>{
            for (var i = 0 ; i < this.playerNodeList.length ; i ++){
                var playerNode = this.playerNodeList[i];
                if (playerNode.getComponent("player-node").getUid() === uid){
                    playerNode.removeFromParent(true);
                    playerNode.destroy();
                    this.playerNodeList.splice(i, 1);
                }
            }
        });
        global.gameEventListener.on("change_house_manager", (uid)=>{
            global.playerData.house_manager_id = uid;
            if (global.playerData.uid === uid){
                this.game_ready_ui.active = true;
            }
        });
        global.gameEventListener.on("push_card", ()=>{
           this.game_ready_ui.active = false;
        });
    },
    createPlayer: function (uid, index) {
        console.log("uid = " + uid);
        console.log("index = " + index);
        var currentIndex = index - this._index;
        if (currentIndex < 0){
            currentIndex = currentIndex + 6;
        }
        var player = cc.instantiate(this.player_node_prefab);
        player.parent = this.node;
        player.getComponent("player-node").init(uid, currentIndex);
        player.position = this.player_pos_list[currentIndex].position;
        this.playerNodeList.push(player);
    },
    onButtonClick: function (event , customData) {
        console.log("customData = " + customData);

        switch (customData){
            case "start_game":
                global.eventlistener.fire("start_game");
                break;
            case "lookcard":
                global.eventlistener.fire("look_card");
                break;
            case "rate_1":
                global.eventlistener.fire("player_choose_rate", 1);
                break;
            case "rate_2":
                global.eventlistener.fire("player_choose_rate", 2);

                break;
            case "rate_5":
                global.eventlistener.fire("player_choose_rate", 5);

                break;
            case "pk_button":
                global.gameEventListener.fire("player_pk");
                break;
            default:
                break;
        }
    }


});
