
# Setup FTP Server di Ubuntu 22.04

Panduan ini memberikan langkah-langkah detail untuk menginstal dan mengkonfigurasi Server FTP menggunakan `vsftpd` di Ubuntu 22.04 serta cara mengaksesnya dari host Windows 10.

## Prasyarat
- Mesin Virtual (VM) Ubuntu 22.04 yang sudah berjalan.
- Pengetahuan dasar tentang perintah di terminal Linux.
- Pastikan pengaturan jaringan VM sudah dikonfigurasi dengan benar (misalnya, Bridged Adapter atau NAT).

## Langkah-langkah

### 1. Perbarui Daftar Paket

```bash
sudo apt update
```

![Step 1](./Assets/ftp%201.PNG)

### 2. Instal Paket `vsftpd`

```bash
sudo apt install vsftpd
```
![Step 2](./Assets/ftp%202.PNG)
### 3. Verifikasi Instalasi

Periksa apakah `vsftpd` telah terinstal dan berjalan.

```bash
vsftpd -version
sudo systemctl status vsftpd
```
![Step 3](./Assets/ftp%203.PNG)

### 4. Konfigurasi `vsftpd.conf`

Edit file konfigurasi `vsftpd`.

```bash
sudo nano /etc/vsftpd.conf
```
![Step 4](./Assets/ftp%204.PNG)
Di dalam file ini, atur konfigurasi berikut:

- Pastikan akses anonim dinonaktifkan dan akses pengguna lokal diaktifkan:

    ```conf
    anonymous_enable=NO
    local_enable=YES
    ```

- Aktifkan izin menulis untuk pengguna:

    ```conf
    write_enable=YES
    ```

- Batasi pengguna hanya pada direktori home mereka:

    ```conf
    chroot_local_user=YES
    ```

- Tambahkan dua baris berikut di akhir file untuk mengatur folder FTP di direktori home pengguna:

    ```conf
    user_sub_token=$USER
    local_root=/home/$USER/ftp
    ```

![Step 5](./Assets/ftp%205.PNG)
![Step 5](./Assets/ftp%206.PNG)


Untuk mengizinkan hanya pengguna tertentu yang mengakses server FTP, tambahkan konfigurasi berikut dibawah file conf:

```conf
userlist_enable=YES
userlist_file=/etc/vsftpd.user_list
userlist_deny=NO
```
![Step 5](./Assets/ftp%207.PNG)
```conf
“echo nama_user | sudo tee -a /etc/vsftpd.user_list”
```
Tambahkan nama pengguna yang diizinkan ke file `/etc/vsftpd.user_list`.

### 6. Simpan dan Keluar

Untuk menyimpan dan keluar, tekan `CTRL + X`, kemudian tekan `Y`, dan akhirnya `Enter`.

### 7. Restart Layanan `vsftpd`

```bash
sudo systemctl restart vsftpd
```

### 8. Konfigurasi Firewall

Izinkan lalu lintas FTP pada port 20 dan 21:

```bash
sudo ufw allow 20:21/tcp
```

Muat ulang aturan firewall dengan menonaktifkan dan mengaktifkan kembali `ufw`:

```bash
sudo ufw disable
sudo ufw enable
```
atau
```bash
sudo ufw reload
```

Verifikasi status firewall:

```bash
sudo ufw status
```
![Step 8](./Assets/ftp%208.PNG)
### 9. Tambahkan Pengguna FTP

Buat pengguna FTP baru (ganti `nama_user` dengan nama pengguna yang sebenarnya):

```bash
sudo adduser nama_user
```

Tambahkan pengguna ini ke file `/etc/vsftpd.user_list`:

```bash
echo nama_user | sudo tee -a /etc/vsftpd.user_list
```
![Step 9](./Assets/ftp%209.PNG)
### 10. Siapkan Direktori FTP dan Izin

Buat struktur direktori FTP dan atur izin. Ganti `ftpuser` dengan nama pengguna yang telah Anda buat pada langkah sebelumnya.

```bash
sudo mkdir -p /home/ftpuser/ftp/upload
sudo chmod 550 /home/ftpuser/ftp
sudo chmod 750 /home/ftpuser/ftp/upload
sudo chown -R ftpuser: /home/ftpuser/ftp
```
![Step 10](./Assets/ftp%2010.PNG)
### 11. Uji Server FTP

Buat file teks baru untuk mengonfirmasi pengaturan:

```bash
echo "nama saya..." | sudo tee /home/ftpuser/ftp/upload/nama.text
```
![Step 11](./Assets/ftp%2011.PNG)
## Mengakses FTP Server dari Windows 10

### Menggunakan File Explorer
1. Buka **File Explorer** di Windows 10.
2. Masukkan `ftp://<IP_ADDRESS_UBUNTU>` di bilah alamat dan tekan Enter.
   - Ganti `<IP_ADDRESS_UBUNTU>` dengan alamat IP dari VM Ubuntu Anda.
3. Masukkan nama pengguna FTP (`ftpuser`) dan kata sandi saat diminta.



### Menggunakan FTP Client (contoh: FileZilla)
1. Unduh dan instal [FileZilla](https://filezilla-project.org).
2. Buka **FileZilla** dan masukkan:
   - **Host**: `<IP_ADDRESS_UBUNTU>`
   - **Username**: `ftpuser`
   - **Password**: Kata sandi untuk pengguna FTP Anda
   - **Port**: `21`
3. Klik **Quickconnect** untuk terhubung ke server FTP.

![Step 12](./Assets/ftp%2012.PNG)

---

## Catatan
- **Konfigurasi Jaringan VM**: Pastikan jaringan VM Anda diatur ke **Bridged Adapter** agar lebih mudah diakses dari Windows. Jika menggunakan **NAT**, konfigurasi penerusan port mungkin diperlukan.
- **Pertimbangan Keamanan**: Untuk keamanan yang lebih baik, pertimbangkan menggunakan SSL/TLS untuk mengenkripsi koneksi FTP.

---

Ikuti langkah-langkah ini untuk berhasil mengatur dan mengakses FTP Server di Ubuntu 22.04
