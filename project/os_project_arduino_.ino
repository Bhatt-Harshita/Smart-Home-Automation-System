#include <SoftwareSerial.h>
SoftwareSerial BTSerial(2, 3); // RX, TX pins for Bluetooth
int relay1 = 10;
int relay2 = 11;
int relay3 = 12;
int relay4 = 13;
int val;

void setup() {
  Serial.begin(9600);
  BTSerial.begin(9600);

  pinMode(relay1, OUTPUT);
  pinMode(relay2, OUTPUT);
  pinMode(relay3, OUTPUT);
  pinMode(relay4, OUTPUT);
  digitalWrite(relay1, HIGH); // Initialize OFF
  digitalWrite(relay2, HIGH);
  digitalWrite(relay3, HIGH);
  digitalWrite(relay4, HIGH);
}

void loop() {
  if (Serial.available()) { 
    int val = Serial.parseInt();
    processCommand(val);
  }
  if (BTSerial.available()) {
    int val = BTSerial.parseInt();
    processCommand(val);
  }
  
}

void processCommand(int val){
  // Turn relays ON (1-4 → LOW)
    if (val == 1) digitalWrite(relay1, LOW);
    else if (val == 2) digitalWrite(relay2, LOW);
    else if (val == 3) digitalWrite(relay3, LOW);
    else if (val == 4) digitalWrite(relay4, LOW);
    
    // Turn relays OFF (5-8 → HIGH)
    else if (val == 5) digitalWrite(relay1, HIGH);
    else if (val == 6) digitalWrite(relay2, HIGH);
    else if (val == 7) digitalWrite(relay3, HIGH);
    else if (val == 8) digitalWrite(relay4, HIGH);
    
    // All ON (0 → LOW)
    else if (val == 0) {
      digitalWrite(relay1, LOW);
      digitalWrite(relay2, LOW);
      digitalWrite(relay3, LOW);
      digitalWrite(relay4, LOW);
    }
    
    // All OFF (10 → HIGH)
    else if (val == 10) {
      digitalWrite(relay1, HIGH);
      digitalWrite(relay2, HIGH);
      digitalWrite(relay3, HIGH);
      digitalWrite(relay4, HIGH);
    }
    
}
