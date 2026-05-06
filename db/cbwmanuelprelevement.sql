-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 06 mai 2026 à 17:08
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cbwmanuelprelevement`
--

-- --------------------------------------------------------

--
-- Structure de la table `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `type` varchar(20) NOT NULL,
  `size` varchar(20) DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `date` varchar(20) DEFAULT NULL,
  `file_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `documents`
--

INSERT INTO `documents` (`id`, `title`, `type`, `size`, `category`, `date`, `file_url`) VALUES
(1, 'Fiche de prescription & consentement — Diagnostic moléculaire par NGS', 'pdf', '1.2 MB', 'Prescription', '12/05/2023', NULL),
(2, 'GÉNOTYPE RHD FŒTAL - DÉTERMINATION PRÉNATALE A PARTIR DU SANG', 'pdf', '850 KB', 'Protocole', '08/02/2025', NULL),
(3, 'Consentement-Demande-de-typage-HLA', 'word', '45 KB', 'Consentement', '20/11/2024', NULL),
(4, 'Formulaire d\'informations cliniques - maladies génétiques (BRCA1/2)', 'pdf', '2.1 MB', 'Prescription', '15/01/2025', NULL),
(5, 'T21-FICHE DE RENSEIGNEMENT POUR ETUDE DES MARQUEURS SERIQUES', 'image', '3.4 MB', 'Information', '03/03/2024', NULL),
(6, 'FICHE DE RENSEIGNEMENT DES LITHIASES URINAIRES', 'pdf', '1.1 MB', 'Prescription', '22/07/2023', NULL),
(7, 'Protocole de prélèvement - Gazométrie', 'pdf', '450 KB', 'Protocole', '10/12/2024', NULL),
(8, 'Manuel Qualité - Section Pré-analytique', 'pdf', '5.2 MB', 'Qualité', '01/01/2025', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `examens`
--

CREATE TABLE `examens` (
  `id` varchar(50) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `synonymes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`synonymes`)),
  `codeNABM` varchar(50) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `code_kalisil` varchar(50) DEFAULT NULL,
  `specialite` varchar(100) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `laboratoireExecutant` varchar(100) DEFAULT NULL,
  `revisionDate` varchar(50) DEFAULT NULL,
  `recipients` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`recipients`)),
  `prixFixe` tinyint(1) DEFAULT NULL,
  `cotation` varchar(100) DEFAULT NULL,
  `prix` varchar(50) DEFAULT NULL,
  `prixHN` varchar(50) DEFAULT NULL,
  `descriptionAnalyse` text DEFAULT NULL,
  `principalesIndications` text DEFAULT NULL,
  `nature` varchar(100) DEFAULT NULL,
  `volume` varchar(50) DEFAULT NULL,
  `typePrelevement` varchar(100) DEFAULT NULL,
  `echantillon` varchar(100) DEFAULT NULL,
  `quantiteMinimale` varchar(100) DEFAULT NULL,
  `preparationPatient` text DEFAULT NULL,
  `instructionsComplementaires` text DEFAULT NULL,
  `conditions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`conditions`)),
  `commentaires` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`commentaires`)),
  `ficheRenseignements` tinyint(1) DEFAULT NULL,
  `a_jeun` tinyint(1) DEFAULT NULL,
  `urgent` tinyint(1) DEFAULT NULL,
  `temperatureTransport` varchar(100) DEFAULT NULL,
  `technique` varchar(100) DEFAULT NULL,
  `frequence` varchar(100) DEFAULT NULL,
  `delai` varchar(100) DEFAULT NULL,
  `dureeConservation` varchar(100) DEFAULT NULL,
  `temperatureConservation` varchar(100) DEFAULT NULL,
  `dureeStabiliteTheorique` varchar(100) DEFAULT NULL,
  `lienExterne` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `examens`
--

INSERT INTO `examens` (`id`, `nom`, `synonymes`, `codeNABM`, `code`, `code_kalisil`, `specialite`, `type`, `laboratoireExecutant`, `revisionDate`, `recipients`, `prixFixe`, `cotation`, `prix`, `prixHN`, `descriptionAnalyse`, `principalesIndications`, `nature`, `volume`, `typePrelevement`, `echantillon`, `quantiteMinimale`, `preparationPatient`, `instructionsComplementaires`, `conditions`, `commentaires`, `ficheRenseignements`, `a_jeun`, `urgent`, `temperatureTransport`, `technique`, `frequence`, `delai`, `dureeConservation`, `temperatureConservation`, `dureeStabiliteTheorique`, `lienExterne`) VALUES
('A1', '17 Hydroxy progestérone', '[\"17 OH P\", \"PROGESTERONE 17 OH\", \"17 ALPHA HYDROXYPROGESTERONE\", \"17 OH progest\\u00e9rone\"]', NULL, '17OHP', 'KS-001', 'HORMONOLOGIE', 'Interne', 'CENTRE DE BIOLOGIE AL WIFAK', '05/06/2024 13:38:43', '[\"vert\", \"bleu\", \"rouge\", \"violet\", \"jaune\"]', 0, 'B 400 - Code acte : 0383', '440 MAD', NULL, NULL, 'Stéroïde intermédiaire dans la biosynthèse des glucocorticoïdes et des androgènes...', NULL, NULL, 'Sang veineux', 'Sérum ou plasma', '0.2 mL sérum ou plasma', 'Le prélèvement chez la femme doit être effectué en début de phase folliculaire.', 'Préciser l\'âge, le sexe et la phase du cycle.', '[\"R\\u00e9frig\\u00e9r\\u00e9 (2-8 \\u00b0C): 3 jours.\", \"Congel\\u00e9 (-15 \\u00e0 -25\\u00b0C): 3 mois.\"]', '[]', 0, 1, 0, 'Réfrigéré', 'ELISA', '2 Jours', '2 jours', '4 jours', 'Réfrigérée 2-8°C', '4 jours', NULL),
('A11', '11 DESOXYCORTICOSTERONE - Sérum', '[\"DOC\"]', NULL, NULL, 'KS-011', 'Endocrinologie', 'Externe (Cerba)', 'CERBA', '21/12/2023 14:38:50', '[\"rouge\"]', 1, NULL, '560 MAD', '51,00 €', NULL, NULL, 'Sérum', '1 ml', NULL, NULL, NULL, NULL, NULL, '[]', '[]', 1, 0, 1, 'Réfrigéré', 'LC-MS-MS', '1/s', '7 J', NULL, NULL, NULL, 'https://www.lab-cerba.com/'),
('A150', 'GLYCEMIE', '[]', NULL, 'GLY', NULL, 'BIOCHIMIE SANGUINE', 'Interne', 'CENTRE DE BIOLOGIE AL WIFAK', NULL, '[\"fluorure\"]', 0, NULL, '50 MAD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', 0, 1, 1, NULL, 'Hexokinase', NULL, '1 jour', NULL, NULL, NULL, NULL),
('A156', 'CHOLESTÉROL HDL', '[]', NULL, 'HDL', NULL, 'BIOCHIMIE SANGUINE', 'Interne', 'CENTRE DE BIOLOGIE AL WIFAK', NULL, '[\"sst\"]', 0, NULL, '80 MAD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', 0, 1, 0, NULL, 'Enzymatique', NULL, '1 jour', NULL, NULL, NULL, NULL),
('A158', 'HELICOBACTER PILORI (TEST RESPIRATOIRE)', '[]', NULL, 'HP', NULL, 'BACTÉRIOLOGIE', 'Interne', 'CENTRE DE BIOLOGIE AL WIFAK', NULL, '[]', 0, NULL, '450 MAD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', 0, 1, 0, NULL, 'Spectrométrie', NULL, '2 jours', NULL, NULL, NULL, NULL),
('A180', 'CHOLESTÉROL LDL', '[]', NULL, 'LDL', NULL, 'BIOCHIMIE SANGUINE', 'Interne', 'CENTRE DE BIOLOGIE AL WIFAK', NULL, '[\"sst\"]', 0, NULL, '80 MAD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', 0, 1, 0, NULL, 'Calculé', NULL, '1 jour', NULL, NULL, NULL, NULL),
('A354', 'Triglycérides', '[]', NULL, 'TRI', NULL, 'BIOCHIMIE SANGUINE', 'Interne', 'CENTRE DE BIOLOGIE AL WIFAK', NULL, '[\"sst\"]', 0, NULL, '80 MAD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', 0, 1, 0, NULL, 'Enzymatique', NULL, '1 jour', NULL, NULL, NULL, NULL),
('A355', 'TROPONINE Ic', '[]', NULL, 'TROP-I', NULL, 'MARQUEURS CARDIAQUES', 'Interne', 'CENTRE DE BIOLOGIE AL WIFAK', NULL, '[\"sst\"]', 0, NULL, '250 MAD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('A356', 'TROPONINE T US', '[]', NULL, 'TROP-T', NULL, 'MARQUEURS CARDIAQUES', 'Interne', 'CENTRE DE BIOLOGIE AL WIFAK', NULL, '[\"sst\"]', 0, NULL, '300 MAD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('A649', 'PCR MULTIPLEX RESPIRATOIRES', '[]', NULL, 'PCR-R', NULL, 'MICROBIOLOGIE', 'Interne', 'CENTRE DE BIOLOGIE AL WIFAK', NULL, '[\"edta\"]', 0, NULL, '1200 MAD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('A654', 'Gazometrie arterielle', '[]', NULL, 'GAZ', NULL, 'BIOCHIMIE SANGUINE', 'Interne', 'CENTRE DE BIOLOGIE AL WIFAK', NULL, '[\"heparine\"]', 0, NULL, '200 MAD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('A7', 'ACIDE LACTIQUE', '[\"LACTATE\"]', '0530', NULL, 'KS-007', 'DIABETOLOGIE', 'Externe (Cerba)', 'CERBA', NULL, '[\"gris\"]', 1, 'B 100', '110 MAD', NULL, NULL, NULL, 'Surnageant', '1 ml', 'Sang veineux ou LCR', NULL, '0.5mL', NULL, NULL, '[\"Cong\\u00e9lation imm\\u00e9diate requise\"]', '[\"Le repos avant le pr\\u00e9l\\u00e8vement est pr\\u00e9f\\u00e9rable\"]', 0, 1, 1, 'Congelé', 'Spectrophotométrie', '5/s (Chaque jour)', '1 jour', NULL, NULL, NULL, 'http://cerbaexamen.fr/'),
('A95', 'CHOLESTEROL TOTAL', '[]', NULL, 'CHOL', NULL, 'BIOCHIMIE SANGUINE', 'Interne', 'CENTRE DE BIOLOGIE AL WIFAK', NULL, '[\"sst\"]', 0, NULL, '60 MAD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', 0, 1, 0, NULL, 'Enzymatique', NULL, '1 jour', NULL, NULL, NULL, NULL),
('A97', 'CK-MB', '[]', NULL, 'CKMB', NULL, 'MARQUEURS CARDIAQUES', 'Interne', 'CENTRE DE BIOLOGIE AL WIFAK', NULL, '[\"sst\"]', 0, NULL, '150 MAD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]', 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `laboratoires`
--

CREATE TABLE `laboratoires` (
  `id` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `laboratoires`
--

INSERT INTO `laboratoires` (`id`, `nom`) VALUES
(1, 'CENTRE DE BIOLOGIE AL WIFAK'),
(2, 'CERBA'),
(3, 'EUROFINS BIOMNIS'),
(4, 'G-LAB CASABLANCA'),
(5, 'LABORATOIRE EXECUTANT ÉTRANGER'),
(6, 'LABORATOIRE LIAB-CASABLANCA'),
(7, 'LABORATOIRE NATIONAL MOHAMMED VI D\'ANALYSES MÉDICALES-CASABLANCA');

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `message` varchar(500) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `type`, `is_read`, `created_at`) VALUES
(4, 1, 'Bienvenue', 'Bienvenue sur votre nouveau Manuel de Prélèvement CBW.', 'success', 0, '2026-05-05 11:12:26');

-- --------------------------------------------------------

--
-- Structure de la table `specialites`
--

CREATE TABLE `specialites` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `specialites`
--

INSERT INTO `specialites` (`id`, `nom`) VALUES
(1, 'ALLERGOLOGIE'),
(2, 'ANALYSES SPECIALISÉES'),
(3, 'ANATOMIE ET CYTOLOGIE PATHOLOGIQUE'),
(4, 'ASSISTANCE MÉDICALE À LA PROCRÉATION (A.M.P)'),
(5, 'AUTO-IMMUNITE'),
(6, 'BACTÉRIOLOGIE'),
(7, 'BIOCHIMIE SANGUINE'),
(8, 'BIOCHIMIE URINAIRE'),
(9, 'BIOLOGIE MOLECULAIRE'),
(10, 'CYTOGÉNÉTIQUE'),
(11, 'DIAGNOSTIC PRÉNATAL'),
(12, 'ELECTROPHORESES'),
(13, 'ENZYMOLOGIE'),
(14, 'EPREUVES DYNAMIQUES'),
(15, 'HÉMATOLOGIE'),
(16, 'HEMOSTASE'),
(17, 'HORMONOLOGIE'),
(18, 'HYBRIDATION MOLÉCULAIRE'),
(19, 'IMMUNO-CHIMIE'),
(20, 'IMMUNOHEMATOLOGIE'),
(21, 'IMMUNOLOGIE'),
(22, 'MARQUEURS CARDIAQUES'),
(23, 'MÉDICAMENTS'),
(24, 'MICROBIOLOGIE'),
(25, 'ONCOLOGIE'),
(26, 'PARASITOLOGIE'),
(27, 'PROTÉINES'),
(28, 'SEROLOGIE'),
(29, 'SEROLOGIES BACTERIENNES'),
(30, 'SEROLOGIES PARASITAIRES'),
(31, 'SÉROLOGIES VIRALES'),
(32, 'SPERMIOLOGIE'),
(33, 'TOXICOLOGIE'),
(34, 'VIROLOGIE'),
(35, 'VITAMINOLOGIE');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `identifiant` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` enum('laboratoire','client') NOT NULL DEFAULT 'client',
  `organisme` varchar(255) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1,
  `derniere_connexion` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `identifiant`, `password_hash`, `nom`, `prenom`, `email`, `role`, `organisme`, `actif`, `derniere_connexion`, `created_at`, `updated_at`) VALUES
