import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        cardnode_prefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
      global.gameEventListener.on("push_card", this.pushCard.bind(this));
    },
    pushCard: function () {
      //
        console.log("recive event push card");
        for (var i = 0 ; i < 3 ; i ++){
            var cardNode =  cc.instantiate(this.cardnode_prefab);
            cardNode.parent = this.node;
            cardNode.position = {
                x: 100 * (3 - 1) * 0.5 + 100 * i,
                y: 0
            }
        }

    },


});
