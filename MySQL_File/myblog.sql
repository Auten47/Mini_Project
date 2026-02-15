-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2026 at 02:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myblog`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `comment_text`, `created_at`) VALUES
(13, 6, 3, 'luv luv 😍', '2026-02-14 23:38:08'),
(14, 7, 1, 'Wowww', '2026-02-15 07:54:56'),
(15, 10, 3, 'Wowwww', '2026-02-15 10:13:25');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `post_id`, `user_id`, `created_at`) VALUES
(11, 6, 2, '2026-02-14 23:37:19'),
(12, 6, 3, '2026-02-14 23:38:03'),
(13, 6, 1, '2026-02-15 05:27:07'),
(14, 7, 3, '2026-02-15 05:56:27'),
(16, 7, 1, '2026-02-15 07:55:05'),
(17, 9, 2, '2026-02-15 08:04:24'),
(18, 8, 2, '2026-02-15 08:04:26'),
(19, 10, 2, '2026-02-15 08:20:38'),
(20, 10, 3, '2026-02-15 10:13:15'),
(21, 9, 3, '2026-02-15 10:13:33'),
(22, 13, 3, '2026-02-15 10:16:11');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `tag` varchar(100) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `image`, `tag`, `user_id`, `created_at`) VALUES
(6, 'Pictures from the past 🫰', 'Classmates from Kannasootsuksalai School, Class 120, Chinese Language Arts major. 2021', '/uploads/1771112224869IMG_5333.JPG', 'Dialy Life', 2, '2026-02-14 23:37:04'),
(7, 'Picture Vol.01', 'Picture Vol.01 This is .....', '/uploads/1771134983807à¹à¸à¸µà¸¢à¸à¹.....png', 'Music', 3, '2026-02-15 05:56:23'),
(8, 'Street Art #Nonthaburi', 'Location: yeaktiwanon 📸', '/uploads/1771142257545IMG_20260123_215738.jpg', 'Travel', 1, '2026-02-15 07:57:37'),
(9, 'Street Arts #Nonthaburi', 'Location: yeaktiwanon', '/uploads/1771142458362FilmCam_FC 100_20260124_000848550.jpg', 'Travel', 1, '2026-02-15 08:00:58'),
(10, 'Yellow Moodddddd', 'i\'m fine.', '/uploads/1771142721451FilmCam_FNC_20260124_000900137.jpg', 'Dialy Life', 2, '2026-02-15 08:05:21'),
(11, 'How do you think about computer engineering?', 'in 2026', '/uploads/1771145972939pexels-davideibiza-1739748.jpg', 'Engineer', 2, '2026-02-15 08:59:32'),
(12, 'Black mood / Coffee Cafe', 'I like this coffee.', '/uploads/1771146085951pexels-kevinmenajang-982612.jpg', 'Dialy Life', 3, '2026-02-15 09:01:25'),
(13, 'Thailand 2026', 'Hello, Thailand 2026', '/uploads/1771150610061IMG_20260123_215829.jpg', 'Dialy Life', 3, '2026-02-15 10:16:01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `created_at`) VALUES
(1, 'nattachai wongsrimueng', 'nattachai-01@gmail.com', 'nattachai', '2026-02-05 18:28:17'),
(2, 'Somchai Rakdee', 'somchai@gmail.com', 'somchai', '2026-02-13 16:35:08'),
(3, '078-7 ณัฎฐชัย วงษ์ศรีเมือง', 'nattachai-wo@rmutp.ac.th', NULL, '2026-02-13 17:15:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `post_id` (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
