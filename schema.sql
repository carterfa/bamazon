-- Drops the database if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the database --
CREATE DATABASE bamazon;

Console seed command:
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:seed:all

