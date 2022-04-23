// making connection to phone app
#define BLYNK_TEMPLATE_ID "TMPLDr73x7Sw"
#define BLYNK_DEVICE_NAME "ESPTemp32"
#define BLYNK_AUTH_TOKEN "41IbMW7bPrialltd5BB4cZlRS71blqMQ"
#define BLYNK_PRINT Serial

//adding needed libraries
#include <WiFi.h>
#include "PubSubClient.h"
#include "DHT.h"
#define DHTPIN 4
#define DHTTYPE DHT22
#include <BlynkSimpleEsp32.h>

//setting up needed variables
const char* ssid = "********";// wifi name
const char* password = "********;// wifi password
const char* mqttServer = "test.mosquitto.org";// mqtt server can be switched to broker.hivemq.com
int port = 1883;
String stMac;
char mac[50];
char clientId[50];
const int ledPin = 5;
long last_time = 0;
char data[100];//we store data that were going to publish here
char auth[] = BLYNK_AUTH_TOKEN;
BlynkTimer timer;//blink timer basically loop for blink

WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE);//setting dht pins & type of dht

void sendSensor(){
  //setting up variables
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  String m = "";
  m += String(WiFi.macAddress());
  //sending information for Blynk
  Blynk.virtualWrite(V0, String(t,2));
  Blynk.virtualWrite(V2, String(h, 2));
  //sending information to mqtt broker
  sprintf(data, "{\"temp\" : \"%s\",\"person\" : \"%s\"}",String(t, 2),m.c_str());
  client.publish("/swa/temperature", data);
  Serial.println(data);

}
BLYNK_WRITE(V1){
  //int pinValue= param.asInt();
  //digitalWrite(led,pinValue);
   if (param.asInt()) {
     client.publish("temp","on");
   }
   else {
     client.publish("temp","off");
   }
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
      client.subscribe("temp");
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
  if (String(topic) == "temp") {
    Serial.print("Changing output to ");
    if(stMessage == "on"){
      Serial.println("on");
      digitalWrite(ledPin, HIGH);
      Blynk.virtualWrite(V1,1);
    }
    else if(stMessage == "off"){
      Serial.println("off");
      digitalWrite(ledPin, LOW);
      Blynk.virtualWrite(V1,0);
    }
  }
}

void setup() {
  Serial.begin(9600);
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
  // starting dht
  Serial.println(F("DHTxx test!"));
  dht.begin();
  //starting blink & blynk timer
  Blynk.begin(auth, ssid, password);
  timer.setInterval(100L, sendSensor);
}

void loop() {
  if (!client.connected())
    mqttReconnect();
  
  client.loop();
  Blynk.run();
  timer.run();
}
