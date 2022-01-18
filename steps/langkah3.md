# Langkah ketiga - Membuat database baru melalui CLI (Command Line Interface)

> Note: Mulai dari tahap ini sampai seterusnya, harus sudah mulai terbiasa dengan menyiapkan tools web programming seperti pada [Langkah pertama](/steps/langkah1.md) setiap kali ingin memulai ngoding.

## Membuka CLI (Command Line Interface)
* Jika menggunakan OS Windows, buka aplikasi `Command Prompt` atau yg dikenal dengan sebutan `cmd`, dengan akses `Run As Administrator`. Seperti pada gambar.

![cmd Run As Administrator!](/images/image7.png);
* Jika menggunakan OS Linux, buka aplikasi `terminal`.

## Login ke MySQL Server
* Jika menggunakan OS Windows ikuti perintah ini

masuk ke folder c:\xampp\mysql\bin\
```cmd
cd c:\xampp\mysql\bin\

```
login ke MySQL
```cmd
mysql.exe -u root -p

```
___

* Jika menggunakan OS Linux, ikuti perintah ini

```bash
mysql -u root -p

```
atau
```bash
sudo mysql -u root -p

```
___
dari perintah itu kita akan diminta untuk memasukkan password

```cmd
Enter password:
```
biarkan kosong dan tekan `Enter`.

> Note: Secara standar, login ke `mysql` bisa menggunakan user `root` dan tanpa password atau password kosong.

Berikut adalah tampilan saat berhasil login ke `mysql`
```
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 31
Server version: 10.5.12-MariaDB-0+deb11u1 Debian 11

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]>
```

## Membuat database sekola
Perintah sederhana untuk membuat database baru adalah
```sql
CREATE DATABASE nama_database;
```

Pada kasus ini kita akan membuat database baru dengan nama `sekola`, maka yang syntax yang dituliskan adalah
```sql
CREATE DATABASE sekola;
```
> Note: Jangan lupa titik koma (;)

## Kesimpulan
Pada tahap ini, kita sudah memahami jika membuat database baru bisa menggunakan CLI (Command Line Interface) dengan cara
* Login ke dalam server `mysql`
* Masukkan syntax `CREATE DATABASE nama_databse`, untuk membuat database baru

### [Lanjut ke Langkah keempat - Membuat table admin, guru, siswa, kelas dan distKelas](/steps/langkah4.md)