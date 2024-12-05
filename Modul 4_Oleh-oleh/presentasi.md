
---

### **Slide 1: Judul dan Identitas**
- **Judul**: *Analisis Klasifikasi Jamur Menggunakan Algoritma SVM dan K-NN*
- Nama Tim/Individu

---

### **Slide 2: Deskripsi Dataset**
- **Judul**: *Dataset Jamur*
- **Sumber**: [UCI Machine Learning Repository - Mushroom Dataset](https://archive.ics.uci.edu/dataset/73/mushroom)
- **Tujuan**: Klasifikasi apakah jamur dapat dimakan atau beracun.
- **Karakteristik Dataset**:
  - Jumlah Fitur: 22 (semua kategori)
  - Jumlah Data: 8124
  - Tipe Klasifikasi: Biner (Edible: 0, Poisonous: 1)
  - Tidak ada *missing values*.
- Visualisasi:
  - Tambahkan diagram pie atau bar chart untuk menunjukkan distribusi kelas (beracun vs dapat dimakan).

---

### **Slide 3: Metodologi**
- **Judul**: *Langkah-Langkah Pengerjaan*
1. **Eksplorasi Data**:
   - Analisis distribusi kelas dan fitur.
   - Pemeriksaan *missing values*.
2. **Preprocessing Data**:
   - Konversi fitur kategori menjadi numerik menggunakan *Label Encoding*.
   - Pembagian data menjadi *train* (80%) dan *test* (20%).
3. **Pemilihan Algoritma**:
   - **SVM**: Menggunakan kernel linear.
   - **K-NN**: Menggunakan *n_neighbors* = 5.
4. **Training dan Testing Model**:
   - Melatih model dengan data *train*.
   - Mengukur performa dengan data *test*.
5. **Evaluasi Model**:
   - Metode evaluasi: Akurasi, Precision, Recall, F1-Score.

---

### **Slide 4: Hasil Evaluasi - Model SVM**
- **Judul**: *Hasil Evaluasi Model SVM*
- Tampilkan tabel laporan klasifikasi:
  ```
               Precision   Recall   F1-Score   Support
           0       0.97      0.98      0.97       843
           1       0.98      0.96      0.97       782

    Akurasi:                             0.97
  ```
- **Visualisasi**:
  - Tambahkan *confusion matrix* untuk model SVM.

---

### **Slide 5: Hasil Evaluasi - Model K-NN**
- **Judul**: *Hasil Evaluasi Model K-NN*
- Tampilkan tabel laporan klasifikasi:
  ```
               Precision   Recall   F1-Score   Support
           0       1.00      0.99      1.00       843
           1       0.99      1.00      1.00       782

    Akurasi:                             0.996
  ```
- **Visualisasi**:
  - Tambahkan *confusion matrix* untuk model K-NN.

---

### **Slide 6: Perbandingan Model**
- **Judul**: *Perbandingan Model SVM dan K-NN*
- **Tabel Perbandingan**:
  | **Metode** | **Akurasi** | **Precision** | **Recall** | **F1-Score** |
  |------------|-------------|---------------|------------|--------------|
  | SVM        | 0.97        | 0.97          | 0.97       | 0.97         |
  | K-NN       | 0.996       | 1.00          | 1.00       | 1.00         |
- **Interpretasi**:
  - K-NN lebih unggul dalam akurasi dan F1-Score.
  - SVM tetap memiliki performa yang sangat baik.

---

### **Slide 7: Kesimpulan**
- **Kinerja Model**:
  - K-NN memberikan hasil terbaik dengan akurasi **99.63%**.
  - SVM juga efektif dengan akurasi **97%**.
- **Potensi Pengembangan**:
  1. Tuning hyperparameter untuk kedua algoritma (SVM dan K-NN).
  2. Eksplorasi algoritma lain seperti Decision Tree atau Random Forest.
  3. Validasi model menggunakan teknik *cross-validation* untuk memastikan stabilitas hasil.

---

### **Slide 8: Referensi**
- Dataset: [UCI Mushroom Dataset](https://archive.ics.uci.edu/dataset/73/mushroom)
- Library:
  - Scikit-learn
  - Pandas
  - Matplotlib
- Tools:
  - Jupyter Notebook / Google Colab

---

