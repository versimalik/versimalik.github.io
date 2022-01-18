# Langkah kedelapan - SQL Constraint untuk mengatur rule pada column

> Note: Pastikan sudah pernah membaca [Langkah ketujuh](/steps/langkah7.md) agar bisa memahami langkah kedelapan ini.

`SQL Constraint` digunakan untuk menentukan rule pada data di dalam table. Selebihnya bisa baca dari sumber [w3schools.com](https://www.w3schools.com/sql/sql_constraints.asp).

Contoh, pada saat membuat table baru seperti pada [Langkah keempat](/steps/langkah4.md), kita pasti menentukan `constraint` untuk masing masing `column`

```sql
CREATE TABLE admin(
    id INT(10) NOT NULL,
    nama VARCHAR(20) NOT NULL,
    jk INT(1) NOT NULL,
    ...
    ...
    ...

);
```
Column `id`, `nama`, dan `jk` memiliki `constraint` berupa `NOT NULL`, artinya rule pada `column` tersebut adalah `tidak boleh kosong`.

Maka, jika sebuah data `admin` diinput namun `nama`nya ternyata kosong / `NULL`, secara otomatis data tersebut akan ditolak oleh table `admin`, karena terdapat `constraint` `NOT NULL` pada column `nama`.
___

`SQL constraint` juga bisa digunakan untuk menentukan `FOREIGN KEY` pada column.

Berikut adalah format syntax SQL untuk menambahkan constraint `FOREIGN KEY` pada column suatu table yang sudah jadi.

```sql
ALTER TABLE table_child
ADD CONSTRAINT nama_foreign_key
FOREIGN KEY(column_table_child)
REFERENCES table_parent (column_table_parent);
ON UPDATE CASCADE
ON DELETE CASDACE
;
```
|Keterangan|Penjelasan|
|-|-|
|table_child|`table` yang dijadikan `child`|
|nama_foreign_key|nama foreign key yg ingin kita buat|
|column_table_child|nama column yang ingin kita jadikan foreign key|
|table_parent|`table` yang dijadikan `parent`|
|column_table_parent|column yang menjadi data sumber untuk foreign key|
|ON UPDATE|jika nilai column pada table parent diupdate, maka:<br/><br/>`NO ACTION`: nilai column `foreign key` pada table child akan dibiarkan<br/>`CASCADE`: nilai column `foreign key` pada table child akan diupdate juga<br/>`SET NULL`: nilai column `foreign key` pada table child akan dijadikan `NULL`<br/>`RESTRICT`: proses tersebut akan ditolak selama masih memiliki relasi dengan column pada table `child`|
|ON UPDATE|jika nilai column pada table parent dihapus, maka:<br/><br/>`NO ACTION`: nilai column `foreign key` pada table child akan dibiarkan<br/>`CASCADE`: nilai column `foreign key` pada table child akan dihapus juga<br/>`SET NULL`: nilai column `foreign key` pada table child akan dijadikan `NULL`<br/>`RESTRICT`: proses tersebut akan ditolak selama masih memiliki relasi dengan column pada table `child`|


## Kesimpulan
Untuk merelasikan suatu table ke table lain, maka harus ditentukan table mana yang berperan sebagai `parent` dan table mana yang berperan sebagai `child`.

Setelah itu, kita akan menentukan column mana yang akan kita jadikan `FOREIGN KEY` pada table `child`, yang datanya bersumber dari `PRIMARY KEY` pada table `parent`.

### [Lanjut ke Langkah kesembilan - Menambahkan constraint foreign key pada column dalam tabel admin, guru dan siswa](/steps/langkah9.md)