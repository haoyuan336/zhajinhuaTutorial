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
        }
    },


    onLoad: function () {
        this.node.addComponent(cc.Sprite).spriteFrame = this.sprite_frames[Math.round(Math.random() * this.sprite_frames.length)];

    },
    init: function (uid) {
         this.uid_label.string = uid + "";
    }


});
