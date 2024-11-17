

```markdown
# IoT Barrier Control System with Blynk

Proyek ini adalah sistem kontrol palang otomatis berbasis IoT menggunakan ESP32. Sistem ini memanfaatkan beberapa sensor untuk mendeteksi jarak, suhu, dan kelembapan, serta menggunakan aktuator seperti servo motor untuk menggerakkan palang dan LED sebagai indikator kondisi kelembapan. Data dari sensor juga dikirim ke aplikasi Blynk untuk pemantauan secara real-time.

---

## Penjelasan Umum Proyek

Proyek ini bertujuan untuk mengotomatiskan kontrol palang dengan fitur berikut:
- **Pendekatan Kendaraan**: Menggunakan sensor ultrasonik untuk mendeteksi keberadaan kendaraan/objek mendekati palang. Jika jarak di bawah 50 cm, palang akan terbuka secara otomatis.
- **Pemantauan Suhu dan Kelembapan**: Menggunakan sensor DHT22 untuk membaca suhu dan kelembapan lingkungan. Jika kelembapan lebih dari 70%, LED akan menyala sebagai peringatan.
- **Integrasi IoT**: Semua data sensor dan status perangkat dapat dipantau melalui aplikasi Blynk.

---

## Komponen yang Digunakan

### 1. **Sensor**
| **Nama Sensor**       | **Jenis (Analog/Digital)** | **Fungsi**                                      | **Pin ESP32** |
|------------------------|---------------------------|------------------------------------------------|---------------|
| Ultrasonic HC-SR04     | Digital                  | Mengukur jarak dengan gelombang ultrasonik     | Trig: 33, Echo: 32 |
| DHT22                  | Digital                  | Membaca suhu dan kelembapan udara              | Data: 14      |

#### **Alasan Penggunaan Sensor**
- **HC-SR04**: Memiliki akurasi yang baik untuk mendeteksi jarak pendek hingga 400 cm, cocok untuk mendeteksi kendaraan mendekati palang.
- **DHT22**: Sensor suhu dan kelembapan yang stabil dan memiliki presisi tinggi, sangat cocok untuk pemantauan lingkungan.

#### **Koneksi Sensor**
1. **Ultrasonik HC-SR04**
   - **VCC**: Sambungkan ke 5V pada ESP32.
   - **GND**: Sambungkan ke GND pada ESP32.
   - **Trig**: Sambungkan ke Pin 33 (digital output untuk mengirim sinyal).
   - **Echo**: Sambungkan ke Pin 32 (digital input untuk menerima pantulan sinyal).

2. **DHT22**
   - **VCC**: Sambungkan ke 3.3V pada ESP32.
   - **GND**: Sambungkan ke GND pada ESP32.
   - **Data**: Sambungkan ke Pin 14 (digital input untuk membaca data suhu dan kelembapan).

---

### 2. **Aktuator**
| **Nama Aktuator**      | **Jenis (Analog/Digital)** | **Fungsi**                        | **Pin ESP32** |
|------------------------|---------------------------|------------------------------------|---------------|
| Servo Motor            | Digital                  | Membuka dan menutup palang otomatis | Pin 16        |
| LED                    | Digital                  | Indikator tingkat kelembapan       | Pin 25        |

#### **Alasan Penggunaan Aktuator**
- **Servo Motor**: Aktuator dengan gerakan presisi untuk membuka dan menutup palang dengan sudut tertentu (0° untuk menutup, 90° untuk membuka).
- **LED**: Indikator visual sederhana dan hemat daya untuk menunjukkan kondisi kelembapan tinggi.

#### **Koneksi Aktuator**
1. **Servo Motor**
   - **VCC**: Sambungkan ke 5V pada ESP32.
   - **GND**: Sambungkan ke GND pada ESP32.
   - **Signal**: Sambungkan ke Pin 16 (digital output untuk kontrol sudut servo).

2. **LED**
   - **Anoda (Kaki Panjang)**: Sambungkan ke Pin 25 melalui resistor 220Ω untuk membatasi arus.
   - **Katoda (Kaki Pendek)**: Sambungkan ke GND.

---

## Penjelasan Koneksi

1. **Sensor HC-SR04**:
   - Trig dan Echo membutuhkan pin digital untuk mengirimkan dan menerima sinyal ultrasonik. 
   - **Kenapa Pin 33 dan 32?**: Pin ini mendukung fungsi digital I/O dengan waktu respons yang cepat.

2. **Sensor DHT22**:
   - Menggunakan satu pin digital untuk membaca data suhu dan kelembapan.
   - **Kenapa Pin 14?**: Pin ini fleksibel untuk fungsi digital input.

3. **Servo Motor**:
   - Menggunakan pin digital untuk menerima sinyal PWM yang mengontrol sudut rotasi servo.
   - **Kenapa Pin 16?**: Pin ini mendukung sinyal PWM untuk kontrol presisi.

4. **LED**:
   - Menggunakan pin digital untuk menghidupkan/mematikan LED.
   - **Kenapa Pin 25?**: Pin ini adalah pin output digital yang sederhana dan cocok untuk kontrol LED.

---

## Cara Kerja Proyek

1. **Pengukuran Jarak**:
   - Sensor ultrasonik memancarkan gelombang suara melalui **Trig**.
   - Gelombang dipantulkan kembali ke **Echo** saat mengenai objek.
   - Jarak dihitung menggunakan rumus: 
     \[
     \text{Jarak (cm)} = \frac{\text{Durasi Pantulan (µs)} \times 0.034}{2}
     \]
   - Jika jarak kurang dari 50 cm, servo akan membuka palang.

2. **Pengukuran Suhu dan Kelembapan**:
   - DHT22 membaca data suhu (°C) dan kelembapan (%) secara periodik.
   - Jika kelembapan >70%, LED menyala untuk memberi indikasi kelembapan tinggi.

3. **Kontrol Aktuator**:
   - **Servo Motor**: Membuka/mengunci palang dengan sudut 90° untuk membuka dan 0° untuk menutup.
   - **LED**: Menyala/mati berdasarkan tingkat kelembapan.

4. **Pengiriman Data ke Blynk**:
   - Semua data sensor (jarak, suhu, kelembapan) dan status perangkat (servo, LED) dikirim ke aplikasi Blynk menggunakan **Virtual Pins**:
     - V0: Suhu
     - V1: Kelembapan
     - V2: Jarak
     - V3: Status Palang
     - V4: Status LED

---

## Diagram Koneksi Perangkat

Berikut adalah diagram koneksi perangkat keras:
```
[ESP32]
|----> (Trig) Ultrasonik HC-SR04 (Pin 33)
|----> (Echo) Ultrasonik HC-SR04 (Pin 32)
|----> (Data) DHT22 (Pin 14)
|----> (Signal) Servo Motor (Pin 16)
|----> (Anoda) LED (Pin 25 melalui resistor 220Ω)
```

---

## Penutup

Proyek ini dirancang untuk aplikasi otomatisasi yang membutuhkan kontrol palang dengan tingkat presisi tinggi dan pemantauan kondisi lingkungan secara real-time. Dengan integrasi Blynk, pengguna dapat memantau data sensor dan status perangkat dari mana saja.
``` 
