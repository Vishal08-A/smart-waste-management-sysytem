/*
  Smart Waste Bin - ESP32 IoT Module
  Ultrasonic sensor for fill level + WiFi to backend
*/

// Pins
#define TRIG_PIN 5
#define ECHO_PIN 18
#define LED_GREEN 2
#define LED_YELLOW 4
#define LED_RED 15

// WiFi
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* server = "http://192.168.1.100:5000/api/waste";  // Backend IP

String bin_id = "BIN101";

void setup() {
  Serial.begin(115200);
  
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_RED, OUTPUT);
  
  // Connect WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("WiFi connected!");
}

void loop() {
  // Measure distance
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  int distance = duration * 0.034 / 2;
  
  // Calculate fill level (bin height 30cm)
  int fill_level = map(distance, 30, 2, 0, 100);
  fill_level = constrain(fill_level, 0, 100);
  
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.print("cm, Fill: ");
  Serial.print(fill_level);
  Serial.println("%");
  
  // LED alerts
  if (fill_level < 50) {
    digitalWrite(LED_GREEN, HIGH);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_RED, LOW);
  } else if (fill_level < 80) {
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_RED, LOW);
  } else {
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_YELLOW, LOW);
    digitalWrite(LED_RED, HIGH);
  }
  
  // Send to backend every 30s
  if (WiFi.status() == WL_CONNECTED) {
    sendData(fill_level);
  }
  
  delay(5000);  // Check every 5s
}

void sendData(int fill_level) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(server);
    http.addHeader("Content-Type", "application/json");
    
    String jsonData = "{\"bin_id\":\"" + bin_id + "\",\"fill_level\":" + fill_level + "}";
    
    int httpResponseCode = http.POST(jsonData);
    
    if (httpResponseCode > 0) {
      Serial.printf("HTTP Response: %d\n", httpResponseCode);
    } else {
      Serial.print("Error: ");
      Serial.println(httpResponseCode);
    }
    
    http.end();
  }
}

