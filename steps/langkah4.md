# Langkah keempat - Membuat table admin, guru, siswa, kelas dan distKelas

> Note: Pastikan sudah login ke `mysql` seperti yang sudah dijelaskan pada [Langkah ketiga](/steps/langkah3.md).
>
> cek apakah database `sekola` sudah dibuat atau belum dengan menuliskan perintah `SHOW DATABASES;`

Sebelum menambahkan table, kita harus masuk terlebih dahulu ke dalam databasenya, dengan perintah `USE nama_database;`, dalam kasus ini, maka kita ketikkan perintah

```sql
USE sekola;
```
## Format syntax membuat table baru dalam database
```sql
CREATE TABLE nama_table(
    field_ke_1 data_type_ke_1 constraint,
    field_ke_2 data_type_ke_2 constraint,
    field_ke_3 data_type_ke_3 constraint,
    . . . .
    field_ke_n data_type_ke_n constraint,
    PRIMARY KEY(field_ke_1)
);
```
Keterangan:
|||
|-|-|
|`nama_table`|merupakan nama table yang ingin dibuat|
|`field_ke_?`|merupakan nama field dalam table|
|`data_type_ke_?`|merupakan tipe data dari field|
|`PRIMARY KEY(field_ke_?)`|menentukan field mana yang akan dijadikan PRIMARY KEY|
|`constraint`|untuk mengatur rule pada data atau table, contoh mengatur agar field boleh kosong atau tidak boleh kosong|

## Membuat table admin
Sesuai dengan gambar desain database pada [Langkah ketiga](/steps/langkah3.md), table admin memiliki deskripsi sebagai berikut:

`Table: admin`
|No|Field|Data Type|Keterangan|
|-|-|-|-|
|1|id|INT(10)| Primary Key dari table `admin`, Tidak boleh kosong|
|2|nama|VARCHAR(20)|Tidak boleh kosong|
|3|jk|INT(1)|Jenis kelamin, diwakili oleh angka `0 untuk perampuan` atau `1 untuk laki-laki`, Tidak boleh kosong|
|4|agama|VARCHAR(10)|Tidak boleh kosong|
|5|alamat|TEXT|Tidak boleh kosong|
|6|noTelp|VARCHAR(15)|Tidak boleh kosong|
|7|email|VARCHAR(20)|Tidak boleh kosong|
|8|username|VARCHAR(10)|Tidak boleh kosong|
|9|status|VARCHAR(10)|Sebagai penanda bahwa `admin` `masih aktif` atau `tidak aktif`, Tidak boleh kosong|
|10|dibuatOleh|VARCHAR(10)|agar terlacak siapa yg membuat data `admin` baru, Tidak boleh kosong|
|11|tglDibuat|DATETIME|agar terlacak kapan data `admin` baru dibuat, Tidak boleh kosong|

Syntax untuk membuat table `admin` adalah 
```sql
CREATE TABLE admin(
    id INT(10) NOT NULL,
    nama VARCHAR(20) NOT NULL,
    jk INT(1) NOT NULL,
    agama VARCHAR(10) NOT NULL,
    alamat TEXT NOT NULL,
    noTelp VARCHAR(15) NOT NULL,
    email VARCHAR(20) NOT NULL,
    username VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    dibuatOleh VARCHAR(10) NOT NULL,
    tglDibuat DATETIME NOT NULL,
    PRIMARY KEY (id)
);
```

## Membuat table guru
Sesuai dengan gambar desain database pada [Langkah ketiga](/steps/langkah3.md), table guru memiliki deskripsi sebagai berikut:

`Table: guru`
|No|Field|Data Type|Keterangan|
|-|-|-|-|
|1|id|INT(10)| Primary Key dari table `guru`, Tidak boleh kosong|
|2|nama|VARCHAR(20)|Tidak boleh kosong|
|3|jk|INT(1)|Jenis kelamin, diwakili oleh angka `0 untuk perampuan` atau `1 untuk laki-laki`, Tidak boleh kosong|
|4|agama|VARCHAR(10)|Tidak boleh kosong|
|5|alamat|TEXT|Tidak boleh kosong|
|6|noTelp|VARCHAR(15)|Tidak boleh kosong|
|7|email|VARCHAR(20)|Tidak boleh kosong|
|8|username|VARCHAR(10)|Tidak boleh kosong|
|9|status|VARCHAR(10)|Sebagai penanda bahwa `guru` `masih aktif` atau `tidak aktif`, Tidak boleh kosong|
|10|dibuatOleh|VARCHAR(10)|agar terlacak siapa yg membuat data `guru` baru, Tidak boleh kosong|
|11|tglDibuat|DATETIME|agar terlacak kapan data `guru` baru dibuat, Tidak boleh kosong|

