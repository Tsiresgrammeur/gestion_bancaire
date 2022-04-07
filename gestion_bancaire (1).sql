-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 07, 2022 at 12:49 PM
-- Server version: 10.7.3-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestion_bancaire`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_compte`
--

CREATE TABLE `audit_compte` (
  `id` int(10) UNSIGNED NOT NULL,
  `ops` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `numCompte` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anc_solde` int(11) DEFAULT NULL,
  `n_solde` int(11) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `audit_compte`
--

INSERT INTO `audit_compte` (`id`, `ops`, `date`, `numCompte`, `anc_solde`, `n_solde`, `username`) VALUES
(1, 'creation', '2022-04-07', 'hfu78', 0, 8999, NULL),
(2, 'Mise à jour', '2022-04-07', 'hfu78', 8999, 20999, NULL),
(3, 'Mise à jour', '2022-04-07', 'hfu78', 20999, 21021, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `audit_operation`
--

CREATE TABLE `audit_operation` (
  `id` int(10) UNSIGNED NOT NULL,
  `ops` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `numCheck` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numCompte` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `montant` int(11) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `audit_operation`
--

INSERT INTO `audit_operation` (`id`, `ops`, `date`, `numCheck`, `numCompte`, `montant`, `username`) VALUES
(5, 'Versement', '2022-04-07', '1231321', 'hfu78', 12000, NULL),
(6, 'Versement', '2022-02-03', 'rey', 'hfu78', 22, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `audit_retrait`
--

CREATE TABLE `audit_retrait` (
  `id` int(10) UNSIGNED NOT NULL,
  `ops` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `numRetrait` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numCompte` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anc_montant` int(11) DEFAULT NULL,
  `n_montant` int(11) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Triggers `audit_retrait`
--
DELIMITER $$
CREATE TRIGGER `updatesolde` BEFORE INSERT ON `audit_retrait` FOR EACH ROW UPDATE client SET client.solde=client.solde+new.anc_montant-new.n_montant WHERE client.numCompte=new.numCompte
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `audit_versement`
--

CREATE TABLE `audit_versement` (
  `id` int(10) UNSIGNED NOT NULL,
  `ops` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `numVersement` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numCompte` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anc_montant` int(11) DEFAULT NULL,
  `n_montant` int(11) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Triggers `audit_versement`
--
DELIMITER $$
CREATE TRIGGER `updatesoldeVersement` BEFORE INSERT ON `audit_versement` FOR EACH ROW UPDATE client SET client.solde=client.solde-new.anc_montant+new.n_montant WHERE client.numCompte=new.numCompte
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `numCompte` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomClient` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `solde` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`numCompte`, `nomClient`, `solde`) VALUES
('hfu78', 'koto', 21021);

--
-- Triggers `client`
--
DELIMITER $$
CREATE TRIGGER `deleteCompte` AFTER DELETE ON `client` FOR EACH ROW INSERT INTO `audit_compte` (`ops`, `date`, `numCompte`, `anc_solde`, `n_solde`, `username`) VALUES ('delAccount', current_timestamp(), old.numCompte, old.solde, 0, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insertCompte` BEFORE INSERT ON `client` FOR EACH ROW INSERT INTO `audit_compte` (`ops`, `date`, `numCompte`, `anc_solde`, `n_solde`, `username`) VALUES ('creation', current_timestamp(), new.numCompte, 0, new.solde, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updateCompte` AFTER UPDATE ON `client` FOR EACH ROW INSERT INTO `audit_compte` (`ops`, `date`, `numCompte`, `anc_solde`, `n_solde`, `username`) VALUES ('Mise à jour', current_timestamp(), old.numCompte, old.solde, new.solde, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `knex_migrations`
--

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20220406100335_init.js', 1, '2022-04-07 12:06:14');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `knex_migrations_lock`
--

INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `retrait`
--

CREATE TABLE `retrait` (
  `numRetrait` int(10) UNSIGNED NOT NULL,
  `numCheck` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numCompte` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `montant` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Triggers `retrait`
--
DELIMITER $$
CREATE TRIGGER `delRetrait` AFTER DELETE ON `retrait` FOR EACH ROW INSERT INTO `audit_retrait` (`ops`, `date`, `numRetrait`, `numCompte`, `anc_montant`, `n_montant`, `username`) VALUES ('delRetrait', CURRENT_DATE, old.numRetrait, old.numCompte, old.montant, '0', (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `historiqueRetrait` AFTER INSERT ON `retrait` FOR EACH ROW INSERT INTO `audit_operation` (`ops`, `date`, `numCheck`, `numCompte`, `montant`, `username`) VALUES ('Retrait', new.date, new.numCheck, new.numCompte, new.montant, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `modification` AFTER UPDATE ON `retrait` FOR EACH ROW INSERT INTO `audit_retrait` (`ops`, `date`,`numRetrait`,`numCompte`,`anc_montant`,`n_montant`,`username`) VALUES ('Mise à jour', current_timestamp(), old.numCompte, old.montant, new.montant, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `nouveau_retrait` AFTER INSERT ON `retrait` FOR EACH ROW UPDATE client SET client.solde= client.solde-new.montant WHERE client.numCompte=new.numCompte
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `versement`
--

CREATE TABLE `versement` (
  `numVersement` int(10) UNSIGNED NOT NULL,
  `numCheck` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numCompte` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `montant` int(11) DEFAULT NULL,
  `date` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `versement`
--

INSERT INTO `versement` (`numVersement`, `numCheck`, `numCompte`, `montant`, `date`) VALUES
(5, '1231321', 'hfu78', 12000, '2022-04-07'),
(6, 'rey', 'hfu78', 22, '2022-02-03');

--
-- Triggers `versement`
--
DELIMITER $$
CREATE TRIGGER `delete_versement` AFTER DELETE ON `versement` FOR EACH ROW INSERT INTO `audit_versement` (`ops`, `date`, `numVersement`, `numCompte`, `anc_montant`, `n_montant`, `username`) VALUES ('Suppression', CURRENT_DATE, old.numVersement, old.numCompte, old.montant, '0', (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `historiqueVersement` AFTER INSERT ON `versement` FOR EACH ROW INSERT INTO `audit_operation` (`ops`, `date`, `numCheck`, `numCompte`, `montant`, `username`) VALUES ('Versement', new.date, new.numCheck, new.numCompte, new.montant, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `nouveau_versement` AFTER INSERT ON `versement` FOR EACH ROW UPDATE client SET client.solde= client.solde+new.montant WHERE client.numCompte=new.numCompte
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_versement` AFTER UPDATE ON `versement` FOR EACH ROW INSERT INTO `audit_versement` (`ops`, `date`, `numVersement`, `numCompte`, `anc_montant`, `n_montant`, `username`) VALUES ('mise a jour', CURRENT_DATE, old.numVersement, old.numCompte, old.montant, new.montant, (SELECT user.username FROM user WHERE user.user_id=CURRENT_USER))
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_compte`
--
ALTER TABLE `audit_compte`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_operation`
--
ALTER TABLE `audit_operation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_retrait`
--
ALTER TABLE `audit_retrait`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_versement`
--
ALTER TABLE `audit_versement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`numCompte`);

--
-- Indexes for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Indexes for table `retrait`
--
ALTER TABLE `retrait`
  ADD PRIMARY KEY (`numRetrait`),
  ADD KEY `retrait_numcompte_foreign` (`numCompte`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `versement`
--
ALTER TABLE `versement`
  ADD PRIMARY KEY (`numVersement`),
  ADD KEY `versement_numcompte_foreign` (`numCompte`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_compte`
--
ALTER TABLE `audit_compte`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `audit_operation`
--
ALTER TABLE `audit_operation`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `audit_retrait`
--
ALTER TABLE `audit_retrait`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `audit_versement`
--
ALTER TABLE `audit_versement`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `retrait`
--
ALTER TABLE `retrait`
  MODIFY `numRetrait` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `versement`
--
ALTER TABLE `versement`
  MODIFY `numVersement` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `retrait`
--
ALTER TABLE `retrait`
  ADD CONSTRAINT `retrait_numcompte_foreign` FOREIGN KEY (`numCompte`) REFERENCES `client` (`numCompte`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `versement`
--
ALTER TABLE `versement`
  ADD CONSTRAINT `versement_numcompte_foreign` FOREIGN KEY (`numCompte`) REFERENCES `client` (`numCompte`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
