# Langkah kedua - Membuat rancangan database untuk aplikasi

Sebuah aplikasi, tidak bisa dikerjakan tanpa adanya perencanaan dan perancangan.

Menurut pengalaman kami, yang menjadi nyawa dari sebuah aplikasi web dinamis adalah `database`.

`Database` merupakan kumpulan data yang terorganisir, yang umumnya disimpan dan diakses secara elektronik dari suatu sistem komputer. Sumber: [Wikipedia](https://id.wikipedia.org/wiki/Pangkalan_data).

Apapun yang kita lihat di dalam sebuah aplikasi, entah itu nama aplikasi, logo, daftar menu, bahkan sampai harga barang pada aplikasi online shop, data tersebut berasal dari `database`.

> Sederhananya,  `database` merupakan `sumber data` dan tempat dimana `data` harus disimpan.

Oleh karena itu, merancang sebuah `database` merupakan hal yang penting untuk dilakukan pada tahap - tahap awal membuat sebuah aplikasi.

## Aplikasi sekola
Mari kita beri nama aplikasi ini dengan nama `sekola`.

Agar dapat merancang sebuah `database`, kita harus menentukan:
1. Apa saja yang akan terlibat dalam aplikasi ini?
    * `Admin`, sebagai pengelola aplikasi sekola
    * `Guru`, sebagai wali dari `Kelas` dan pengajar `Mata Pelajaran`.
    * `Siswa`, sebagai pelajar di `Kelas`.
    * `Kelas`, sebagai tempat KBM(Kegiatan Belajar Mengajar) berlangsung. `Guru` akan mengajar sesuai `Mata Pelajaran` ke `Siswa`
    * `Tugas`, sebagai tugas yang akan diberikan oleh `Guru` ke `Siswa` sesuai dengan `Kelas` dan `Mata Pelajaran`.
    * `Jawaban`, sebagai jawaban yang diberikan oleh siswa ke dalam `Tugas` yang diberikan oleh `Guru`.
    * `Materi`, sebagai materi yang akan diberikan oleh `Guru` ke `Siswa` sesuai dengan `Kelas` dan `Mata Pelajaran`.
    * `Posting`, sebagai pengumuman yang akan diberikan oleh `Guru` ke `Siswa` sesuai dengan `Kelas` dan `Mata Pelajaran`.
    * `Komentar`, sebagai komentar yang akan diberikan oleh `Guru` dan `Siswa` di setiap `Tugas`, `Materi`, `Posting` sesuai dengan `Kelas` dan `Mata Pelajaran`.
2. Aktivitas apa saja yang dapat dilakukan dalam aplikasi sekola?
    * Ketika login sebagai `Admin`
        * `Admin` membuat, melihat, mengedit dan menghapus `Kelas`
        * `Admin` membuat, melihat, mengedit dan menghapus `Guru`
        * `Admin` membuat, melihat, mengedit dan menghapus `Siswa`
        * `Admin` membuat, melihat, mengedit dan menghapus `Tugas`
        * `Admin` membuat, melihat, mengedit dan menghapus `Materi`
        * `Admin` membuat, melihat, mengedit dan menghapus `Posting`
    *  Ketika login sebagai `Guru`.
        * `Guru` membuat, melihat, mengedit dan menghapus `Kelas`
        * `Guru` membuat, melihat, mengedit dan menghapus `Tugas`
        * `Guru` membuat, melihat, mengedit dan menghapus `Materi`
        * `Guru` membuat, melihat, mengedit dan menghapus `Posting`
        * `Guru` membuat, melihat, dan menghapus `Komentar`
        * `Guru` menilai (membuat nilai) untuk `Tugas` yang dikerjakan oleh `Siswa`
     * Ketika login sebagai `Siswa`.
        * `Siswa` membuat, melihat, mengedit dan menghapus `Jawaban` untuk `Tugas` dari `Guru` di `Kelas`
        * `Siswa` membuat, melihat, dan menghapus `Komentar` untuk `Tugas` dari `Guru` di `Kelas`
        * `Siswa` membuat, melihat, dan menghapus `Komentar` untuk `Materi` dari `Guru` di `Kelas`
        * `Siswa` membuat, melihat, dan menghapus `Komentar` untuk `Posting` dari `Guru` di `Kelas`

> Note: Sebuah aplikasi harus menerapkan konsep CRUD (CREATE, READ, UPDATE, DELETE)
> - CREATE = Membuat, menginput, memposting dan aktivitas sejenisnya
> - READ = Membaca, menampilkan, memunculkan dan aktivitas sejenisnya
> - UPDATE = Memperbarui, mengedit dan aktivitas sejenisnya
> - DELETE = Menghapus, membuang dan aktivitas sejenisnya

## Desain database
Dari deskripsi di atas, maka kita bisa menentukan tabel apa saja yang harus kita buat dan harus seperti apa strukrurnya. Berikut adalah gambar dari desain database yang akan kita terapkan.

![Desain database sekola tanpa relasi](/images/image6.png)

### Keterangan table pada database sekola

|No|Nama Table|Keterangan|
|---|----------|----------|
|1|`siswa`|Berisi data siswa|
|2|`kelas`|Berisi data kelas|
|3|`distKelas`|Berisi data distribusi kelas atau penempatan `siswa` di dalam `kelas` masing masing|
|4|`guru`|Berisi data guru|
|5|`tugas`|Berisi data tugas yang ada dalam `kelas`|
|6|`materi`|Berisi data materi yang ada dalam `kelas`|
|7|`posting`|Berisi data posting / pengumuman yang ada dalam `kelas`|
|8|`komentar`|Berisi data komentar yang ada pada `tugas`, `materi` atau `posting` pada `kelas`|
|9|`jawaban`|Berisi data jawaban `siswa` yang ada dalam `tugas`|
|10|`users`|Berisi data username dan password untuk login yang disertai role atau peran dari masing masing username untuk membedakan apakah dia `admin`, `siswa` atau `guru`|
|11|`admin`|Berisi data admin|


## Kesimpulan
Pada tahap ini, kita sudah memahami desain database merupakan hal yang penting sebelum membuat proses dan tampilan websitenya. Penentuan desain database bisa diambil dari:
* Siapa dan apa saja yang terlibat dalam aplikasi yang akan kita buat.
* Aktivitas apa saja yang dapat dilakukan dalam aplikasi ini.

### [Lanjut ke Langkah ketiga - Membuat database baru melalui CLI (Command Line Interface)](/steps/langkah3.md)