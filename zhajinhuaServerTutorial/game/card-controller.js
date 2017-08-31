/**
 * Created by chu on 2017/8/30 0030.
 */
var Card = require("./card");
var defines = require("./defines");
const CardController = function () {
    var that = {};

    var _cardList = [];
    var initCard = function () {
        _cardList = [];
        var cards = [];
        var valueList = Object.keys(defines.cardValues);
        var shapeList = Object.keys(defines.cardShapes);
        for (var i = 0 ; i < valueList.length ; i ++){
            for (var j = 0 ; j < shapeList.length ;  j ++){
                var card = Card(valueList[i], shapeList[j]);
                cards.push(card);
            }
        }
      while (cards.length){
          var index = Math.floor(Math.random() * cards.length);
          var card = cards[index];
          _cardList.push(card);
          cards.splice(index, 1);
      }
      // console.log("card list = " + JSON.stringify(_cardList) + 'length = ' + _cardList.length);
    };
    that.init = function () {
        initCard();
    };
    that.popCard = function () {
      var card = _cardList[_cardList.length - 1];
      _cardList.splice(_cardList.length - 1, 1);
      if (_cardList.length <= 0){
          initCard();
      };
      return card;
    };
    return that;
};
module.exports = CardController;