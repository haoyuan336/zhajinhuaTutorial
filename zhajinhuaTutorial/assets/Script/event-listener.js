/**
 * Created by chu on 2017/8/16 0016.
 */
const EventListener = function (obj) {
    const Register = {};
    obj.on =  function (name, method) {
        if (!Register.hasOwnProperty(name)){
            Register[name] = [];
        }
        Register[name].push(method);
    };
    obj.fire = function (name) {
        if (Register.hasOwnProperty(name)){
            var handlerList = Register[name];
            for (let i = 0 ; i < handlerList.length ; i ++){
                let handler = handlerList[i];
                let args = [];
                for (let j = 1 ; j < arguments.length ; j ++){
                    args.push(arguments[j]);
                    handler.apply(this, args);
                }
            }
        }
    };
    obj.off = function () {

    };
    obj.destroy = function () {

    };
    return obj;
};
// export default EventListener;
module.exports = EventListener;