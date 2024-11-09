
# Setup SSH Server di Ubuntu 22.04 (VirtualBox VM)

Panduan ini memberikan langkah-langkah detail untuk menginstal dan mengkonfigurasi Server SSH di Ubuntu 22.04 yang dijalankan sebagai Virtual Machine di VirtualBox, serta cara mengaksesnya dari host Windows 10 menggunakan CMD atau PowerShell.

---

## Prasyarat

- Mesin Virtual (VM) Ubuntu 22.04 yang sudah berjalan di VirtualBox.
- Host OS menggunakan Windows.
- Pengetahuan dasar tentang perintah di terminal Linux.
- Pastikan pengaturan jaringan VM sudah dikonfigurasi dengan benar (misalnya, Bridged Adapter).

---

## Langkah 1: Atur Jaringan VM di VirtualBox

Agar VM dapat diakses melalui SSH dari Windows, atur jaringan pada VirtualBox:

- Buka **VirtualBox**, pilih VM Ubuntu 22.04, lalu buka **Settings** > **Network**.
- Pada opsi **Attached to**, pilih **Bridged Adapter** agar VM berada dalam jaringan yang sama dengan host.
- Pada **Name**, pilih adapter jaringan yang digunakan di host OS Windows (misalnya, Wi-Fi atau Ethernet).

**[Gambar Step 1: Pengaturan Network di VirtualBox]**

> **Catatan:** Pastikan VM dalam kondisi mati saat mengubah pengaturan jaringan ini. Restart VM setelahnya.

---

## Langkah 2: Perbarui Paket Sistem

Setelah VM menyala kembali, buka terminal di Ubuntu dan jalankan:

```bash
sudo apt update && sudo apt upgrade -y
```

**[Gambar Step 2: Proses Update di Terminal Ubuntu]**

---

## Langkah 3: Install OpenSSH Server

Instal paket OpenSSH Server agar VM dapat menerima koneksi SSH:

```bash
sudo apt install -y openssh-server
```

**[Gambar Step 3: Instalasi OpenSSH Server]**

---

## Langkah 4: Aktifkan dan Mulai Layanan SSH

Setelah instalasi, aktifkan layanan SSH agar berjalan otomatis saat boot dan mulai layanan SSH:

```bash
sudo systemctl enable ssh
sudo systemctl start ssh
```

**[Gambar Step 4: Aktivasi dan Start Layanan SSH]**

---

## Langkah 5: Verifikasi Layanan SSH

Periksa apakah layanan SSH sudah berjalan dengan perintah:

```bash
sudo systemctl status ssh
```

Jika statusnya **aktif (running)**, berarti SSH Server sudah siap menerima koneksi.

**[Gambar Step 5: Status Layanan SSH]**

---

## Langkah 6: Izinkan Akses SSH pada Firewall

Jika firewall (`ufw`) diaktifkan di VM, izinkan koneksi SSH:

```bash
sudo ufw allow ssh
sudo ufw enable
```

- `allow ssh` membuka port 22 untuk SSH.
- `enable` mengaktifkan firewall jika belum aktif.

**[Gambar Step 6: Konfigurasi Firewall untuk Akses SSH]**

---

## Langkah 7: Periksa Alamat IP VM

Untuk mengakses SSH dari Windows, catat alamat IP VM dengan perintah berikut:

```bash
hostname -I
```

Catat alamat IP yang ditampilkan (biasanya yang pertama) untuk digunakan pada langkah berikutnya.

**[Gambar Step 7: Alamat IP VM Ubuntu]**

---

## Mengakses SSH dari CMD atau PowerShell di Windows 10

### Uji Koneksi dengan `ping`

Sebelum mencoba koneksi SSH, cek koneksi antara host dan VM menggunakan perintah `ping` di CMD atau PowerShell:

```bash
ping <alamat_ip_ubuntu>
```

**[Gambar Ping Test dari Windows]**

Jika koneksi berhasil, Anda akan menerima balasan dari IP VM.

### Remote dengan SSH

1. Buka **CMD** atau **PowerShell** di host Windows.
2. Masukkan perintah berikut untuk terhubung:

   ```bash
   ssh username@<alamat_ip_ubuntu>
   ```

   - Gantilah `username` dengan nama pengguna di VM Ubuntu.
   - Gantilah `<alamat_ip_ubuntu>` dengan alamat IP yang dicatat.

3. Saat diminta konfirmasi, ketik `yes` untuk menambahkan VM ke daftar known hosts.
4. Masukkan kata sandi pengguna Ubuntu jika diminta. Jika berhasil, Anda akan masuk ke sistem Ubuntu melalui SSH.

**[Gambar Step Menghubungkan SSH dari Windows]**

---

## Troubleshooting

Jika mengalami kendala dalam proses setup:

- Periksa status SSH dengan `sudo systemctl status ssh` di Ubuntu.
- Pastikan firewall di Ubuntu mengizinkan akses SSH.
- Verifikasi pengaturan jaringan VM di VirtualBox (gunakan **Bridged Adapter**).
- Pastikan alamat IP VM benar dan dapat di-ping dari host Windows.

---
