# Langkah ketujuh - Relasi antar table dan penerapan foreign key

> Note: pastikan [Langkah ketiga](/steps/langkah3.md) sampai dengan [Langkah keenam](/steps/langkah6.md) sudah dilakukan.

Table yang ada di dalam database bisa memiliki relasi terhadap table yang lain.

Pada tahap ini, kita sudah berada di level `RDBMS` (Relationship Database Management System). `RDBMS` digunakan untuk mengelola relasi atau hubungan antar table table yang ada di dalam database. Sumber [w3schools.com](https://w3schools.com/mysql/mysql_rdbms.asp)

Pada database `sekola` ini, kita harus mengelola relasi antar table-table yang ada, agar pengelolaan data lebih rapi.

## Relasi antar table
Contoh:

Table `admin` memiliki hubungan dengan table `users`.

>Setiap admin memiliki 1 data users (username dan password)
>
>maka hubungan kardinalitas antara entitas tersebut adalah one-to-one

Dalam table `admin`, terdapat field `username` yang sebenarnya berisi data yang sama dengan field `username` dalam table `users`. Perhatikan gambar berikut:

![Relasi antar table](/images/image9.png)

## Foreign Key

Table `users` menyimpan data `username` yang digunakan untuk login ke dalam aplikasi `sekola`, yang mana data `username` tersebut merupakan data yang dimiliki juga oleh `admin`, sehingga dalam table `admin` terdapat field `username` untuk menyimpan data `username` yang sama.

Berikut sampel data dari  table `admin` dan `users`:

`Sampel data pada table admin`
|id|nama|jk|agama|username|
|-|-|-|-|-|
|10001|Abdullah|1|Islam|abdullah12|
|10002|Abdurrahman|1|Islam|limapilar|

`Sampel data pada table users`
|username|password|role|
|-|-|-|
|abdullah12|oCheiphae4aev3phoTi|admin|
|limapilar|sahseehoeve5iethai2|admin|

Field `username` merupakan `PRIMARY KEY` pada table `users`

Kemudian field `username` juga terdapat pada table `admin`, sehingga kita bisa mengetahui siapa nama `admin` yang memiliki username `limapilar`.

>Oleh karena itu, field `username` pada table `admin` merupakan `FOREIGN KEY`, karena datanya bersumber dari table lain, dalam hal ini table `users`.

sehingga,
|Table|Peranan dalam relasi|
|-|-|
|`users`|parent, karena PRIMARY KEY `username` dipakai di table lain|
|`admin`|child, karena punya data `username` dari table `users`, sehingga field `username` pada table `admin` disebut `FOREIGN KEY`|

Jika table `admin` *tidak memiliki field `username`*, maka sistem tidak akan pernah mengetahui siapa pemilik akun `limapilar`.

## Kesimpulan
Karena database memiliki table yang banyak, maka harus dikelola dengan baik agar data tidak berantakan.

Pengelolaan data bisa dengan `RDBMS`, yaitu mengatur hubungan antar table dan menaruh `FOREIGN KEY` ke dalam sebuah table yang bersumber dari table lain, sehingga relasi antar table bisa terlihat jelas.

### [Lanjut ke Langkah kedelapan - SQL Constraint untuk mengatur rule pada column](/steps/langkah8.md)