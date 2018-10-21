DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NULL,
	department_name VARCHAR(50) NULL,
	price INT(10) NULL,
	stock_quantity INT(100) NULL,
	PRIMARY KEY (item_id)
)

SELECT * FROM products;


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("tires", "auto", 1, 50),
("cameras", "electronics", 200, 10),
("chairs", "living", 50, 50),
("picture", "art", 5, 100),
("book", "craft", 3, 400),
("xbox", "entertainment", 300, 20),
("dishes", "kitchen", 2, 500),
("buzz", "toys", 9, 150),
("luggage", "travel", 80, 80),
("necklace", "jewelry", 1000, 5);