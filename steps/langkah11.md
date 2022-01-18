# Langkah kesebelas - Menambahkan constraint foreign key pada column dalam tabel materi, tugas dan posting

> Note: tahap ini merupakan lanjutan dari [langkah kesembilan](/steps/langkah9.md) dan [langkah kesepuluh](/steps/langkah10.md)

## Foreign key pada table materi

![Relasi antar table materi, kelas dan users](/images/image15.png)

|No|Column|References|
|-|-|-|
|1|`idKelas`|`id` pada table `kelas`|
|2|`dibuatOleh`|`username` pada table `users`|

Maka syntax SQL yang akan kita gunakan untuk No. 1 pada table `materi`
```sql
ALTER TABLE materi
ADD CONSTRAINT fk_materi_idKelas
FOREIGN KEY(idKelas)
REFERENCES kelas(id)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
Maka syntax SQL yang akan kita gunakan untuk No. 2 pada table `materi`
```sql
ALTER TABLE materi
ADD CONSTRAINT fk_materi_dibuatOleh
FOREIGN KEY(dibuatOleh)
REFERENCES users(username)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
___
## Foreign key pada table tugas

![Relasi antar table tugas, kelas dan users](/images/image16.png)

|No|Column|References|
|-|-|-|
|1|`idKelas`|`id` pada table `kelas`|
|2|`dibuatOleh`|`username` pada table `users`|

Maka syntax SQL yang akan kita gunakan untuk No. 1 pada table `tugas`
```sql
ALTER TABLE tugas
ADD CONSTRAINT fk_tugas_idKelas
FOREIGN KEY(idKelas)
REFERENCES kelas(id)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
Maka syntax SQL yang akan kita gunakan untuk No. 2 pada table `tugas`
```sql
ALTER TABLE tugas
ADD CONSTRAINT fk_tugas_dibuatOleh
FOREIGN KEY(dibuatOleh)
REFERENCES users(username)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
___
## Foreign key pada table posting

![Relasi antar table posting, kelas dan users](/images/image17.png)

|No|Column|References|
|-|-|-|
|1|`idKelas`|`id` pada table `kelas`|
|2|`dibuatOleh`|`username` pada table `users`|

Maka syntax SQL yang akan kita gunakan untuk No. 1 pada table `posting`
```sql
ALTER TABLE posting
ADD CONSTRAINT fk_posting_idKelas
FOREIGN KEY(idKelas)
REFERENCES kelas(id)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
Maka syntax SQL yang akan kita gunakan untuk No. 2 pada table `posting`
```sql
ALTER TABLE posting
ADD CONSTRAINT fk_posting_dibuatOleh
FOREIGN KEY(dibuatOleh)
REFERENCES users(username)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```

### [Lanjut ke Langkah keduabelas - Menambahkan constraint foreign key pada column dalam tabel jawaban dan komentar](/steps/langkah12.md)