**Bahan Gambar ada di folder asset [aset](https://github.com/hbtw25/CyberAcademy-Dormouse/tree/main/Modul%202_Oleh-oleh/asset)**
---

### **Slide 1: Judul Proyek**
- **Judul**: Rangkaian IoT dengan ESP32 di Wokwi
- **Kelompok**: CA2425_Nama Kelompok_Nama Modul
- **Anggota Kelompok**: [Nama anggota kelompok]

---

### **Slide 2: Komponen Utama**
- **Mikrokontroler**: ESP32
- **Sensor**:
  - Sensor Ultrasonik (HC-SR04)
  - Sensor Suhu dan Kelembapan (DHT22)
- **Aktuator**:
  - Servo Motor
  - LED

---

### **Slide 3: Rangkaian di Wokwi**
- **Gambar Rangkaian**: Screenshot dari simulasi Wokwi yang menunjukkan semua komponen yang terhubung ke ESP32.
- **Catatan**: Diagram harus jelas dan mudah dipahami.

---

### **Slide 4: Koneksi Pin**
- **ESP32**:
  - **HC-SR04**: Trig ke Pin 33, Echo ke Pin 32
  - **DHT22**: Data ke Pin 14
  - **Servo Motor**: Sinyal ke Pin 16
  - **LED**: Anoda ke Pin 25 (dengan resistor 220Ω ke GND)
- **Diagram**: Gambar atau ilustrasi jalur koneksi.

---

### **Slide 5: Penjelasan Sensor dan Aktuator**
- **Sensor Ultrasonik**: Mengukur jarak kendaraan.
- **Sensor DHT22**: Membaca suhu dan kelembapan lingkungan.
- **Servo Motor**: Membuka/tutup palang secara otomatis.
- **LED**: Menyala saat kelembapan tinggi (>70%).

---

### **Slide 6: Cara Kerja (1)**
- **Pengukuran Jarak**: Sensor ultrasonik mengukur jarak dan menggerakkan servo jika jarak kurang dari 50 cm.

---

### **Slide 7: Cara Kerja (2)**
- **Pengukuran Suhu dan Kelembapan**: Sensor DHT22 membaca data, dan LED menyala jika kelembapan melebihi ambang batas.

---

### **Slide 8: Output di Serial Monitor**
- **Screenshot**: Tampilkan output dari Serial Monitor di Wokwi.
- **Penjelasan**: Data jarak, suhu, dan kelembapan yang dicetak di Serial Monitor.

---

### **Slide 9: Integrasi dengan Blynk**
- **Blynk Setup**: Penjelasan singkat tentang bagaimana Blynk digunakan untuk memantau data secara real-time.
- **Screenshot**: Tampilan Blynk Dashboard.

---

### **Slide 10: Kesimpulan dan Tantangan**
- **Kesimpulan**: Sistem berhasil dibuat dan data dapat dipantau di Blynk.
- **Tantangan**: Menghubungkan komponen dan debugging di Wokwi.
- **Terima Kasih**: Undang audiens untuk bertanya.

---
