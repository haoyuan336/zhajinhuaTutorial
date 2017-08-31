import defines from './defines'
cc.Class({
    extends: cc.Component,

    properties: {
        sprite_frames: {
            default: null,
            type: cc.SpriteAtlas
        }
    },

    onLoad: function () {
        this.addComponent(cc.Sprite).spriteFrame = this.sprite_frames.getSpriteFrame("card_black");
    },

    showCard: function (data) {
        console.log("show card data = " + JSON.stringify(data));
        var value = data.value;
        var shape = data.shape;
        var nameStr = "card_" + defines.cardShapeMap[shape] + defines.cardValueMap[value];
        console.log("name str = " + nameStr);
        this.getComponent(cc.Sprite).spriteFrame = this.sprite_frames.getSpriteFrame(nameStr);
    }

});
