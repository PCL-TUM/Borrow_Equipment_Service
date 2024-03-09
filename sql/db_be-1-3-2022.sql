-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2022 at 03:33 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_be`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL COMMENT 'genarate by base',
  `username` varchar(255) NOT NULL,
  `enc_password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `telephone` varchar(32) NOT NULL,
  `gender` varchar(32) NOT NULL COMMENT 'เพศ( 0 = ชาย , 1 = หญิง )',
  `create_by` varchar(32) NOT NULL,
  `create_at` datetime NOT NULL,
  `update_by` varchar(32) NOT NULL,
  `update_at` datetime NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `enc_password`, `firstname`, `lastname`, `telephone`, `gender`, `create_by`, `create_at`, `update_by`, `update_at`, `active`) VALUES
(1, 'admin_tum', '$2b$10$VGBDHi2p9LT7OnZcUUvE2utsKd0snGUgoDOmClhoQtM2ZqeIzPEFa', 'พิเชษ', 'ลิ่วสุดยอด', '0999999999', '0', '1', '2022-01-28 11:27:16', '1', '2022-01-28 11:27:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL COMMENT 'genarate by base',
  `username` varchar(255) NOT NULL,
  `enc_password` varchar(255) NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL COMMENT 'คำอธิบาย หรือ หมายเหตุ',
  `create_by` varchar(32) NOT NULL,
  `create_at` datetime NOT NULL,
  `update_by` varchar(32) NOT NULL,
  `update_at` datetime NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `username`, `enc_password`, `department_name`, `description`, `create_by`, `create_at`, `update_by`, `update_at`, `active`) VALUES
(1, 'dpm1', '$2b$10$7LsjiM33RkZ8a5spKVqqf.HAVeAwkmPpcMdMcPV0lTrCtHuGW4fWy', 'ฉุกเฉิน', 'ห้องฉุกเฉิน', '1', '2022-01-28 11:27:16', '1', '2022-01-28 11:27:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL COMMENT 'genarate by base',
  `rfid` varchar(32) NOT NULL,
  `equipment_name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL COMMENT 'ยี่ห้อ',
  `model` varchar(255) NOT NULL COMMENT 'รุ่น',
  `equipment_number` varchar(32) NOT NULL COMMENT 'หมายเลขครุภัณฑ์',
  `serial_number` varchar(32) NOT NULL COMMENT 's/n',
  `description` varchar(255) DEFAULT NULL COMMENT 'คำอธิบาย หรือ หมายเหตุ',
  `create_by` varchar(32) NOT NULL,
  `create_at` datetime NOT NULL,
  `update_by` varchar(32) NOT NULL,
  `update_at` datetime NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `rfid`, `equipment_name`, `brand`, `model`, `equipment_number`, `serial_number`, `description`, `create_by`, `create_at`, `update_by`, `update_at`, `active`) VALUES
(1, '1234567890', 'เครืองให้สารละลายทางหลอดเลือดดํา', 'Terumo', 'TE835', '12345', '123456', 'อุปกรณ์', '1', '2022-01-28 11:27:16', '1', '2022-01-27 11:27:16', 1),
(2, '1234567880', 'เครืองให้สารละลายทางหลอดเลือดดํา', 'Terumo', 'TE835', '123456', '1234567', 'อุปกรณ์', '1', '2022-01-28 11:27:16', '1', '2022-01-28 11:27:16', 1),
(3, '1234567780', 'เครืองให้สารละลายทางหลอดเลือดดํา', 'Terumo', 'TE835', '1234567', '12345678', 'อุปกรณ์', '1', '2022-01-28 11:27:16', '1', '2022-01-28 11:27:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL COMMENT 'genarate by base',
  `rfid` varchar(32) NOT NULL,
  `username` varchar(255) NOT NULL COMMENT 'id พนักงาน',
  `enc_password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `telephone` varchar(32) NOT NULL,
  `gender` varchar(32) NOT NULL COMMENT 'เพศ( 0 = ชาย , 1 = หญิง )',
  `image_file` varchar(255) DEFAULT NULL COMMENT 'ชื่อไฟล์',
  `create_by` varchar(32) NOT NULL,
  `create_at` datetime NOT NULL,
  `update_by` varchar(32) NOT NULL,
  `update_at` datetime NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `rfid`, `username`, `enc_password`, `firstname`, `lastname`, `telephone`, `gender`, `image_file`, `create_by`, `create_at`, `update_by`, `update_at`, `active`) VALUES
(1, '0123456789', '1478523690', '$2b$10$78.y8g7fRdM5hWaNdpNqTuauRKEN6Q5nXLyZLlO9wkmazbtEO.KJu', 'อนุกฤษณ์', 'สุดยอด', '0888888888', '0', NULL, '1', '2022-01-28 11:27:16', '1', '2022-01-26 14:27:16', 1),
(2, '0123456779', '1478523680', '$2b$10$FhEG8v8B9RhYL4Qv26P3VuoaAbyC1wWMSKrRIsFNEQDRkWPD2RFqO', 'ซุปเปอร์แมน', 'เทสนะจ๊ะ', '0987654321', '0', NULL, '1', '2022-01-28 11:27:16', '1', '2022-01-27 11:27:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `report_id` int(11) DEFAULT NULL,
  `read_noti` int(11) NOT NULL COMMENT '0 = ยังไม่อ่าน, 1 = อ่านแล้ว',
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `update_at` datetime NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL COMMENT 'genarate by base',
  `member_id` varchar(32) NOT NULL COMMENT 'คนที่ยืม/คืน ',
  `equipment_id` varchar(32) NOT NULL COMMENT 'ครุภัณฑ์',
  `status` varchar(32) NOT NULL COMMENT 'สถานะ( 0 = กำลังใช้งาน(หรือถูกยืม) , 1 = คืนแล้ว ) ',
  `used_department_id` varchar(32) DEFAULT NULL COMMENT 'ครุภัณฑ์ถูกใช้ในแผนกอะไร',
  `admin_approve_borrow` varchar(32) NOT NULL COMMENT 'คนอนุมัติการยืม',
  `borrow_date` datetime NOT NULL COMMENT 'วันที่ยืม',
  `admin_approve_return` varchar(32) DEFAULT NULL COMMENT 'คนอนุมัติการคืน',
  `return_date` datetime DEFAULT NULL COMMENT 'วันที่คืน',
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `member_id`, `equipment_id`, `status`, `used_department_id`, `admin_approve_borrow`, `borrow_date`, `admin_approve_return`, `return_date`, `create_at`, `update_at`, `active`) VALUES
(1, '1', '1', '0', '1', '1', '2022-02-12 11:27:16', NULL, NULL, '2022-02-12 11:27:16', '2022-03-01 11:27:16', 1),
(2, '1', '2', '0', '1', '1', '2022-02-12 11:27:16', NULL, NULL, '2022-02-12 11:27:16', '2022-03-02 11:27:16', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'genarate by base', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'genarate by base', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'genarate by base', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'genarate by base', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'genarate by base', AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
