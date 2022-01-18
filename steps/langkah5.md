# Langkah kelima - Membuat table materi, tugas, posting, jawaban dan komentar

> Note: Pastikan sudah login ke `mysql` seperti yang sudah dijelaskan pada [Langkah ketiga](/steps/langkah3.md) dan sudah masuk ke database `sekola` seperti tahap awal pada [Langkah keempat](/steps/langkah4.md).

## Membuat table materi
Sesuai dengan gambar desain database pada [Langkah ketiga](/steps/langkah3.md), table `materi` memiliki deskripsi sebagai berikut:

`Table: materi`
|No|Field|Data Type|Keterangan|
|-|-|-|-|
|1|id|INT(10)| Primary Key dari table `materi`, Tidak boleh kosong|
|2|judul|TEXT|Tidak boleh kosong|
|3|deskripsi|TEXT|Tidak boleh kosong|
|4|lampiran|TEXT|Boleh kosong|
|5|idKelas|INT(10)|Foreign Key dari tabel `kelas`, Tidak boleh kosong|
|6|status|VARCHAR(10)|Sebagai penanda bahwa `materi` `masih aktif` atau `tidak aktif`, Tidak boleh kosong|
|7|dibuatOleh|VARCHAR(10)|agar terlacak siapa yg membuat data `materi` baru, Tidak boleh kosong|
|8|tglDibuat|DATETIME|agar terlacak kapan data `materi` baru dibuat, Tidak boleh kosong|

Syntax untuk membuat table `materi` adalah 
```sql
CREATE TABLE materi(
    id INT(10) NOT NULL,
    judul TEXT NOT NULL,
    deskripsi TEXT NOT NULL,
    lampiran TEXT,
    idKelas INT(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    dibuatOleh VARCHAR(10) NOT NULL,
    tglDibuat DATETIME NOT NULL,
    PRIMARY KEY (id)
);
```

## Membuat table tugas
Sesuai dengan gambar desain database pada [Langkah ketiga](/steps/langkah3.md), table `tugas` memiliki deskripsi sebagai berikut:

`Table: tugas`
|No|Field|Data Type|Keterangan|
|-|-|-|-|
|1|id|INT(10)| Primary Key dari table `tugas`, Tidak boleh kosong|
|2|judul|TEXT|Tidak boleh kosong|
|3|deskripsi|TEXT|Tidak boleh kosong|
|4|lampiran|TEXT|Boleh kosong|
|5|idKelas|INT(10)|Foreign Key dari tabel `kelas`, Tidak boleh kosong|
|6|status|VARCHAR(10)|Sebagai penanda bahwa `tugas` `masih aktif` atau `tidak aktif`, Tidak boleh kosong|
|7|dibuatOleh|VARCHAR(10)|agar terlacak siapa yg membuat data `tugas` baru, Tidak boleh kosong|
|8|tglDibuat|DATETIME|agar terlacak kapan data `tugas` baru dibuat, Tidak boleh kosong|

Syntax untuk membuat table `tugas` adalah 
```sql
CREATE TABLE tugas(
    id INT(10) NOT NULL,
    judul TEXT NOT NULL,
    deskripsi TEXT NOT NULL,
    lampiran TEXT,
    idKelas INT(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    dibuatOleh VARCHAR(10) NOT NULL,
    tglDibuat DATETIME NOT NULL,
    PRIMARY KEY (id)
);
```

## Membuat table posting
Sesuai dengan gambar desain database pada [Langkah ketiga](/steps/langkah3.md), table `posting` memiliki deskripsi sebagai berikut:

`Table: posting`
|No|Field|Data Type|Keterangan|
|-|-|-|-|
|1|id|INT(10)| Primary Key dari table `posting`, Tidak boleh kosong|
|2|teks|TEXT|Tidak boleh kosong|
|3|lampiran|TEXT|Boleh kosong|
|4|idKelas|INT(10)|Foreign Key dari tabel `kelas`, Tidak boleh kosong|
|5|status|VARCHAR(10)|Sebagai penanda bahwa `posting` `masih aktif` atau `tidak aktif`, Tidak boleh kosong|
|6|dibuatOleh|VARCHAR(10)|agar terlacak siapa yg membuat data `posting` baru, Tidak boleh kosong|
|7|tglDibuat|DATETIME|agar terlacak kapan data `posting` baru dibuat, Tidak boleh kosong|

Syntax untuk membuat table `posting` adalah 
```sql
CREATE TABLE posting(
    id INT(10) NOT NULL,
    teks TEXT NOT NULL,
    lampiran TEXT,
    idKelas INT(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    dibuatOleh VARCHAR(10) NOT NULL,
    tglDibuat DATETIME NOT NULL,
    PRIMARY KEY (id)
);
```

## Membuat table jawaban
Sesuai dengan gambar desain database pada [Langkah ketiga](/steps/langkah3.md), table `jawaban` memiliki deskripsi sebagai berikut:

`Table: jawaban`
|No|Field|Data Type|Keterangan|
|-|-|-|-|
|1|id|INT(10)| Primary Key dari table `tugas`, Tidak boleh kosong|
|2|teks|TEXT|Tidak boleh kosong|
|3|lampiran|TEXT|Boleh kosong|
|4|idTugas|INT(10)|Foreign Key dari tabel `tugas`, Tidak boleh kosong|
|5|nilai|DOUBLE|Boleh kosong|
|6|dibuatOleh|VARCHAR(10)|agar terlacak siapa yg membuat data `tugas` baru, Tidak boleh kosong|
|7|tglDibuat|DATETIME|agar terlacak kapan data `tugas` baru dibuat, Tidak boleh kosong|

Syntax untuk membuat table `jawaban` adalah 
```sql
CREATE TABLE jawaban(
    id INT(10) NOT NULL,
    teks TEXT NOT NULL,
    lampiran TEXT,
    idTugas INT(10) NOT NULL,
    nilai DOUBLE,
    dibuatOleh VARCHAR(10) NOT NULL,
    tglDibuat DATETIME NOT NULL,
    PRIMARY KEY (id)
);
```

## Membuat table komentar
Sesuai dengan gambar desain database pada [Langkah ketiga](/steps/langkah3.md), table `komentar` memiliki deskripsi sebagai berikut:

`Table: komentar`
|No|Field|Data Type|Keterangan|
|-|-|-|-|
|1|id|INT(10)| Primary Key dari table `komentar`, Tidak boleh kosong|
|2|teks|TEXT|Tidak boleh kosong|
|3|idTugas|INT(10)|Foreign Key dari tabel `tugas`, Boleh kosong|
|4|idMateri|INT(10)|Foreign Key dari tabel `materi`, Boleh kosong|
|5|idPosting|INT(10)|Foreign Key dari tabel `posting`, Boleh kosong|
|6|dibuatOleh|VARCHAR(10)|agar terlacak siapa yg membuat data `komentar` baru, Tidak boleh kosong|
|7|tglDibuat|DATETIME|agar terlacak kapan data `komentar` baru dibuat, Tidak boleh kosong|

Syntax untuk membuat table `komentar` adalah 
```sql
CREATE TABLE komentar(
    id INT(10) NOT NULL,
    teks TEXT NOT NULL,
    idTugas INT(10),
    idMateri INT(10),
    idPosting INT(10),
    dibuatOleh VARCHAR(10) NOT NULL,
    tglDibuat DATETIME NOT NULL,
    PRIMARY KEY (id)
);
```

### [Lanjut ke Langkah keenam - Membuat table users](/steps/langkah6.md)