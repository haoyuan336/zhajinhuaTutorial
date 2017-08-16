const global = require("./global");
cc.Class({
    extends: cc.Component,

    properties: {
       edit_box: {
           default: null,
           type: cc.EditBox
       }
    },

    // use this for initialization
    onLoad: function () {

    },

    buttonClick: function (event, customData) {
        console.log("button click = " + customData);
        console.log("edit box string = " + this.edit_box.string);
        global.eventlistener.fire("login", this.edit_box.string);
    }
});
