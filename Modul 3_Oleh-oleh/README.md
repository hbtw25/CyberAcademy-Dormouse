

---

# Dokumentasi Proyek: **Product Showcase & Group Management**

## Deskripsi Proyek
Proyek ini adalah aplikasi web sederhana untuk menampilkan daftar produk dan mengelola grup beserta anggotanya. Aplikasi ini terdiri dari **frontend** berbasis HTML, CSS, dan JavaScript serta **backend** berbasis Node.js menggunakan Express.

---

## 1. **Frontend**

### 1.1 **Fungsi**
Frontend berfungsi untuk:
- Menampilkan **Product Showcase** dengan memuat data dari API eksternal.
- Memberikan UI untuk **Group Management**, termasuk:
  - Menambahkan grup baru.
  - Mengelola anggota grup (tambah, edit, hapus).
  - Menghapus grup.

### 1.2 **Teknologi**
- HTML5
- Bootstrap 5 untuk desain UI responsif.
- JavaScript untuk interaksi dan pemanggilan API.

### 1.3 **File Terkait**
- **index.html**: Struktur halaman dan elemen visual.
- **script.js**: Logika aplikasi frontend, termasuk pemanggilan API.

### 1.4 **Struktur Halaman**
#### **Navbar**
- Navigasi antar fitur:
  - **Product Showcase**
  - **Group Management**

#### **Product Showcase**
- Memuat 10 produk dari API eksternal `https://dummyjson.com/products`.
- Informasi produk:
  - Thumbnail.
  - Nama produk.
  - Merek.
  - Deskripsi (potongan singkat).
  - Harga.

#### **Group Management**
- **Form Tambah Grup**: Input nama grup baru.
- **Daftar Grup**:
  - Menampilkan nama grup dan tombol aksi:
    - **Manage Students**: Mengelola anggota grup.
    - **Delete Group**: Menghapus grup.
- **Edit Students**:
  - Menambah, mengedit, atau menghapus anggota grup.

---

## 2. **Backend**

### 2.1 **Fungsi**
Backend berfungsi untuk:
- Memberikan API untuk manajemen grup dan anggota:
  - `GET`: Mendapatkan daftar grup atau detail grup tertentu.
  - `POST`: Membuat grup baru atau menambah anggota ke grup yang sudah ada.
  - `PUT`: Memperbarui data grup.
  - `DELETE`: Menghapus grup.

### 2.2 **Teknologi**
- Node.js
- Express.js untuk pembuatan server.
- CORS untuk mengizinkan komunikasi antara frontend dan backend.

### 2.3 **File Terkait**
- **index.js**: File backend dengan definisi API dan logika manajemen data.

### 2.4 **Endpoint API**
#### 1. `GET /groups`
- **Deskripsi**: Mendapatkan semua grup.
- **Response**: Daftar grup.

#### 2. `GET /groups/:group_name`
- **Deskripsi**: Mendapatkan detail grup berdasarkan nama.
- **Response**: Detail grup atau pesan kesalahan jika tidak ditemukan.

#### 3. `POST /groups`
- **Deskripsi**: Membuat grup baru atau menambah anggota ke grup yang sudah ada.
- **Request Body**:
  ```json
  {
    "group_name": "string",
    "student1": { "student_name": "string", "student_id": "string", "student_class": "string" },
    "student2": { "student_name": "string", "student_id": "string", "student_class": "string" },
    "student3": { "student_name": "string", "student_id": "string", "student_class": "string" },
    "student4": { "student_name": "string", "student_id": "string", "student_class": "string" }
  }
  ```
- **Response**: Grup baru atau grup yang diperbarui.

#### 4. `PUT /groups/:group_name`
- **Deskripsi**: Memperbarui data grup.
- **Request Body**: Sama seperti `POST`.
- **Response**: Grup yang diperbarui.

#### 5. `DELETE /groups/:group_name`
- **Deskripsi**: Menghapus grup berdasarkan nama.
- **Response**: Pesan konfirmasi.

---

## 3. **Instruksi Penggunaan**

### 3.1 **Frontend**
1. Buka file `index.html` di browser.
2. Gunakan fitur sesuai navigasi:
   - **Product Showcase**: Menampilkan produk.
   - **Group Management**: Mengelola grup dan anggota.

### 3.2 **Backend**
1. Simpan file backend sebagai `index.js`.
2. Jalankan perintah:
   ```bash
   npm init -y
   npm install express cors
   node index.js
   ```
3. Pastikan server berjalan di `http://localhost:3000`.

### 3.3 **Pengujian**
- Gunakan frontend untuk mengakses dan mengelola data grup melalui API backend.

---

## 4. **Struktur Folder**
```
project/
├── frontend/               # Folder untuk file frontend
│   ├── index.html          # Halaman utama frontend
│   ├── script.js           # Logika aplikasi frontend
│   └── style.css           # Styling tambahan untuk frontend
└── backend/                # Folder untuk file backend
    └── index.js            # Server backend menggunakan Node.js
```

---

## 5. **Catatan**
- Mock data pada backend tidak permanen (disimpan di memori). Untuk data persisten, gunakan database seperti MongoDB atau PostgreSQL.
- Pastikan server backend berjalan saat menggunakan frontend untuk fitur manajemen grup.

