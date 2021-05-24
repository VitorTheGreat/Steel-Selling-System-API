/* 
--- Start - Create user and give permissions
 
CREATE USER 'steeluser'@'localhost' IDENTIFIED BY 'leets123'; 
GRANT ALL PRIVILEGES ON steeldb . * TO 'steeluser'@'localhost'; 
FLUSH PRIVILEGES;

--- Finish - Create user and give permissions
*/

CREATE DATABASE steeldb;

USE steeldb;

select * from users;