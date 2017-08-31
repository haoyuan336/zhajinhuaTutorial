/**
 * Created by chu on 2017/8/30 0030.
 */
var defines = require("./defines");
const Card = function (value, shape) {
  var that = {};
  that.value = value;
  that.shape = shape;
  return that;
};
module.exports = Card
;