-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3308
-- Tiempo de generación: 30-05-2024 a las 03:33:26
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `catalogodb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `icon` varchar(2048) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `name`, `icon`) VALUES
(1, 'Zapatillas', 'https://cdn-icons-png.flaticon.com/128/1007/1007753.png'),
(2, 'Remeras', 'https://cdn-icons-png.flaticon.com/128/2347/2347446.png'),
(3, 'Buzos', 'https://cdn-icons-png.flaticon.com/128/1599/1599523.png'),
(4, 'Pantalones', 'https://cdn-icons-png.flaticon.com/128/664/664466.png'),
(5, 'Shorts', 'https://cdn-icons-png.flaticon.com/128/4217/4217943.png'),
(6, 'Campera', 'https://cdn-icons-png.flaticon.com/512/124/124666.png'),
(7, 'Musculosa', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjEYXo87d4aXcEtVahGr9WlhsZzR7DH3fA3A&s');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(2048) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `category_id`, `name`, `image`) VALUES
(1, 1, 'BOTAS WMNSS AIR JORDAN 3 RETRO', 'https://www.digitalsport.com.ar/files/products/66284a0d56f40-614997-280x280.jpg'),
(2, 1, 'BOTAS WMNS AIR JORDAN 4 RETRO FROZEN MOMENTS', 'https://www.digitalsport.com.ar/files/products/664f6058e4a6d-607815-280x280.jpg'),
(3, 1, 'BOTAS AIR JORDAN 1 RETRO HIGH PRALINE', 'https://www.digitalsport.com.ar/files/products/66284a9a95d27-607831-280x280.jpg'),
(4, 1, 'BOTAS AIR JORDAN 1 RETRO HI MAUVE', 'https://www.digitalsport.com.ar/files/products/66266c5613475-615086-280x280.jpg'),
(5, 1, 'BOTAS AIR JORDAN 1 RETRO HIGH', 'https://www.digitalsport.com.ar/files/products/663e27b366c1d-615057-280x280.jpg'),
(6, 1, 'BOTAS WMNS AIR JORDAN 2 RETRO', 'https://www.digitalsport.com.ar/files/products/661f0fc73a0a0-607844-280x280.jpg'),
(7, 1, 'BOTAS AIR JORDAN 2 RETRO BLACK CEMENT', 'https://www.digitalsport.com.ar/files/products/664ca97a920e1-607791-280x280.jpg'),
(8, 1, 'ZAPATILLAS AIR MAX 1 PREMIUM', 'https://www.digitalsport.com.ar/files/products/661fd4c6e972d-652051-280x280.jpg'),
(9, 1, 'ZAPATILLAS AIR FORCE 1 LOW UNDERCOVER', 'https://www.digitalsport.com.ar/files/products/6622583e543b9-652040-280x280.jpg'),
(10, 2, 'REMERA CLASSIC', 'https://www.digitalsport.com.ar/files/products/660603cb000ee-623800-280x280.jpg'),
(11, 2, 'REMERA ACE HOUSE OF GRAPHIC', 'https://www.digitalsport.com.ar/files/products/661e82ce37986-625799-280x280.jpg'),
(12, 2, 'REMERA ADICOLOR HERITAGE NOW', 'https://www.digitalsport.com.ar/files/products/6539ad4d51f7d-635044-280x280.jpg'),
(13, 2, 'REMERA NRG TRAVIS SCOTT', 'https://www.digitalsport.com.ar/files/products/65285e38a5818-634802-280x280.jpg'),
(14, 2, 'REMERA JERSEY RAYADA', 'https://www.digitalsport.com.ar/files/products/65ef399435f08-647278-280x280.jpg'),
(15, 3, 'CANGURO JORDAN AIR WORDMARK', 'https://www.digitalsport.com.ar/files/products/661f0fd78bd7a-609399-280x280.jpg'),
(16, 3, 'CANGURO MODERN FLEECE', 'https://www.digitalsport.com.ar/files/products/648316ac02446-588292-280x280.jpg'),
(17, 3, 'BUZO SOLO SWOOSH', 'https://www.digitalsport.com.ar/files/products/64ad71b9827c4-628618-280x280.jpg'),
(18, 3, 'BUZO JOGGER LOOSE', 'https://www.digitalsport.com.ar/files/products/65eb7d29dd032-647252-280x280.jpg'),
(19, 3, 'BUZO DOUBLE FACE', 'https://www.digitalsport.com.ar/files/products/66018280df1f8-647243-280x280.jpg'),
(20, 4, 'PANTALON ADIBREAK', 'https://www.digitalsport.com.ar/files/products/66060416e2efd-623985-280x280.jpg'),
(21, 4, 'PANTALON TRACK SINOPLE', 'https://www.digitalsport.com.ar/files/products/656e68f390a42-641947-280x280.jpg'),
(22, 4, 'PANTALON TRACK FARINE', 'https://www.digitalsport.com.ar/files/products/656e68f128018-641946-280x280.jpg'),
(23, 4, 'PANTALON PUMA X PERKS AND MINI', 'https://www.digitalsport.com.ar/files/products/654bf547912af-636562-280x280.jpg'),
(24, 4, 'PANTALON DOUBLE FACE LISO', 'https://www.digitalsport.com.ar/files/products/6602103025613-647282-280x280.jpg'),
(25, 5, 'SHORT JORDAN AIR WORDMARK', 'https://www.digitalsport.com.ar/files/products/661f0fd154dcc-609398-280x280.jpg'),
(26, 5, 'SHORT SOLO SWOOSH', 'https://www.digitalsport.com.ar/files/products/64ad704eda87c-628610-280x280.jpg'),
(27, 5, 'SHORT NRG TRAVIS SCOTT', 'https://www.digitalsport.com.ar/files/products/652dcd6db1dca-634801-280x280.jpg'),
(28, 5, 'SHORT MELO X TOXIC AOP', 'https://www.digitalsport.com.ar/files/products/65de4b986e724-607779-280x280.jpg'),
(29, 5, 'SHORT JORDAN FLIGHT', 'https://www.digitalsport.com.ar/files/products/64198d6421ddb-584128-280x280.jpg'),
(30, 6, 'Campera Nike', 'https://www.digitalsport.com.ar/files/products/661e5eda5e774-609318-280x280.jpg'),
(31, 6, 'CAMPERA PADDED LIFE NIKE', 'https://www.digitalsport.com.ar/files/products/64ad745b83cee-624513-500x500.jpg'),
(32, 3, 'CANGURO UPTOWN GRAPHIC PUMA', 'https://www.digitalsport.com.ar/files/products/6561379ca1ddd-594916-500x500.jpg'),
(33, 7, 'MUSCULOSA KUBRICK', 'https://www.digitalsport.com.ar/files/products/6528240c73746-626745-280x280.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` longblob NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`) VALUES
(1, 'Tobias', 0x72f4665c396250c23c035c7a4c9e6b7f, 'tobilp86@gmail.com'),
(2, 'admin', 0xdb83e39c026131d011a3116ed112ec26, 'admin@admin.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D34A04AD12469DE2` (`category_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_D34A04AD12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
