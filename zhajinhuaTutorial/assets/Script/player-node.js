import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
       sprite_frames: {
           default: [],
           type: cc.SpriteFrame
       },
        uid_label: {
            default: null,
            type: cc.Label
        },
        house_manager_label: {
            default: null,
            type: cc.Label
        }
    },

    onLoad: function () {
        this.node.addComponent(cc.Sprite).spriteFrame = this.sprite_frames[Math.round(Math.random() * this.sprite_frames.length)];



        // global.gameEventListener.on("change_house_manager", this.changeHouseManager);
        global.gameEventListener.on("change_house_manager", (uid)=>{
            this.changeHouseManager(uid);
        });

    },
    changeHouseManager: function (uid) {
        console.log("player node change house manager = " + uid);
        this.house_manager_label.string = "";
        if (uid === this.uid){
            this.house_manager_label.string = "房主";
        }
    },
    init: function (uid) {
        this.uid = uid;
        this.uid_label.string = uid + "";
        if (global.playerData.house_manager_id === this.uid){
            this.house_manager_label.string = "房主";
        }
    }
    ,
    getUid: function () {
        return this.uid;
    },
    onDestroy: function () {
        console.log("destroy");
        // global.gameEventListener.off("changeHouseManager", this.changeHouseManager);
    }


});
