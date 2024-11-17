

# IoT Barrier Control System with Blynk

Proyek ini adalah sistem kontrol palang otomatis berbasis IoT menggunakan ESP32. Sistem ini mengintegrasikan beberapa sensor untuk mendeteksi jarak, suhu, dan kelembapan, serta menggunakan aktuator seperti servo motor untuk menggerakkan palang dan LED sebagai indikator kondisi lingkungan. Semua data dikirimkan ke aplikasi Blynk untuk pemantauan secara real-time.

---

## **Penjelasan Umum Proyek**

Proyek ini bertujuan untuk mengotomatiskan palang dengan fitur utama berikut:
1. **Pendekatan Kendaraan**: Sistem mendeteksi kendaraan yang mendekat menggunakan sensor ultrasonik. Jika kendaraan berada dalam jarak tertentu (< 50 cm), palang akan terbuka otomatis.
2. **Pemantauan Suhu dan Kelembapan**: Data dari sensor DHT22 digunakan untuk memantau suhu dan kelembapan lingkungan. Jika kelembapan > 70%, LED menyala sebagai peringatan.
3. **Integrasi IoT**: Semua data sensor dan status perangkat dapat dilihat secara langsung di aplikasi Blynk.

---

## **Komponen yang Digunakan**

### **1. Sensor**
| Nama Sensor          | Jenis         | Fungsi                                   | Pin ESP32       |
|----------------------|---------------|------------------------------------------|-----------------|
| **HC-SR04**          | Digital       | Mengukur jarak kendaraan                | Trig: 33, Echo: 32 |
| **DHT22**            | Digital       | Membaca suhu dan kelembapan             | Data: 14        |

### **2. Aktuator**
| Nama Aktuator       | Jenis         | Fungsi                           | Pin ESP32       |
|---------------------|---------------|-----------------------------------|-----------------|
| **Servo Motor**     | Digital       | Membuka/menutup palang otomatis  | Pin 16          |
| **LED**             | Digital       | Indikator kelembapan tinggi      | Pin 25          |
| **Resistor (220Ω)** | Analog        | Membatasi arus untuk LED         | Seri dengan LED |

---

## **Penjelasan Resistor**

### **Mengapa Resistor Diperlukan pada LED?**
1. **Melindungi LED**:
   - LED memiliki batas arus maksimum (biasanya sekitar 20 mA). Jika arus melebihi batas ini, LED dapat rusak atau bahkan terbakar. Resistor membatasi arus sehingga LED bekerja dalam kisaran yang aman.

2. **Menyesuaikan Tegangan**:
   - Tegangan yang diberikan oleh ESP32 adalah 3.3V. Tegangan LED biasanya lebih rendah (sekitar 2V untuk LED merah, atau 3V untuk LED biru/putih). Resistor membantu mengurangi tegangan agar sesuai dengan spesifikasi LED.

3. **Mengontrol Kecerahan**:
   - Kecerahan LED bergantung pada arus yang mengalir. Resistor membantu mengontrol arus tersebut untuk menghasilkan kecerahan yang optimal tanpa membahayakan LED.

### **Bagaimana Cara Menghitung Nilai Resistor?**
Nilai resistor dihitung menggunakan **Hukum Ohm**:
\[
R = \frac{V_s - V_f}{I}
\]
- **\( V_s \)**: Tegangan sumber (3.3V dari ESP32).
- **\( V_f \)**: Tegangan maju (forward voltage) LED (biasanya 2V untuk LED merah).
- **\( I \)**: Arus LED (biasanya 20 mA atau 0.02 A).

\[
R = \frac{3.3V - 2V}{0.02A} = 65 \, \Omega
\]

Namun, resistor dengan nilai lebih tinggi (misalnya 220Ω) sering digunakan untuk memberikan margin keamanan dan mengurangi kecerahan LED jika diperlukan.

---

## **Koneksi Resistor dan LED**
- **Anoda (kaki panjang LED)**:
  - Disambungkan ke **Pin 25** ESP32 melalui resistor 220Ω.
  - Resistor dihubungkan secara seri antara kaki panjang LED dan Pin 25.
- **Katoda (kaki pendek LED)**:
  - Langsung dihubungkan ke **GND** ESP32.

---

## **Cara Kerja Proyek**

1. **Pengukuran Jarak**:
   - Sensor ultrasonik memancarkan gelombang suara melalui pin **Trig**.
   - Gelombang dipantulkan ke pin **Echo** setelah mengenai objek.
   - Jarak dihitung menggunakan rumus:
     \[
     Jarak (cm) = \frac{\text{Durasi Pantulan (µs)} \times 0.034}{2}
     \]
   - Jika jarak < 50 cm, servo membuka palang.

2. **Pengukuran Suhu dan Kelembapan**:
   - Sensor DHT22 membaca suhu (°C) dan kelembapan (%).
   - Jika kelembapan > 70%, LED menyala sebagai peringatan kelembapan tinggi.

3. **Kontrol Aktuator**:
   - **Servo Motor**: Membuka (90°) atau menutup (0°) palang berdasarkan jarak.
   - **LED**: Menyala/mati berdasarkan kelembapan lingkungan.

4. **Integrasi IoT dengan Blynk**:
   - Data sensor (jarak, suhu, kelembapan) dan status perangkat (servo, LED) dikirim ke aplikasi Blynk melalui virtual pin:
     - **V0**: Suhu
     - **V1**: Kelembapan
     - **V2**: Jarak
     - **V3**: Status Palang
     - **V4**: Status LED

---

## **Diagram Koneksi Perangkat**

```
[ESP32]
|----> (Trig) HC-SR04 (Pin 33)
|----> (Echo) HC-SR04 (Pin 32)
|----> (Data) DHT22 (Pin 14)
|----> (Signal) Servo Motor (Pin 16)
|----> (Resistor 220Ω --> LED Anoda) LED (Pin 25)
|----> (LED Katoda) GND
```

---

