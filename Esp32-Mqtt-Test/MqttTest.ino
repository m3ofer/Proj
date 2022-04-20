#include <WiFi.h>
#include "PubSubClient.h"
#include "DHT.h"
#define DHTPIN 4
#define DHTTYPE DHT22

//setting up needed variables
const char* ssid = "*******";// wifi name
const char* password = "********";// wifi password
const char* mqttServer = "test.mosquitto.org";// mqtt server can be switched to broker.hivemq.com
int port = 1883;
String stMac;
char mac[50];
char clientId[50];
const int ledPin = 5;
long last_time = 0;
char data[100];//we store data that were going to publish

WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE);//setting dht pins & type of dht


void setup() {
  Serial.begin(9600);
  randomSeed(analogRead(0));
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

//Calling wifi function
  wifiConnect();
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("MAC address: ");
  Serial.println(WiFi.macAddress());
  client.setServer(mqttServer, port);
  client.setCallback(callback);
  pinMode(ledPin, OUTPUT);
  
}

void wifiConnect() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void mqttReconnect() {
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");
    //long r = random(1000);
    sprintf(clientId, "client-esp32");
    if (client.connect(clientId)) {
      Serial.print(clientId);
      Serial.println(" connected");
      client.subscribe("/swa/commands");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.println(topic);
  Serial.print(". Message: ");
  String stMessage;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    stMessage += (char)message[i];
  }
  Serial.println();
  if (String(topic) == "/swa/commands") {
    Serial.print("Changing output to ");
    if(stMessage == "on"){
      Serial.println("on");
      digitalWrite(ledPin, HIGH);
    }
    else if(stMessage == "off"){
      Serial.println("off");
      digitalWrite(ledPin, LOW);
    }
  }
}

void loop() {
  if (!client.connected())
    mqttReconnect();
    
  client.loop();
  long now = millis();
  if (now - last_time > 6000) {
      delay(2000);
      //Sending data to a single topic
      float t = dht.readTemperature();
      String m = "";
      m += String(WiFi.macAddress());
    
      //checking if dht22 is regonized
      if (isnan(t)) {
         Serial.println(F("Failed to read from DHT sensor!"));
         return;
      }
       // Publishing data
       sprintf(data, "{\"temp\" : \"%f\",\"person\" : \"%s\"}",t,m.c_str());
       Serial.println(data);
       client.publish("/swa/temperature", data);
       last_time = now;
  }
}
