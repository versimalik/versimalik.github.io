# Langkah ketigabelas - Prinsip dasar cara kerja website

> Note: Pembuatan database, table beseta relasinya dianggap sudah selesai. Pelajari dan praktikkan [Langkah kesatu](/steps/langkah1.md) sampai [Langkah keduabelas](/steps/langkah12.md).

Kita sudah sama sama mengetahui jika `database` merupakan `pangkalan data` dari sebuah `aplikasi`. Tapi tidak semua orang mengerti dan mau mengolah data langsung ke dalam database, karena langkah - langkahnya lumayan menyulitkan bagi sebagian orang.

Maka dibutuhkanlah sebuah sistem yang sering kita sebut sebagai `aplikasi`, agar setiap orang dapat mengolah data lebih mudah, tanpa harus belajas syntax sql terlebih dahulu.

Bahasa pemrograman `PHP` bisa digunakan untuk mengolah (mengambil, menyimpan, memperbarui, menghapus) data dalam database. Oleh karena itu, `PHP` disebut sebagai bahasa untuk `backend`, karena pekerjaannya dibalik layar.

Pengguna tidak bisa melihat proses apa yg sedang dilakukan oleh `PHP`, melainkan hanya bisa melihat output dari proses yg dihasilkan oleh `PHP`. Perhatikan gambar berikut:

![Konsep dasar cara kerja web](/images/image20.png)

Penjelasan tahapan:

1. Pengguna mengakses `www.sekola.com`, melalui jaringan internet
2. Script `PHP` pada aplikasi `www.sekola.com` melakukan proses sesuai dengan permintaan pengguna. Mengolah data dari database jika diperlukan.
3. Setelah data diolah pada sisi `backend`, web server merespon ke pengguna dengan mengirimkan tampilan dalam bentuk bahasa `HTML`, `CSS` dan `Javascript`, dan mereka disebut bahasa untuk `fronted`
4. Web browser pada sisi pengguna hanya menerima script website berupa `frontend`

### [Lanjut ke Langkah keempatbelas - Membuat aplikasi dengan PHP sebagai backend](/steps/langkah14.md)