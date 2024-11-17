
---

# **Langkah-langkah Proyek IoT Barrier Control System dengan Blynk**

Panduan ini menjelaskan cara mengatur sistem kontrol palang otomatis berbasis IoT menggunakan ESP32. Sistem menggunakan sensor untuk mendeteksi kendaraan dan kondisi lingkungan, lalu mengontrol aktuator berdasarkan data sensor. Data dikirimkan ke aplikasi Blynk untuk pemantauan real-time.

**Jika belum install alat-bahan yang dibutuhkan akses tutorialnya disini 
https://telkomuniversityofficial-my.sharepoint.com/personal/raihanrtwn_student_telkomuniversity_ac_id/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fraihanrtwn%5Fstudent%5Ftelkomuniversity%5Fac%5Fid%2FDocuments%2FKebutuhan%20Modul%202%5FCyber%20Academy%202024**

---

## **Persiapan**

### **1. Instalasi VSCode dan Ekstensi**
1. **Download dan instal** Visual Studio Code (VSCode) jika belum terinstal.
2. Buka VSCode dan buka **panel Ekstensi** (`Ctrl+Shift+X`).
3. Cari **PlatformIO IDE** dan klik **Install**.
4. Cari **C/C++** dan klik **Install**.
5. Cari **Wokwi** di panel Ekstensi dan klik **Install**.

### **2. Konfigurasi Wokwi dan PlatformIO**
1. **Wokwi License**:
   - Tekan `Ctrl+Shift+P` untuk membuka *Command Palette*.
   - Ketik `Wokwi: Request a new license` dan ikuti instruksi untuk mendapatkan lisensi Wokwi.
2. **Buat Proyek Baru di PlatformIO**:
   - Klik ikon **alien (PlatformIO)** di sidebar kiri.
   - Pilih **Create New Project**.
   - Pilih **ESP32 Dev Module** sebagai board, isi nama proyek, dan tunggu hingga proses build selesai.

---

## **Menyiapkan Kode Proyek**

1. **Buka Folder `src`**:
   - Buka folder proyek yang baru dibuat di PlatformIO.
   - Buka file `main.cpp` di dalam folder `src`.

2. **Salin dan Tempel Kode Berikut**:
   ```cpp
   #include <WiFi.h>
   #include <BlynkSimpleEsp32.h>
   #include <DHT.h>
   #include <Servo.h>

   // Blynk Configuration
   char auth[] = "YourBlynkAuthToken";
   char ssid[] = "YourWiFiSSID";
   char pass[] = "YourWiFiPassword";

   // Pin Configuration
   #define TRIG_PIN 33
   #define ECHO_PIN 32
   #define DHT_PIN 14
   #define LED_PIN 25
   #define SERVO_PIN 16

   // Constants
   #define DHTTYPE DHT22
   DHT dht(DHT_PIN, DHTTYPE);
   Servo servo;

   void setup() {
     Serial.begin(115200);
     WiFi.begin(ssid, pass);
     Blynk.begin(auth, ssid, pass);

     pinMode(TRIG_PIN, OUTPUT);
     pinMode(ECHO_PIN, INPUT);
     pinMode(LED_PIN, OUTPUT);

     dht.begin();
     servo.attach(SERVO_PIN);
     servo.write(0);  // Palang tertutup
   }

   void loop() {
     Blynk.run();

     // Mengukur jarak dengan HC-SR04
     digitalWrite(TRIG_PIN, LOW);
     delayMicroseconds(2);
     digitalWrite(TRIG_PIN, HIGH);
     delayMicroseconds(10);
     digitalWrite(TRIG_PIN, LOW);

     long duration = pulseIn(ECHO_PIN, HIGH);
     float distance = (duration * 0.034) / 2;

     // Membuka palang jika kendaraan terdeteksi
     if (distance < 50.0) {
       servo.write(90);  // Membuka palang
       Blynk.virtualWrite(V3, "Palang Terbuka");
     } else {
       servo.write(0);  // Menutup palang
       Blynk.virtualWrite(V3, "Palang Tertutup");
     }

     // Membaca suhu dan kelembapan dari DHT22
     float temperature = dht.readTemperature();
     float humidity = dht.readHumidity();

     if (humidity > 70) {
       digitalWrite(LED_PIN, HIGH);  // Menyalakan LED
       Blynk.virtualWrite(V4, "LED Menyala");
     } else {
       digitalWrite(LED_PIN, LOW);  // Mematikan LED
       Blynk.virtualWrite(V4, "LED Mati");
     }

     // Kirim data ke Blynk
     Blynk.virtualWrite(V0, temperature);
     Blynk.virtualWrite(V1, humidity);
     Blynk.virtualWrite(V2, distance);

     delay(1000);  // Delay 1 detik
   }
   ```

3. **Ganti Informasi Jaringan dan Blynk**:
   - Isi `YourBlynkAuthToken`, `YourWiFiSSID`, dan `YourWiFiPassword` dengan informasi Anda.

---

## **Menginstal Library yang Dibutuhkan**

1. Di PlatformIO, klik **Library** di sidebar kiri.
2. Cari dan instal library:
   - **Blynk** untuk ESP32.
   - **DHT sensor library**.
   - **Servo**.

---

## **Menyusun File wokwi.toml dan diagram.json**

### **File wokwi.toml**
1. Buat file baru bernama `wokwi.toml` di direktori utama.
2. Salin kode berikut:
   ```toml
   [wokwi]
   version = 1
   firmware = '.pio/build/esp32dev/firmware.bin'
   elf = '.pio/build/esp32dev/firmware.elf'
   ```

### **File diagram.json**
1. Buat file baru bernama `diagram.json` di direktori utama.
2. Tempelkan konfigurasi diagram dari Wokwi.

---

## **Compile dan Simulasikan Proyek**

1. Klik ikon **ceklist** di bagian bawah VSCode untuk meng-compile proyek.
2. Setelah sukses, tekan `Ctrl+Shift+P`, ketik `Wokwi: Start Simulation`, dan jalankan simulasi.

---

Semoga berhasil dengan proyek Anda!
