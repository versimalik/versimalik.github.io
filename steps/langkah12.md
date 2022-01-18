# Langkah keduabelas - Menambahkan constraint foreign key pada column dalam tabel jawaban dan komentar

> Note: tahap ini merupakan lanjutan dari [langkah kesembilan](/steps/langkah9.md) sampai dengan [langkah kesebelas](/steps/langkah11.md)

## Foreign key pada table jawaban

![Relasi antar table jawaban, tugas dan users](/images/image18.png)

|No|Column|References|
|-|-|-|
|1|`idTugas`|`id` pada table `tugas`|
|2|`dibuatOleh`|`username` pada table `users`|

Maka syntax SQL yang akan kita gunakan untuk No. 1 pada table `jawaban`
```sql
ALTER TABLE jawaban
ADD CONSTRAINT fk_jawaban_idTugas
FOREIGN KEY(idTugas)
REFERENCES tugas(id)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
Maka syntax SQL yang akan kita gunakan untuk No. 2 pada table `jawaban`
```sql
ALTER TABLE jawaban
ADD CONSTRAINT fk_jawaban_dibuatOleh
FOREIGN KEY(dibuatOleh)
REFERENCES users(username)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
___
## Foreign key pada table komentar

![Relasi antar table komentar, materi, tugas, posting dan users](/images/image19.png)

|No|Column|References|
|-|-|-|
|1|`idTugas`|`id` pada table `tugas`|
|2|`idMateri`|`id` pada table `materi`|
|3|`idPosting`|`id` pada table `posting`|
|4|`dibuatOleh`|`username` pada table `users`|

Maka syntax SQL yang akan kita gunakan untuk No. 1 pada table `komentar`
```sql
ALTER TABLE komentar
ADD CONSTRAINT fk_komentar_idTugas
FOREIGN KEY(idTugas)
REFERENCES tugas(id)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
Maka syntax SQL yang akan kita gunakan untuk No. 2 pada table `komentar`
```sql
ALTER TABLE komentar
ADD CONSTRAINT fk_komentar_idMateri
FOREIGN KEY(idMateri)
REFERENCES materi(id)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
Maka syntax SQL yang akan kita gunakan untuk No. 3 pada table `komentar`
```sql
ALTER TABLE komentar
ADD CONSTRAINT fk_komentar_idPosting
FOREIGN KEY(idPosting)
REFERENCES posting(id)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
Maka syntax SQL yang akan kita gunakan untuk No. 4 pada table `komentar`
```sql
ALTER TABLE komentar
ADD CONSTRAINT fk_komentar_dibuatOleh
FOREIGN KEY(dibuatOleh)
REFERENCES users(username)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
___
Setelah semua table direlasikan, silahkan cek daftar foreign key yang sudah dibut dengan cara mengetikkan perintah ini
```sql
SELECT 
  TABLE_NAME AS `Nama Table`,
  COLUMN_NAME AS `Nama Column`,
  CONSTRAINT_NAME AS `Nama Constraint`
  REFERENCED_TABLE_NAME AS `Table Sumber`
  REFERENCED_COLUMN_NAME AS `Column Sumber`
FROM
  INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
  REFERENCED_TABLE_SCHEMA = 'sekola';
```
## Kesimpulan
Sampai dengan tahap ini, pembuatan database, pembuatan table, merelasikan table sampai dengan penambahan constraint foreign key, dianggap sudah selesai.

Jangan ragu untuk membaca dan mempraktekkan ulang ke langkah sebelumnya, jika masih ada yang kurang dipahami.

### [Lanjut ke Langkah ketigabelas - Prinsip dasar cara kerja website](/steps/langkah13.md)