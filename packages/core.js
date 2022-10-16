function echo(args){
    console.log(args.join(" "));
}
function clear(args){
    console.clear();
}
module.exports = {
    "echo":{
        "command":"echo",
        "function":echo, 
        "description":"Put your text",
        "args":["msg*"]
    },
    "clear":{
        "command":"clear",
        "function":clear, 
        "description":"Clear the screen",
        "args":[]
    }
};