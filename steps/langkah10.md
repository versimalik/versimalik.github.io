# Langkah kesembilan - Menambahkan constraint foreign key pada column dalam tabel admin, guru dan siswa

> Note: tahap ini merupakan lanjutan dari [langkah kesembilan](/steps/langkah9.md).

## Foreign key pada table kelas

![Relasi antar table kelas, guru dan users](/images/image13.png)

|No|Column|References|
|-|-|-|
|1|`idGuru`|`id` pada table `guru`|
|2|`dibuatOleh`|`username` pada table `users`|

Maka syntax SQL yang akan kita gunakan untuk No. 1 pada table `kelas`
```sql
ALTER TABLE kelas
ADD CONSTRAINT fk_kelas_idGuru
FOREIGN KEY(idGuru)
REFERENCES guru(id)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
Syntax SQL yang akan kita gunakan untuk No. 2 pada table `kelas`
```sql
ALTER TABLE kelas
ADD CONSTRAINT fk_kelas_dibuatOleh
FOREIGN KEY(dibuatOleh)
REFERENCES users(username)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
___

## Foreign key pada table distKelas

![Relasi antar table distKelas, kelas, siswa](/images/image14.png)

|No|Column|References|
|-|-|-|
|1|`idKelas`|`id` pada table `kelas`|
|2|`nisSiswa`|`nis` pada table `siswa`|

Maka syntax SQL yang akan kita gunakan untuk No. 1 pada table `distKelas`
```sql
ALTER TABLE distKelas
ADD CONSTRAINT fk_distKelas_idKelas
FOREIGN KEY(idKelas)
REFERENCES kelas(id)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
Syntax SQL yang akan kita gunakan untuk No. 2 pada table `distKelas`
```sql
ALTER TABLE distKelas
ADD CONSTRAINT fk_distKelas_nisSiswa
FOREIGN KEY(nisSiswa)
REFERENCES siswa(nis)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
___

### [Lanjut ke Langkah kesebelas - Menambahkan constraint foreign key pada column dalam tabel materi, tugas dan posting](/steps/langkah11.md)