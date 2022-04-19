#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#define DHTPIN 4
#define DHTTYPE DHT22

const int ledPin = 5;// red light pin
const char *SSID = "TP-LINK_CC2894";//wifi name
const char *PWD = "comptonnitrogenpicom";// wifi password

DHT dht(DHTPIN, DHTTYPE);//setting dht pins & type of dht

long last_time = 0;
char data[1000];

// MQTT client
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

char *mqttServer = "test.mosquitto.org";//can be replaced by broker.hivemq.com
int mqttPort = 1883;


void connectToWiFi() {
  Serial.print("Connecting to ");
 
  WiFi.begin(SSID, PWD);
  Serial.println(SSID);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.print("Connected.");
  
} 
//sets up call back from a topic you subscribed to
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Callback - ");
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
}

void setupMQTT() {
  mqttClient.setServer(mqttServer, mqttPort);
  // set the callback function
  mqttClient.setCallback(callback);
  pinMode (ledPin, OUTPUT);
}


void setup() {
  Serial.begin(9600); 
  connectToWiFi();
  Serial.println(F("DHTxx test!"));
  dht.begin();
  setupMQTT();  
}
//subs to topic commands allows to send meesages to esp32
void reconnect() {
  Serial.println("Connecting to MQTT Broker...");
  while (!mqttClient.connected()) {
      Serial.println("Reconnecting to MQTT Broker..");
      String clientId = "ESP32Client-";
      //clientId += String(random(0xffff), HEX);
      
      if (mqttClient.connect(clientId.c_str())) {
        Serial.println("Connected.");
        // subscribe to topic
        mqttClient.subscribe("/swa/commands");
      }      
  }
}


void loop() {
  //just testing the red led
  digitalWrite (ledPin, HIGH);
  delay(500);
  digitalWrite (ledPin, LOW);
  delay(500);
  //checking the connection
  if (!mqttClient.connected())
    reconnect();

  mqttClient.loop();

  long now = millis();
  if (now - last_time > 6000) {
      delay(2000);
      float h = dht.readHumidity();
      float t = dht.readTemperature();
      //float f = dht.readTemperature(true);
      String m = "";
      m += String(WiFi.macAddress());
      //checking if dht22 is regonized
      if (isnan(h) || isnan(t)) {
        Serial.println(F("Failed to read from DHT sensor!"));
        return;
      }
        // Publishing data throgh MQTT to 3 different topics
        sprintf(data, "%f", t);
        sprintf(data, "temperature %f C°", t);
        Serial.println(data);
        mqttClient.publish("/swa/temperature", data);
        sprintf(data, "humidity %f C°", h);
        Serial.println(h);
        mqttClient.publish("/swa/humidity", data);
        sprintf(data, "%s", m.c_str());
        Serial.println(m);
        mqttClient.publish("/swa/client", data);
        last_time = now;
  }

}
