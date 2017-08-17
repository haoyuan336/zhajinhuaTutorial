import global from './global'
import EventListener from './event-listener'
cc.Class({
    extends: cc.Component,

    properties: {
       player_node_prefab: {
           default: null,
           type: cc.Prefab
       }
    },


    onLoad: function () {
        global.gameEventListener = EventListener({});
        global.gameEventListener.on("sync_data",  (data)=> {
            console.log("game world sync data = " + JSON.stringify(data));
            this.createPlayer(data.uid);
        })
    },
    createPlayer: function (uid) {
        var player = cc.instantiate(this.player_node_prefab);
        player.parent = this.node;
        player.getComponent("player-node").init(uid);
    }


});
