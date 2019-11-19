CREATE SCHEMA `axis` DEFAULT CHARACTER SET utf8 ;

CREATE USER 'axisuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'h2uORNmmqYo05pC2';
GRANT ALL PRIVILEGES ON `axis`.* TO 'axisuser'@'localhost';