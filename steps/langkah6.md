# Langkah keenam - Membuat table users

> Note: Pastikan sudah login ke `mysql` seperti yang sudah dijelaskan pada [Langkah ketiga](/steps/langkah3.md) dan sudah masuk ke database `sekola` seperti tahap awal pada [Langkah keempat](/steps/langkah4.md).
>
> [Langkah ketiga](/steps/langkah3.md) sampai dengan langkah keenam, merupakan satu rangkaian pembuatan database `sekola`. Disarankan untuk tetap ikuti urutan langkahnya.

## Membuat table admin
Sesuai dengan gambar desain database pada [Langkah ketiga](/steps/langkah3.md), table `users` memiliki deskripsi sebagai berikut:

`Table: users`
|No|Field|Data Type|Keterangan|
|-|-|-|-|
|1|username|INT(10)| Primary Key dari table `users`, Tidak boleh kosong|
|2|password|TEXT|Tidak boleh kosong|
|3|role|VARCHAR(10)|Sebagai penanda jika username ini dimiliki oleh `admin`, `guru`, atau `siswa`, Tidak boleh kosong|

Syntax untuk membuat table `admin` adalah 
```sql
CREATE TABLE users(
    username VARCHAR(10) NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(10) NOT NULL,
    PRIMARY KEY (username)
);
```

## Kesimpulan
Dari [Langkah ketiga](/steps/langkah3.md) sampai dengan langkah keenam, kita sudah bisa membuat database `sekola` dan table - table yang dibutuhkan sesuai dengan rancangan yang sudah dibuat.

Database ini kita butuhkan sebagau sumber dan tempat menyimpan data dari aplikasi yan akan kita buat.

### [Lanjut ke Langkah ketujuh - Relasi antar table dan penerapan foreign key](/steps/langkah7.md)
