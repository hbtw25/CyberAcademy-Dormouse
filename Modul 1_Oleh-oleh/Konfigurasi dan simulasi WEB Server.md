
# Setup Web Server di Ubuntu 22.04 (VirtualBox VM)

Panduan ini memberikan langkah-langkah untuk menginstal dan mengkonfigurasi Web Server menggunakan Apache di Ubuntu 22.04 yang dijalankan sebagai Virtual Machine di VirtualBox, serta cara mengaksesnya dari browser di host OS Windows.

---

## Prasyarat

- Mesin Virtual (VM) Ubuntu 22.04 yang sudah berjalan di VirtualBox.
- Host OS menggunakan Windows.
- Pengetahuan dasar tentang perintah di terminal Linux.
- Pastikan pengaturan jaringan VM sudah dikonfigurasi dengan benar (misalnya, Bridged Adapter).

---

## Langkah 1: Atur Jaringan VM di VirtualBox

Agar VM dapat diakses melalui browser dari Windows, atur jaringan pada VirtualBox:

- Buka **VirtualBox**, pilih VM Ubuntu 22.04, lalu buka **Settings** > **Network**.
- Pada opsi **Attached to**, pilih **Bridged Adapter** agar VM berada dalam jaringan yang sama dengan host.
- Pada **Name**, pilih adapter jaringan yang digunakan di host OS Windows (misalnya, Wi-Fi atau Ethernet).

**[Gambar Step 1: Pengaturan Network di VirtualBox]**

> **Catatan:** Pastikan VM dalam kondisi mati saat mengubah pengaturan jaringan ini. Restart VM setelahnya.

---

## Langkah 2: Perbarui Paket Sistem

Setelah VM menyala kembali, buka terminal di Ubuntu dan jalankan perintah berikut untuk memperbarui sistem:

```bash
sudo apt update && sudo apt upgrade -y
```

**[Gambar Step 2: Proses Update di Terminal Ubuntu]**

---

## Langkah 3: Install Apache Web Server

Instal paket Apache Web Server di Ubuntu dengan perintah:

```bash
sudo apt install -y apache2
```

**[Gambar Step 3: Instalasi Apache Web Server]**

---

## Langkah 4: Ubah Isi File HTML

Setelah Apache terinstal, buka direktori web server dan ubah file HTML default:

```bash
sudo nano /var/www/html/index.html
```

Gantilah isi file `index.html` dengan informasi nama kelompok dan anggota-anggotanya. Berikut contoh isi yang bisa Anda gunakan:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nama Kelompok</title>
</head>
<body>
    <h1>Nama Kelompok: Kelompok 1</h1>
    <h2>Anggota:</h2>
    <ul>
        <li>Anggota 1: Harsya Brahmantyo Wibowo</li>
        <li>Anggota 2: Melati</li>
        <li>Anggota 3: Anggota Lain</li>
    </ul>
</body>
</html>
```

Setelah selesai, tekan `CTRL + X`, kemudian `Y`, dan tekan `Enter` untuk menyimpan perubahan.

**[Gambar Step 4: Edit File HTML di Terminal]**

---

## Langkah 5: Verifikasi Web Server

Periksa apakah Apache berjalan dengan baik:

```bash
sudo systemctl status apache2
```

Jika statusnya **aktif (running)**, berarti Apache Web Server sudah siap.

**[Gambar Step 5: Status Layanan Apache]**

---

## Langkah 6: Akses Web Server dari Browser di Windows

Untuk mengakses web server dari browser di host OS (Windows), catat alamat IP VM Ubuntu dengan perintah:

```bash
hostname -I
```

Catat alamat IP yang ditampilkan (biasanya yang pertama) untuk digunakan pada langkah berikutnya.

1. Buka **Browser** di host Windows.
2. Masukkan alamat IP Ubuntu di bilah alamat browser:

   ```
   http://<alamat_ip_ubuntu>
   ```

   Gantilah `<alamat_ip_ubuntu>` dengan alamat IP yang dicatat.

3. Jika semuanya berjalan dengan baik, Anda akan melihat halaman web dengan nama kelompok dan daftar anggota.

**[Gambar Step 6: Akses Web Server di Browser]**

---

## Langkah 7: Mengatur Firewall (Opsional)

Jika Anda menggunakan firewall di VM, pastikan port 80 (untuk HTTP) diizinkan:

```bash
sudo ufw allow 80/tcp
```

Jika firewall belum diaktifkan, Anda bisa mengaktifkannya dengan:

```bash
sudo ufw enable
```

**[Gambar Step 7: Konfigurasi Firewall untuk Akses HTTP]**

---

## Troubleshooting

Jika mengalami masalah dalam mengakses halaman web, coba langkah-langkah berikut:

- Pastikan Apache berjalan dengan perintah `sudo systemctl status apache2`.
- Verifikasi alamat IP VM Ubuntu dengan perintah `hostname -I`.
- Pastikan pengaturan jaringan VM di VirtualBox diatur ke **Bridged Adapter**.
- Periksa apakah firewall pada VM mengizinkan akses ke port 80.

---
