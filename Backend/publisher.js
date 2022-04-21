const mqtt = require("mqtt");
var client = mqtt.connect("mqtt://test.mosquitto.org");
client.on("connect",function(){
    setInterval(function(){
        var random = Math.random()*50;
        console.log(random);
        var data = { temp : random,person :'we will find' };
        if(random<30){
            client.publish('/swa/temperature',"{\"temp\" : \""+random+"\",\"person\" : \"EC:94:CB:6E:A5:6C\"}");
        }
    },2000),30000;
});