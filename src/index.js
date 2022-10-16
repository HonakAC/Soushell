const fs = require("fs");
const prompt = require("prompt-sync")();

var packages = [];
var namespackages = [];

var packageslist = fs.readdirSync("packages", "utf8");
packageslist.forEach(function(packagename){
    var script = require(`../packages/${packagename}`);
    packages.push(script);
    namespackages.push(packagename);
});

function fill(char, length){
    var out = "";
    for(let i=0; i < length; i++)
        out += char;
    return out;
}

while(true){
    const line = prompt("$ ");
    if(line == null)
        continue;
    else if(line == "exit")
        break;
    else if(line == "help"){
        var maxlength = 0;
        packages.forEach(function(package){
            Object.values(package).forEach(function(info){
                var text = `${info["command"]} ${(info["args"].length  == 0) ? "" : "<"}${info["args"].join("> <")}${(info["args"].length  == 0) ? "" : ">"}`;
                if(maxlength < text.split("").length)
                    maxlength = text.split("").length;
            });
        });
        packages.forEach(function(package, index){
            console.log(`${namespackages[index]}:`);
            Object.values(package).forEach(function(info){
                var text = `${info["command"]}${(info["args"].length  == 0) ? "" : " <"}${info["args"].join("> <")}${(info["args"].length  == 0) ? "" : ">"}`;
                console.log(`    ${text}${fill(" ", maxlength-text.split("").length)} ${info["description"]}`);
            });
        });
    }
    else {
        const words = line.split(" ");
        const command = words[0];
        var args = words;
        args.shift();
        var exec = false;

        packages.forEach(function(package){
            if(package[command] && !exec){
                package[command]["function"](args);
                exec = true;
            }
        });
        if(!exec)
            console.error("Command not found");
    }
}