-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Jan 2022 pada 00.44
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sekola`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `jk` int(1) NOT NULL,
  `agama` varchar(10) NOT NULL,
  `alamat` text NOT NULL,
  `noTelp` varchar(15) NOT NULL,
  `email` varchar(20) NOT NULL,
  `username` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `dibuatOleh` varchar(10) NOT NULL,
  `tglDibuat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `distkelas`
--

CREATE TABLE `distkelas` (
  `idKelas` int(10) NOT NULL,
  `nisSiswa` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `guru`
--

CREATE TABLE `guru` (
  `id` int(10) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `jk` int(1) NOT NULL,
  `agama` varchar(10) NOT NULL,
  `alamat` text NOT NULL,
  `noTelp` varchar(15) NOT NULL,
  `email` varchar(20) NOT NULL,
  `username` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `dibuatOleh` varchar(10) NOT NULL,
  `tglDibuat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jawaban`
--

CREATE TABLE `jawaban` (
  `id` int(10) NOT NULL,
  `teks` text NOT NULL,
  `lampiran` text DEFAULT NULL,
  `idTugas` int(10) NOT NULL,
  `nilai` double DEFAULT NULL,
  `dibuatOleh` varchar(10) NOT NULL,
  `tglDibuat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id` int(10) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `deskripsi` text NOT NULL,
  `idGuru` int(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `dibuatOleh` varchar(10) NOT NULL,
  `tglDibuat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `komentar`
--

CREATE TABLE `komentar` (
  `id` int(10) NOT NULL,
  `teks` text NOT NULL,
  `idTugas` int(10) DEFAULT NULL,
  `idMateri` int(10) DEFAULT NULL,
  `idPosting` int(10) DEFAULT NULL,
  `dibuatOleh` varchar(10) NOT NULL,
  `tglDibuat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `materi`
--

CREATE TABLE `materi` (
  `id` int(10) NOT NULL,
  `judul` text NOT NULL,
  `deskripsi` text NOT NULL,
  `lampiran` text DEFAULT NULL,
  `idKelas` int(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `dibuatOleh` varchar(10) NOT NULL,
  `tglDibuat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `posting`
--

CREATE TABLE `posting` (
  `id` int(10) NOT NULL,
  `teks` text NOT NULL,
  `lampiran` text DEFAULT NULL,
  `idKelas` int(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `dibuatOleh` varchar(10) NOT NULL,
  `tglDibuat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `siswa`
--

CREATE TABLE `siswa` (
  `nis` int(10) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `jk` int(1) NOT NULL,
  `agama` varchar(10) NOT NULL,
  `alamat` text NOT NULL,
  `noTelp` varchar(15) NOT NULL,
  `email` varchar(20) NOT NULL,
  `username` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `dibuatOleh` varchar(10) NOT NULL,
  `tglDibuat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tugas`
--

CREATE TABLE `tugas` (
  `id` int(10) NOT NULL,
  `judul` text NOT NULL,
  `deskripsi` text NOT NULL,
  `lampiran` text DEFAULT NULL,
  `idKelas` int(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `dibuatOleh` varchar(10) NOT NULL,
  `tglDibuat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `username` varchar(10) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_admin_username` (`username`),
  ADD KEY `fk_guru_dibuatOleh` (`dibuatOleh`);

--
-- Indeks untuk tabel `distkelas`
--
ALTER TABLE `distkelas`
  ADD KEY `fk_distKelas_idKelas` (`idKelas`),
  ADD KEY `fk_distKelas_nisSiswa` (`nisSiswa`);

--
-- Indeks untuk tabel `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_guru_username` (`username`),
  ADD KEY `fk_guru_dibuatOleh` (`dibuatOleh`);

--
-- Indeks untuk tabel `jawaban`
--
ALTER TABLE `jawaban`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_jawaban_idTugas` (`idTugas`),
  ADD KEY `fk_jawaban_dibuatOleh` (`dibuatOleh`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_kelas_idGuru` (`idGuru`),
  ADD KEY `fk_kelas_dibuatOleh` (`dibuatOleh`);

--
-- Indeks untuk tabel `komentar`
--
ALTER TABLE `komentar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_komentar_idTugas` (`idTugas`),
  ADD KEY `fk_komentar_idMateri` (`idMateri`),
  ADD KEY `fk_komentar_idPosting` (`idPosting`),
  ADD KEY `fk_komentar_dibuatOleh` (`dibuatOleh`);

--
-- Indeks untuk tabel `materi`
--
ALTER TABLE `materi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_materi_idKelas` (`idKelas`),
  ADD KEY `fk_materi_dibuatOleh` (`dibuatOleh`);

--
-- Indeks untuk tabel `posting`
--
ALTER TABLE `posting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_posting_idKelas` (`idKelas`),
  ADD KEY `fk_posting_dibuatOleh` (`dibuatOleh`);

--
-- Indeks untuk tabel `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`nis`),
  ADD KEY `fk_siswa_username` (`username`),
  ADD KEY `fk_siswa_dibuatOleh` (`dibuatOleh`);

--
-- Indeks untuk tabel `tugas`
--
ALTER TABLE `tugas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tugas_idKelas` (`idKelas`),
  ADD KEY `fk_tugas_dibuatOleh` (`dibuatOleh`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `fk_admin_dibuatOleh` FOREIGN KEY (`dibuatOleh`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_admin_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `distkelas`
--
ALTER TABLE `distkelas`
  ADD CONSTRAINT `fk_distKelas_idKelas` FOREIGN KEY (`idKelas`) REFERENCES `kelas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_distKelas_nisSiswa` FOREIGN KEY (`nisSiswa`) REFERENCES `siswa` (`nis`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `guru`
--
ALTER TABLE `guru`
  ADD CONSTRAINT `fk_guru_dibuatOleh` FOREIGN KEY (`dibuatOleh`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_guru_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `jawaban`
--
ALTER TABLE `jawaban`
  ADD CONSTRAINT `fk_jawaban_dibuatOleh` FOREIGN KEY (`dibuatOleh`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_jawaban_idTugas` FOREIGN KEY (`idTugas`) REFERENCES `tugas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `fk_kelas_dibuatOleh` FOREIGN KEY (`dibuatOleh`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_kelas_idGuru` FOREIGN KEY (`idGuru`) REFERENCES `guru` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `komentar`
--
ALTER TABLE `komentar`
  ADD CONSTRAINT `fk_komentar_dibuatOleh` FOREIGN KEY (`dibuatOleh`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_komentar_idMateri` FOREIGN KEY (`idMateri`) REFERENCES `materi` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_komentar_idPosting` FOREIGN KEY (`idPosting`) REFERENCES `posting` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_komentar_idTugas` FOREIGN KEY (`idTugas`) REFERENCES `tugas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `materi`
--
ALTER TABLE `materi`
  ADD CONSTRAINT `fk_materi_dibuatOleh` FOREIGN KEY (`dibuatOleh`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_materi_idKelas` FOREIGN KEY (`idKelas`) REFERENCES `kelas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `posting`
--
ALTER TABLE `posting`
  ADD CONSTRAINT `fk_posting_dibuatOleh` FOREIGN KEY (`dibuatOleh`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_posting_idKelas` FOREIGN KEY (`idKelas`) REFERENCES `kelas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `fk_siswa_dibuatOleh` FOREIGN KEY (`dibuatOleh`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_siswa_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tugas`
--
ALTER TABLE `tugas`
  ADD CONSTRAINT `fk_tugas_dibuatOleh` FOREIGN KEY (`dibuatOleh`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tugas_idKelas` FOREIGN KEY (`idKelas`) REFERENCES `kelas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