(1, 'CBW-ADMIN', '$2b$12$gPeE0Fk2dd.pXAiNwNmH9uLn3ZPPOspPphXc1z52aqOan91A.qcv2', 'Admin', 'CBW', NULL, 'laboratoire', 'Laboratoire CBW', 1, '2026-05-06 13:29:29', '2026-04-29 12:12:37', '2026-05-06 14:29:29'),
(2, 'CLT-001', '$2b$12$GtwUTIQcTDyTUJW6pE9tg./TjhpBM8w3pMcZRJZTG8o7sqnPU/aQa', 'Client', 'Test', NULL, 'client', 'Clinique Test', 1, NULL, '2026-04-29 12:12:37', '2026-05-05 10:30:53');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_documents_title` (`title`),
  ADD KEY `ix_documents_id` (`id`);

--
-- Index pour la table `examens`
--
ALTER TABLE `examens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_examens_code_kalisil` (`code_kalisil`),
  ADD KEY `ix_examens_nom` (`nom`),
  ADD KEY `ix_examens_id` (`id`),
  ADD KEY `ix_examens_code` (`code`);

--
-- Index pour la table `laboratoires`
--
ALTER TABLE `laboratoires`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ix_laboratoires_nom` (`nom`),
  ADD KEY `ix_laboratoires_id` (`id`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ix_notifications_id` (`id`);

--
-- Index pour la table `specialites`
--
ALTER TABLE `specialites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ix_specialites_nom` (`nom`),
  ADD KEY `ix_specialites_id` (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `identifiant` (`identifiant`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `laboratoires`
--
ALTER TABLE `laboratoires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `specialites`
--
ALTER TABLE `specialites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