Syntax untuk membuat table `guru` adalah 
```sql
CREATE TABLE guru(
    id INT(10) NOT NULL,
    nama VARCHAR(20) NOT NULL,
    jk INT(1) NOT NULL,
    agama VARCHAR(10) NOT NULL,
    alamat TEXT NOT NULL,
    noTelp VARCHAR(15) NOT NULL,
    email VARCHAR(20) NOT NULL,
    username VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    dibuatOleh VARCHAR(10) NOT NULL,
    tglDibuat DATETIME NOT NULL,
    PRIMARY KEY (id)
);
```

## Membuat table siswa
Sesuai dengan gambar desain database pada [Langkah ketiga](/steps/langkah3.md), table siswa memiliki deskripsi sebagai berikut:

`Table: siswa`
|No|Field|Data Type|Keterangan|
|-|-|-|-|
|1|nis|INT(10)| Primary Key dari table `siswa`, Tidak boleh kosong|
|2|nama|VARCHAR(20)|Tidak boleh kosong|
|3|jk|INT(1)|Jenis kelamin, diwakili oleh angka `0 untuk perampuan` atau `1 untuk laki-laki`, Tidak boleh kosong|
|4|agama|VARCHAR(10)|Tidak boleh kosong|
|5|alamat|TEXT|Tidak boleh kosong|
|6|noTelp|VARCHAR(15)|Tidak boleh kosong|
|7|email|VARCHAR(20)|Tidak boleh kosong|
|8|username|VARCHAR(10)|Tidak boleh kosong|
|9|status|VARCHAR(10)|Sebagai penanda bahwa `siswa` `masih aktif` atau `tidak aktif`, Tidak boleh kosong|
|10|dibuatOleh|VARCHAR(10)|agar terlacak siapa yg membuat data `siswa` baru, Tidak boleh kosong|
|11|tglDibuat|DATETIME|agar terlacak kapan data `siswa` baru dibuat, Tidak boleh kosong|

Syntax untuk membuat table `siswa` adalah 
```sql
CREATE TABLE siswa(
    nis INT(10) NOT NULL,
    nama VARCHAR(20) NOT NULL,
    jk INT(1) NOT NULL,
    agama VARCHAR(10) NOT NULL,
    alamat TEXT NOT NULL,
    noTelp VARCHAR(15) NOT NULL,
    email VARCHAR(20) NOT NULL,
    username VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    dibuatOleh VARCHAR(10) NOT NULL,
    tglDibuat DATETIME NOT NULL,
    PRIMARY KEY (id)
);
```

## Membuat table kelas
Sesuai dengan gambar desain database pada [Langkah ketiga](/steps/langkah3.md), table kelas memiliki deskripsi sebagai berikut:

`Table: kelas`
|No|Field|Data Type|Keterangan|
|-|-|-|-|
|1|id|INT(10)| Primary Key dari table `siswa`, Tidak boleh kosong|
|2|nama|VARCHAR(20)|Tidak boleh kosong|
|3|deskripsi|TEXT|Tidak boleh kosong|
|4|idGuru|INT(10)|Sebagai foreign key dari table guru, Tidak boleh kosong|
|5|status|VARCHAR(10)|Sebagai penanda bahwa `siswa` `masih aktif` atau `tidak aktif`, Tidak boleh kosong|
|6|dibuatOleh|VARCHAR(10)|agar terlacak siapa yg membuat data `kelas` baru, Tidak boleh kosong|
|7|tglDibuat|DATETIME|agar terlacak kapan data `kelas` baru dibuat, Tidak boleh kosong|

Syntax untuk membuat table `kelas` adalah
```sql
CREATE TABLE kelas(
    id INT(10) NOT NULL,
    nama VARCHAR(20) NOT NULL,
    deskripsi TEXT NOT NULL,
    idGuru INT(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    dibuatOleh VARCHAR(10) NOT NULL,
    tglDibuat DATETIME NOT NULL,
    PRIMARY KEY (id)
);
```
## Membuat table distKelas
Sesuai dengan gambar desain database pada [Langkah ketiga](/steps/langkah3.md), table distKelas memiliki deskripsi sebagai berikut:

`Table: distKelas`

|No|Field|Data Type|Keterangan|
|-|-|-|-|
|1|idKelas|INT(10)| Foreign Key dari table `kelas`, Tidak boleh kosong|
|2|nisSiswa|INT(10)| Foreign Key dari table `siswa`, Tidak boleh kosong|

Syntax untuk membuat table `distKelas` adalah
```sql
CREATE TABLE distKelas(
    idKelas INT(10) NOT NULL,
    idSiswa INT(10) NOT NULL
);
```

### [Lanjut ke Langkah kelima - Membuat table materi, tugas, posting, jawaban dan komentar](/steps/langkah5.md)