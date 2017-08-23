var EventListener = require("./event-listener");
var global = require("./global");
cc.Class({
    extends: cc.Component,

    properties: {
       main_world_prefab: {
           default: null,
           type: cc.Prefab
       },
        game_world_prefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        global.socket = io("localhost:3000");
        global.eventlistener = EventListener({});
        global.eventlistener.on("login", function (uid) {
            console.log("button click uid= " + uid);
            global.socket.emit("login", uid);
        });
        global.socket.on("sync_data",  (data)=> {
            console.log("sync data = " + JSON.stringify(data));
            // global.player
            this.enterGameWorld(data);
        });
        global.socket.on("player_join", (data)=>{
            global.gameEventListener.fire("player_join", data);
        });
        global.socket.on("player_offline", (uid)=>{
            console.log("player off line = " + uid);
            global.gameEventListener.fire("player_offline", uid);
        });
        global.socket.on("change_house_manager", (uid)=>{
           console.log("house manager is change" + uid);
            global.gameEventListener.fire("change_house_manager", uid);
        });
        this.enterMainWorld();
    },
    enterMainWorld: function () {
        if (this.runningWorld != undefined){
            this.runningWorld.removeFromParent(true);
        }
        this.runningWorld = cc.instantiate(this.main_world_prefab);
        this.runningWorld.parent = this.node;
    },
    enterGameWorld: function (data) {
        if (this.runningWorld != undefined){
            this.runningWorld.removeFromParent(true);
        }
        this.runningWorld = cc.instantiate(this.game_world_prefab);
        this.runningWorld.parent = this.node;
        global.gameEventListener.fire("sync_data", data);
    }

});
