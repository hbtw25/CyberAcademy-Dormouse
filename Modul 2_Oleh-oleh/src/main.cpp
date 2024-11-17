#define BLYNK_PRINT Serial

// Konfigurasi Blynk
#define BLYNK_TEMPLATE_ID "TMPL6xJmlvU2c" // ID Template dari Blynk
#define BLYNK_TEMPLATE_NAME "modul 2" // Nama Template di Blynk
#define BLYNK_AUTH_TOKEN "FLPbqoSrTWS76hhAJeefgX37I0MT8rX7" // Token autentikasi untuk perangkat

#include <DHT.h>
#include <ESP32Servo.h>
#include <BlynkSimpleEsp32.h>

// Informasi jaringan Wi-Fi
char auth[] = BLYNK_AUTH_TOKEN; // Token autentikasi
char ssid[] = "Wokwi-GUEST"; // Nama Wi-Fi
char password[] = ""; // Password Wi-Fi

// Definisi pin dan konfigurasi sensor
#define PIN_ECHO 32         // Pin Echo pada sensor ultrasonik
#define PIN_TRIG 33         // Pin Trigger pada sensor ultrasonik
#define PIN_DHT 14          // Pin untuk sensor DHT22
#define PIN_SERVO_1 16      // Pin untuk servo motor
#define PIN_LED 25          // Pin untuk LED
#define DHTTYPE DHT22       // Jenis sensor DHT yang digunakan
#define DISTANCE_THRESHOLD 50.0 // Batas jarak dalam cm untuk membuka palang
#define HUMIDITY_THRESHOLD 70.0 // Batas kelembapan untuk menghidupkan LED

DHT dht(PIN_DHT, DHTTYPE); // Objek sensor DHT
Servo servoMotor; // Objek servo motor

// Fungsi untuk mendapatkan jarak dari sensor ultrasonik
float getDistance();

// Fungsi untuk membuka palang servo
void openBarrier();

// Fungsi untuk menutup palang servo
void closeBarrier();

// Fungsi untuk mencetak data sensor ke Serial Monitor
void printSensorData(int distance, float temperature, float humidity);

void setup() {
  Serial.begin(115200); // Inisialisasi Serial Monitor
  pinMode(PIN_TRIG, OUTPUT); // Pin Trigger sebagai output
  pinMode(PIN_ECHO, INPUT);  // Pin Echo sebagai input
  pinMode(PIN_LED, OUTPUT);  // Pin LED sebagai output

  Blynk.begin(auth, ssid, password); // Menghubungkan ke Blynk
  dht.begin(); // Memulai sensor DHT

  // Inisialisasi servo motor dan LED
  servoMotor.attach(PIN_SERVO_1); 
  servoMotor.write(0); // Servo awal dalam posisi tertutup
  digitalWrite(PIN_LED, LOW); // LED awal dalam kondisi mati
}

void loop() {
  int distance_cm = getDistance(); // Membaca jarak dari sensor ultrasonik
  float temperature = dht.readTemperature(); // Membaca suhu dari sensor DHT
  float humidity = dht.readHumidity(); // Membaca kelembapan dari sensor DHT

  // Mengirimkan data sensor ke Blynk
  Blynk.virtualWrite(V0, temperature); // Suhu ke Virtual Pin V0
  Blynk.virtualWrite(V1, humidity); // Kelembapan ke Virtual Pin V1
  Blynk.virtualWrite(V2, distance_cm); // Jarak ke Virtual Pin V2

  // Logika untuk mengontrol palang berdasarkan jarak
  if (distance_cm < DISTANCE_THRESHOLD) { 
    openBarrier(); // Membuka palang
    Blynk.virtualWrite(V3, 90); // Mengirim status ke Virtual Pin V3
    delay(5000);  // Menahan palang terbuka selama 5 detik
    closeBarrier(); // Menutup palang
  } else {
    Blynk.virtualWrite(V3, 0); // Mengirim status tertutup ke Virtual Pin V3
  }

  // Logika untuk mengontrol LED berdasarkan kelembapan
  if (humidity > HUMIDITY_THRESHOLD) {
    digitalWrite(PIN_LED, HIGH); // Menghidupkan LED jika kelembapan tinggi
    Blynk.virtualWrite(V4, 1);  // Mengirim status LED nyala ke Virtual Pin V4
  } else {
    digitalWrite(PIN_LED, LOW);  // Mematikan LED jika kelembapan rendah
    Blynk.virtualWrite(V4, 0);  // Mengirim status LED mati ke Virtual Pin V4
  }

  // Mencetak data sensor ke Serial Monitor
  printSensorData(distance_cm, temperature, humidity);

  Blynk.run(); // Menjalankan koneksi Blynk
  delay(1000); // Delay 1 detik
}

// Fungsi untuk mengukur jarak menggunakan sensor ultrasonik
float getDistance() {
  digitalWrite(PIN_TRIG, LOW); // Memastikan Trigger dalam keadaan LOW
  delayMicroseconds(2); // Delay sebentar
  digitalWrite(PIN_TRIG, HIGH); // Memberikan sinyal HIGH untuk Trigger
  delayMicroseconds(10); // Mempertahankan sinyal HIGH selama 10 mikrodetik
  digitalWrite(PIN_TRIG, LOW); // Kembali ke LOW

  long duration = pulseIn(PIN_ECHO, HIGH); // Mengukur waktu pantulan
  return duration * 0.034 / 2; // Menghitung jarak berdasarkan waktu pantulan
}

// Fungsi untuk membuka palang servo
void openBarrier() {
  servoMotor.write(90); // Menggerakkan servo ke posisi 90 derajat (membuka)
}

// Fungsi untuk menutup palang servo
void closeBarrier() {
  servoMotor.write(0);  // Menggerakkan servo ke posisi 0 derajat (menutup)
}

// Fungsi untuk mencetak data sensor ke Serial Monitor
void printSensorData(int distance, float temperature, float humidity) {
  Serial.println("==========================");
  Serial.print("Distance (cm): "); Serial.println(distance); // Cetak jarak
  Serial.print("Temperature (C): "); Serial.println(temperature); // Cetak suhu
  Serial.print("Humidity (%): "); Serial.println(humidity); // Cetak kelembapan
  Serial.println("==========================");
}
