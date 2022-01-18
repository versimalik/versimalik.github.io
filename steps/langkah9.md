# Langkah kesembilan - Menambahkan constraint foreign key pada column dalam tabel admin, guru dan siswa

> Note: untuk mengikuti tahap ini, harus sudah memahami konsep `RDBMS` pada [langkah ketujuh](/steps/langkah7.md) dan SQL Constraint pada [langkah kedelapan](/steps/langkah8.md).

## Foreign key pada table admin

![Relasi antar table admin dan users](/images/image10.png)

|No|Column|References|
|-|-|-|
|1|`username`|`usename` pada table `users`|
|2|`dibuatOleh`|`usename` pada table `users`|

Maka syntax SQL yang akan kita gunakan untuk No. 1 pada table `admin`
```sql
ALTER TABLE admin
ADD CONSTRAINT fk_admin_username
FOREIGN KEY(username)
REFERENCES users(username)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
Syntax SQL yang akan kita gunakan untuk No. 2 pada table `admin`
```sql
ALTER TABLE admin
ADD CONSTRAINT fk_admin_dibuatOleh
FOREIGN KEY(dibuatOleh)
REFERENCES users(username)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
___
## Foreign key pada table guru

![Relasi antar table guru dan users](/images/image11.png)

|No|Column|References|
|-|-|-|
|1|`username`|`usename` pada table `users`|
|2|`dibuatOleh`|`usename` pada table `users`|

Maka syntax SQL yang akan kita gunakan untuk No. 1 pada table `guru`
```sql
ALTER TABLE guru
ADD CONSTRAINT fk_guru_username
FOREIGN KEY(username)
REFERENCES users(username)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
Syntax SQL yang akan kita gunakan untuk No. 2 pada table `guru`
```sql
ALTER TABLE guru
ADD CONSTRAINT fk_guru_dibuatOleh
FOREIGN KEY(dibuatOleh)
REFERENCES users(username)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
___
## Foreign key pada table siswa

![Relasi antar table siswa dan users](/images/image12.png)

|No|Column|References|
|-|-|-|
|1|`username`|`usename` pada table `users`|
|2|`dibuatOleh`|`usename` pada table `users`|

Maka syntax SQL yang akan kita gunakan untuk No. 1 pada table `siswa`
```sql
ALTER TABLE siswa
ADD CONSTRAINT fk_siswa_username
FOREIGN KEY(username)
REFERENCES users(username)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
Syntax SQL yang akan kita gunakan untuk No. 2 pada table `siswa`
```sql
ALTER TABLE siswa
ADD CONSTRAINT fk_siswa_dibuatOleh
FOREIGN KEY(dibuatOleh)
REFERENCES users(username)
ON UPDATE CASCADE
ON DELETE NO ACTION;
```
___

### [Lanjut ke Langkah kesepuluh - Menambahkan constraint foreign key pada column dalam tabel kelas dan distKelas](/steps/langkah10.md)