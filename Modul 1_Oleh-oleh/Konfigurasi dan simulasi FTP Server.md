# Setup FTP Server di Ubuntu 22.04

Panduan ini memberikan langkah-langkah detail untuk menginstal dan mengkonfigurasi Server FTP menggunakan `vsftpd` di Ubuntu 22.04 serta cara mengaksesnya dari host Windows 10.

---

## Prasyarat
- Mesin Virtual (VM) Ubuntu 22.04 yang sudah berjalan.
- Pengetahuan dasar tentang perintah di terminal Linux.
- Pastikan pengaturan jaringan VM sudah dikonfigurasi dengan benar (misalnya, Bridged Adapter atau NAT).

---

## Langkah 1: Perbarui Paket Sistem
Buka terminal di VM Ubuntu Anda dan jalankan:
```bash
sudo apt update
```
**[Gambar Step 1 di sini]**

---

## Langkah 2: Instal `vsftpd`
Pasang paket `vsftpd` menggunakan:
```bash
sudo apt install -y vsftpd
```
**[Gambar Step 2 di sini]**

---

## Langkah 3: Cadangkan Konfigurasi Default
Buat salinan cadangan dari file konfigurasi `vsftpd.conf`:
```bash
sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.orig
```
**[Gambar Step 3 di sini]**

---

## Langkah 4: Buat Pengguna FTP Baru
Buat pengguna khusus untuk akses FTP:
```bash
sudo adduser --home /home/ftpuser --shell /usr/sbin/nologin ftpuser
```
- Ganti `ftpuser` dengan nama pengguna yang Anda inginkan.
- Anda akan diminta untuk memasukkan kata sandi dan informasi pengguna.

Atur izin yang benar untuk direktori home pengguna:
```bash
sudo chmod 755 /home/ftpuser
```
**[Gambar Step 4 di sini]**

---

## Langkah 5: Konfigurasi `vsftpd`
Edit file konfigurasi `vsftpd`:
```bash
sudo nano /etc/vsftpd.conf
```
**[Gambar Step 5 di sini]**

### Buat perubahan berikut:
1. Pastikan baris berikut diatur:
   ```
   listen=YES
   anonymous_enable=NO
   local_enable=YES
   write_enable=YES
   local_umask=022
   dirmessage_enable=YES
   use_localtime=YES
   xferlog_enable=YES
   connect_from_port_20=YES
   chroot_local_user=YES
   allow_writeable_chroot=YES
   ```

2. Tambahkan baris ini untuk membatasi akses FTP hanya untuk pengguna tertentu:
   ```
   userlist_enable=YES
   userlist_file=/etc/vsftpd.userlist
   userlist_deny=NO
   ```

Simpan dan tutup file:
- Tekan `CTRL + X`, kemudian `Y`, dan `Enter`.

**[Gambar Konfigurasi File di sini]**

---

## Langkah 6: Batasi Akses ke Pengguna FTP
Buat file `vsftpd.userlist` dan tambahkan pengguna FTP:
```bash
echo "ftpuser" | sudo tee -a /etc/vsftpd.userlist
```
- Ganti `ftpuser` dengan nama pengguna yang Anda buat.

**[Gambar Step 6 di sini]**

---

## Langkah 7: Mulai Ulang Layanan `vsftpd`
Mulai ulang layanan FTP untuk menerapkan perubahan:
```bash
sudo systemctl restart vsftpd
```

Aktifkan `vsftpd` agar mulai saat boot:
```bash
sudo systemctl enable vsftpd
```
**[Gambar Step 7 di sini]**

---

## Langkah 8: Konfigurasi Firewall
Izinkan lalu lintas FTP melalui firewall:
```bash
sudo ufw allow 21
```

Jika firewall belum diaktifkan, Anda dapat mengaktifkannya dengan:
```bash
sudo ufw enable
```
**[Gambar Step 8 di sini]**

---

## Mengakses FTP Server dari Windows 10

### Menggunakan File Explorer
1. Buka **File Explorer** di Windows 10.
2. Masukkan `ftp://<IP_ADDRESS_UBUNTU>` di bilah alamat dan tekan Enter.
   - Ganti `<IP_ADDRESS_UBUNTU>` dengan alamat IP dari VM Ubuntu Anda.
3. Masukkan nama pengguna FTP (`ftpuser`) dan kata sandi saat diminta.

**[Gambar File Explorer di sini]**

### Menggunakan FTP Client (contoh: FileZilla)
1. Unduh dan instal [FileZilla](https://filezilla-project.org).
2. Buka **FileZilla** dan masukkan:
   - **Host**: `<IP_ADDRESS_UBUNTU>`
   - **Username**: `ftpuser`
   - **Password**: Kata sandi untuk pengguna FTP Anda
   - **Port**: `21`
3. Klik **Quickconnect** untuk terhubung ke server FTP.

**[Gambar FileZilla di sini]**

---

## Catatan
- **Konfigurasi Jaringan VM**: Pastikan jaringan VM Anda diatur ke **Bridged Adapter** agar lebih mudah diakses dari Windows. Jika menggunakan **NAT**, konfigurasi penerusan port mungkin diperlukan.
- **Pertimbangan Keamanan**: Untuk keamanan yang lebih baik, pertimbangkan menggunakan SSL/TLS untuk mengenkripsi koneksi FTP.

---

Ikuti langkah-langkah ini untuk berhasil mengatur dan mengakses FTP Server di Ubuntu 22.04!
