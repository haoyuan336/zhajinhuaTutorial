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
        global.eventlistener.on("start_game",  ()=> {
            console.log("player house manager click start game");
            global.socket.emit("start_game");
        });

        global.eventlistener.on("look_card", ()=>{
            global.socket.emit("look_card");
        });
        global.eventlistener.on("player_choose_rate", (data)=>{
            global.socket.emit("player_choose_rate", data);
        });
        global.eventlistener.on("pk_choose_player", (uid)=>{
            global.socket.emit("pk_choose_player", uid);
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
        global.socket.on("push_card", ()=>{
            console.log("server send message push card");
            global.gameEventListener.fire("push_card");
        });
        global.socket.on("show_card", (card_list)=>{
           global.gameEventListener.fire("show_card", card_list);
        });
        global.socket.on("player_choose_rate", (data)=>{
            console.log("player choose rate = " + JSON.stringify(data));
           global.gameEventListener.fire("player_choose_rate", data);
        });
        global.socket.on("turn_player_message", (data)=>{
           console.log("turn_player_message" + JSON.stringify(data));
            global.gameEventListener.fire("turn_player_message", data);
        });
        global.socket.on("pk_result", (data)=>{
           console.log("pk result" + JSON.stringify(data));
            global.gameEventListener.fire("pk_result", data);
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
