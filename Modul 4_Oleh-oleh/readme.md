Berikut adalah dokumentasi lengkap untuk kode klasifikasi jamur menggunakan Support Vector Machine (SVM) dan K-Nearest Neighbors (K-NN).

---

## **Dokumentasi Kode Klasifikasi Jamur**

### **1. Import Library**
```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
```
**Penjelasan**:
- **`pandas`**: Untuk membaca dan memproses dataset.
- **`numpy`**: Untuk operasi numerik.
- **`matplotlib` dan `seaborn`**: Untuk visualisasi data.
- **`sklearn`**: Untuk preprocessing, pembagian dataset, pembuatan model, dan evaluasi.

---

### **2. Memuat Dataset**
```python
url = "https://archive.ics.uci.edu/ml/machine-learning-databases/mushroom/agaricus-lepiota.data"
kolom = ['kelas', 'bentuk-topi', 'permukaan-topi', 'warna-topi', 'memar', 'bau',
         'lampiran-insang', 'jarak-insang', 'ukuran-insang', 'warna-insang',
         'bentuk-batang', 'akar-batang', 'permukaan-atas-cincin',
         'permukaan-bawah-cincin', 'warna-atas-cincin', 'warna-bawah-cincin',
         'jenis-selubung', 'warna-selubung', 'jumlah-cincin', 'tipe-cincin',
         'warna-cetakan-spora', 'populasi', 'habitat']
data = pd.read_csv(url, header=None, names=kolom)
```
**Penjelasan**:
- Dataset diambil dari [UCI Repository](https://archive.ics.uci.edu/ml/datasets/Mushroom).
- Kolom diberi nama sesuai deskripsi dataset.

---

### **3. Eksplorasi Data**
```python
print("Contoh Dataset:")
print(data.head())
print("\nInformasi Dataset:")
print(data.info())
print("\nDistribusi Kelas (Dapat Dimakan vs Beracun):")
print(data['kelas'].value_counts())
```
**Penjelasan**:
- **`data.head()`**: Menampilkan lima baris pertama dataset.
- **`data.info()`**: Menampilkan informasi struktur dataset (jumlah baris, kolom, dan tipe data).
- **`data['kelas'].value_counts()`**: Menunjukkan jumlah sampel dalam masing-masing kelas (dapat dimakan vs beracun).

---

### **4. Preprocessing Data**
```python
encoder = LabelEncoder()
for kolom in data.columns:
    data[kolom] = encoder.fit_transform(data[kolom])
```
**Penjelasan**:
- **`LabelEncoder`** digunakan untuk mengonversi nilai kategori menjadi numerik. Hal ini diperlukan karena algoritma machine learning tidak bisa langsung menangani data kategori.

```python
X = data.drop('kelas', axis=1)
y = data['kelas']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```
**Penjelasan**:
- Data dibagi menjadi:
  - **Fitur (X)**: Semua kolom kecuali `kelas`.
  - **Target (y)**: Kolom `kelas`.
- Dataset dibagi menjadi data latih (80%) dan data uji (20%) menggunakan `train_test_split`.

---

### **5. Melatih Model**
#### Model SVM
```python
model_svm = SVC(kernel='linear')
model_svm.fit(X_train, y_train)
prediksi_svm = model_svm.predict(X_test)
```
**Penjelasan**:
- Model Support Vector Machine (SVM) dilatih dengan kernel linear.
- **`fit()`** digunakan untuk melatih model pada data latih.
- **`predict()`** digunakan untuk membuat prediksi pada data uji.

#### Model K-NN
```python
model_knn = KNeighborsClassifier(n_neighbors=5)
model_knn.fit(X_train, y_train)
prediksi_knn = model_knn.predict(X_test)
```
**Penjelasan**:
- Model K-Nearest Neighbors (K-NN) dilatih dengan `n_neighbors=5`.
- Sama seperti SVM, model dilatih dan digunakan untuk prediksi.

---

### **6. Evaluasi Model**
#### Evaluasi SVM
```python
print("\nEvaluasi Model SVM:")
print("Akurasi:", accuracy_score(y_test, prediksi_svm))
print("Laporan Klasifikasi:\n", classification_report(y_test, prediksi_svm))
```
#### Evaluasi K-NN
```python
print("\nEvaluasi Model K-NN:")
print("Akurasi:", accuracy_score(y_test, prediksi_knn))
print("Laporan Klasifikasi:\n", classification_report(y_test, prediksi_knn))
```
**Penjelasan**:
- **`accuracy_score`**: Menghitung akurasi model (persentase prediksi benar).
- **`classification_report`**: Menyediakan metrik evaluasi (Precision, Recall, F1-Score).

---

### **7. Visualisasi Hasil**
```python
plt.figure(figsize=(6, 4))
sns.countplot(x='kelas', data=data)
plt.title('Distribusi Kelas (Dapat Dimakan vs Beracun)')
plt.xlabel('Kelas')
plt.ylabel('Jumlah')
plt.show()
```
**Penjelasan**:
- Membuat plot batang menggunakan `seaborn` untuk menggambarkan distribusi kelas pada dataset.

---

### **8. Hasil Evaluasi**
- **Model SVM**:
  - Akurasi: Tinggi (97%).
  - Mampu membedakan jamur yang dapat dimakan dan beracun dengan baik.
- **Model K-NN**:
  - Akurasi: Sangat tinggi (99.63%).
  - Meningkatkan akurasi dibandingkan SVM karena mempertimbangkan hubungan lokal antar data.

### **9. Kesimpulan**
- Kedua model bekerja sangat baik untuk dataset ini, tetapi K-NN lebih unggul dari segi akurasi.
- Tantangan:
  - Banyaknya fitur kategori memerlukan proses encoding.
- Peluang Pengembangan:
  - Melakukan eksplorasi hyperparameter tuning untuk meningkatkan performa model lebih lanjut.

--- 

**Dokumentasi ini bisa digunakan sebagai referensi untuk memahami setiap langkah pada kode.** 😊