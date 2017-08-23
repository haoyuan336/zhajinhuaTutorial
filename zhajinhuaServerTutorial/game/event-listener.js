/**
 * Created by chu on 2017/8/18 0018.
 */
const EventListener = function (obj) {
    var Register = {};
    obj.on = function (name, method) {
        if (!Register.hasOwnProperty(name)){
            Register[name] = [];
        }
        Register[name].push(method);
    };
    obj.fire = function (name) {
        if (Register.hasOwnProperty(name)){
            var handleList = Register[name];
            for (var i = 0 ; i < handleList.length ; i ++){
                var handler = handleList[i];
                var args = [];
                for (var  j = 1 ; j  < arguments.length ; j ++){
                    args.push(arguments[j]);
                }
                handler.apply(this, args);
            }
        }
    };
    obj.off  = function (name, method) {
        if (Register.hasOwnProperty(name)){
            var handlerList = Register[name];
            for (var  i = 0 ; i < handlerList.length ; i ++){
                if (handlerList[i] === method){
                    handlerList.splice(i , 1);
                }
            }
        }
    };
    obj.removeAllListeners = function () {
        Register = {};
    };
    return obj;
};
module.exports = EventListener;