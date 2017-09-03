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
      this.node.active = false;
      global.gameEventListener.on("push_card", this.pushCard.bind(this));
      global.gameEventListener.on("show_card", this.showCard.bind(this));
    },
    pushCard: function () {
      //
        this.node.active = true;
        this.cardNodeList = [];
        console.log("recive event push card");
        for (var i = 0 ; i < 3 ; i ++){
            var cardNode =  cc.instantiate(this.cardnode_prefab);
            cardNode.parent = this.node;
            cardNode.position = {
                x: 100 * (3 - 1) * - 0.5 + 100 * i,
                y: 0
            };
            this.cardNodeList.push(cardNode);
        }

    },
    showCard: function (data) {
        console.log("data = " + JSON.stringify(data));
        for (var i = 0 ; i < data.length ; i ++){
            var cardData = data[i];
            var cardNode = this.cardNodeList[i];
            cardNode.getComponent("card-node").showCard(cardData);
        }
    },
    onDestroy: function () {
        global.gameEventListener.off("push_card", this.pushCard);
    }


});
