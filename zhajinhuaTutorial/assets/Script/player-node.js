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
        },
        card_node_prefab: {
            default: null,
            type: cc.Prefab
        },
        card_pos: {
            default: [],
            type: cc.Node
        },
        choose_rate_label: {
            default: null,
            type: cc.Label
        }
    },

    onLoad: function () {
        this.node.addComponent(cc.Sprite).spriteFrame = this.sprite_frames[Math.round(Math.random() * this.sprite_frames.length)];

        // const  changeHouseManager =  (uid) =>{
        //     console.log("player node change house manager = " + uid);
        //     // this.house_manager_label.string = "";
        //     this.house_manager_label.string = "";
        //     if (uid === this.uid){
        //         // this.house_manager_label.string = "房主";
        //         this.house_manager_label.string = "房主";
        //
        //     }
        // };

        // global.gameEventListener.on("change_house_manager", this.changeHouseManager);

        global.gameEventListener.on("change_house_manager", this.changeHouseManager.bind(this));
        global.gameEventListener.on("push_card",this.pushCard.bind(this));
        global.gameEventListener.on("player_choose_rate",this.playerChooseRate.bind(this));

    },
    playerChooseRate: function (data) {
        if (data.uid === this.uid){
            this.choose_rate_label.string = data.rate;
        }
    },
    pushCard: function () {
        if (this.getUid() === global.playerData.uid){
            return ;
        }
        for (let i = 0 ; i < 3 ; i ++){
            let cardNode = cc.instantiate(this.card_node_prefab);
            cardNode.parent = this.node;
            cardNode.scale = {
                x: 0.6,
                y: 0.6
            };
            cardNode.position = cc.pAdd(this.card_pos[this.index].position,cc.p((3 - 1) * -0.5 * 40 + 40 * i, 0));


        }
    }
    ,
    changeHouseManager: function (uid) {
        console.log("player node change house manager = " + uid);
        // this.house_manager_label.string = "";
        this.house_manager_label.string = "";
        if (uid === this.uid){
            // this.house_manager_label.string = "房主";
            this.house_manager_label.string = "房主";

        }
    },

    init: function (uid, index) {
        this.uid = uid;
        this.index = index;
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
        global.gameEventListener.off("change_house_manager", this.changeHouseManager);
        global.gameEventListener.off("push_card", this.pushCard);
    }


});
