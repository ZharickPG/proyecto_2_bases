-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ticketforge_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ticketforge_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ticketforge_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ticketforge_db` ;

-- -----------------------------------------------------
-- Table `ticketforge_db`.`artists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`artists` (
  `id_artist` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_artist`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ticketforge_db`.`cast_members`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`cast_members` (
  `id_cast_member` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_cast_member`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ticketforge_db`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`events` (
  `id_event` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `date_time` DATETIME NOT NULL,
  `category` ENUM('concert', 'sports', 'theater') NOT NULL,
  `min_price` DECIMAL(10,2) NOT NULL,
  `max_price` DECIMAL(10,2) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id_event`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ticketforge_db`.`concert_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`concert_details` (
  `id_event` INT NOT NULL,
  `presentation_schedule` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_event`),
  CONSTRAINT `concert_details_ibfk_1`
    FOREIGN KEY (`id_event`)
    REFERENCES `ticketforge_db`.`events` (`id_event`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ticketforge_db`.`concert_artists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`concert_artists` (
  `id_event` INT NOT NULL,
  `id_artist` INT NOT NULL,
  `presentation_time` TIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_event`, `id_artist`),
  INDEX `id_artist` (`id_artist` ASC) VISIBLE,
  CONSTRAINT `concert_artists_ibfk_1`
    FOREIGN KEY (`id_event`)
    REFERENCES `ticketforge_db`.`concert_details` (`id_event`)
    ON DELETE CASCADE,
  CONSTRAINT `concert_artists_ibfk_2`
    FOREIGN KEY (`id_artist`)
    REFERENCES `ticketforge_db`.`artists` (`id_artist`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ticketforge_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ticketforge_db`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`reviews` (
  `id_review` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `id_event` INT NOT NULL,
  `rating` INT NOT NULL,
  `comment` TEXT NULL DEFAULT NULL,
  `seat_quality` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id_review`),
  INDEX `id_user` (`id_user` ASC) VISIBLE,
  INDEX `id_event` (`id_event` ASC) VISIBLE,
  CONSTRAINT `reviews_ibfk_1`
    FOREIGN KEY (`id_user`)
    REFERENCES `ticketforge_db`.`users` (`id_user`)
    ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2`
    FOREIGN KEY (`id_event`)
    REFERENCES `ticketforge_db`.`events` (`id_event`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ticketforge_db`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`tags` (
  `id_tag` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_tag`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ticketforge_db`.`review_tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`review_tags` (
  `id_review` INT NOT NULL,
  `id_tag` INT NOT NULL,
  PRIMARY KEY (`id_review`, `id_tag`),
  INDEX `id_tag` (`id_tag` ASC) VISIBLE,
  CONSTRAINT `review_tags_ibfk_1`
    FOREIGN KEY (`id_review`)
    REFERENCES `ticketforge_db`.`reviews` (`id_review`)
    ON DELETE CASCADE,
  CONSTRAINT `review_tags_ibfk_2`
    FOREIGN KEY (`id_tag`)
    REFERENCES `ticketforge_db`.`tags` (`id_tag`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ticketforge_db`.`sport_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`sport_details` (
  `id_event` INT NOT NULL,
  `home_team` VARCHAR(100) NOT NULL,
  `away_team` VARCHAR(100) NOT NULL,
  `scoreboard` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id_event`),
  CONSTRAINT `sport_details_ibfk_1`
    FOREIGN KEY (`id_event`)
    REFERENCES `ticketforge_db`.`events` (`id_event`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ticketforge_db`.`theater_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`theater_details` (
  `id_event` INT NOT NULL,
  `intermissions` TEXT NOT NULL,
  PRIMARY KEY (`id_event`),
  CONSTRAINT `theater_details_ibfk_1`
    FOREIGN KEY (`id_event`)
    REFERENCES `ticketforge_db`.`events` (`id_event`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ticketforge_db`.`theater_cast`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`theater_cast` (
  `id_event` INT NOT NULL,
  `id_cast_member` INT NOT NULL,
  PRIMARY KEY (`id_event`, `id_cast_member`),
  INDEX `id_cast_member` (`id_cast_member` ASC) VISIBLE,
  CONSTRAINT `theater_cast_ibfk_1`
    FOREIGN KEY (`id_event`)
    REFERENCES `ticketforge_db`.`theater_details` (`id_event`)
    ON DELETE CASCADE,
  CONSTRAINT `theater_cast_ibfk_2`
    FOREIGN KEY (`id_cast_member`)
    REFERENCES `ticketforge_db`.`cast_members` (`id_cast_member`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ticketforge_db`.`tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ticketforge_db`.`tickets` (
  `id_ticket` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `id_event` INT NOT NULL,
  `purchase_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `paid_price` DECIMAL(10,2) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_ticket`),
  INDEX `id_user` (`id_user` ASC) VISIBLE,
  INDEX `id_event` (`id_event` ASC) VISIBLE,
  CONSTRAINT `tickets_ibfk_1`
    FOREIGN KEY (`id_user`)
    REFERENCES `ticketforge_db`.`users` (`id_user`)
    ON DELETE CASCADE,
  CONSTRAINT `tickets_ibfk_2`
    FOREIGN KEY (`id_event`)
    REFERENCES `ticketforge_db`.`events` (`id_event`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
