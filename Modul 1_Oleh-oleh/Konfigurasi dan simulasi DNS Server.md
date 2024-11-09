
# Setup DNS Server di Ubuntu 22.04 (VirtualBox VM)

Panduan ini memberikan langkah-langkah untuk menginstal dan mengkonfigurasi DNS Server menggunakan **BIND9** di Ubuntu 22.04 yang dijalankan sebagai Virtual Machine di VirtualBox, serta cara mengaksesnya dari browser di host OS Windows.

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

## Langkah 3: Install BIND9, resolvconf, dan dnsutils

Instal paket **BIND9** untuk DNS server, **resolvconf** untuk konfigurasi resolusi nama, dan **dnsutils** untuk alat-alat pengujian DNS dengan perintah berikut:

```bash
sudo apt install bind9 resolvconf dnsutils -y
```

**[Gambar Step 3: Instalasi BIND9, resolvconf, dnsutils]**

---

## Langkah 4: Masuk ke Direktori Bind

Setelah instalasi selesai, masuk ke direktori konfigurasi BIND:

```bash
cd /etc/bind
```

---

## Langkah 5: Salin File Konfigurasi untuk Forward Zone dan Reverse Zone

Salin file konfigurasi `db.local` untuk forward zone dan `db.127` untuk reverse zone dengan perintah:

```bash
sudo cp db.local namamu.com && sudo cp db.127 namamu.com.reverse
```

Gantilah `namamu.com` dengan nama domain yang Anda inginkan.

**[Gambar Step 5: Salin File Konfigurasi]**

---

## Langkah 6: Edit File Forward Zone

Buka file forward zone yang telah Anda salin:

```bash
sudo nano namamu.com
```

Tambahkan **NS Record** dan **A Record** untuk mengarahkan domain ke IP Anda. Berikut adalah contoh konfigurasi yang harus ditambahkan:

```
@       IN      NS      namamu.com.
@       IN      A       192.168.10.188
```

Setelah selesai, tekan `CTRL + X`, kemudian `Y`, dan tekan `Enter` untuk menyimpan perubahan.

**[Gambar Step 6: Edit File Forward Zone]**

---

## Langkah 7: Edit File Reverse Zone

Buka file reverse zone yang telah Anda salin:

```bash
sudo nano namamu.com.reverse
```

Tambahkan **PTR Record** untuk mengarahkan IP ke domain. Berikut adalah contoh konfigurasi:

```
188     IN      PTR     namamu.com.
```

Setelah selesai, tekan `CTRL + X`, kemudian `Y`, dan tekan `Enter` untuk menyimpan perubahan.

**[Gambar Step 7: Edit File Reverse Zone]**

---

## Langkah 8: Tambahkan Forward dan Reverse Zone pada Konfigurasi BIND

Buka file konfigurasi **named.conf.local** dan tambahkan zone untuk domain dan reverse zone:

```bash
sudo nano /etc/bind/named.conf.local
```

Tambahkan konfigurasi berikut di bawah bagian **zone**:

```
zone "namamu.com" {
    type master;
    file "/etc/bind/namamu.com";
};

zone "10.168.192.in-addr.arpa" {
    type master;
    file "/etc/bind/namamu.com.reverse";
};
```

Setelah selesai, simpan dan keluar dengan menekan `CTRL + X`, lalu tekan `Y`, dan tekan `Enter`.

**[Gambar Step 8: Edit named.conf.local]**

---

## Langkah 9: Restart Layanan BIND9

Restart layanan **BIND9** agar perubahan yang dilakukan diterapkan:

```bash
sudo systemctl restart bind9
```

---

## Langkah 10: Konfigurasi Resolusi Nama

Buka file **resolv.conf** dan tambahkan DNS server yang baru diatur:

```bash
sudo nano /etc/resolv.conf
```

Tambahkan baris berikut (ganti `192.168.10.188` dengan IP server DNS Anda):

```
nameserver 192.168.10.188
```

Simpan dan keluar dengan menekan `CTRL + X`, lalu tekan `Y`, dan tekan `Enter`.

**[Gambar Step 10: Edit resolv.conf]**

---

## Menguji DNS Server di Ubuntu 22.04

### Menggunakan `nslookup`

Uji DNS Server dengan perintah `nslookup`:

```bash
nslookup namamu.com
```

Jika DNS server berfungsi dengan benar, Anda akan melihat IP address yang sesuai dengan domain yang telah Anda atur.

**[Gambar Step 11: Test nslookup di Ubuntu]**

### Mengakses Domain melalui Web Browser

Buka browser di Ubuntu dan masukkan domain yang sudah diatur (`namamu.com`). Anda harus bisa mengaksesnya.

**[Gambar Step 12: Akses Domain di Browser Ubuntu]**

---

## Menguji DNS Server pada Host OS (Windows)

### Menambahkan Domain ke File Hosts di Windows

Agar dapat mengakses domain dari host OS (Windows), Anda perlu menambahkan entri di file hosts.

1. Buka **Notepad** sebagai **Administrator**.
2. Buka file hosts yang terletak di **C:\Windows\System32\drivers\etc\hosts**.
3. Tambahkan baris berikut ke file hosts (ganti `192.168.10.188` dengan alamat IP server DNS Anda):

   ```
   192.168.10.188   namamu.com
   ```

4. Simpan perubahan dan tutup file.

**[Gambar Step 13: Edit File Hosts di Windows]**

---

### Mengakses Domain melalui Web Browser di Windows

Setelah file hosts diperbarui, buka browser di Windows dan masukkan domain yang sudah Anda atur (`namamu.com`). Anda harus bisa mengaksesnya.

**[Gambar Step 14: Akses Domain di Browser Windows]**

---

## Troubleshooting

Jika mengalami masalah dalam mengakses DNS atau domain, coba langkah-langkah berikut:

- Pastikan layanan **BIND9** berjalan dengan perintah `sudo systemctl status bind9`.
- Verifikasi konfigurasi **named.conf.local** dan file zone di direktori **/etc/bind/**.
- Pastikan firewall di VM dan di Windows tidak memblokir port DNS (port 53).
- Cek pengaturan jaringan pada VirtualBox, pastikan menggunakan **Bridged Adapter**.

---
