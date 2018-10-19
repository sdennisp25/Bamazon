DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL,
	product_name VARCHAR(50) NULL,
	dapartment_name VARCHAR(50) NULL,
	price INT(10) NULL,
	stock_quantity INT(100) NULL,
	PRIMARY KEY (item_id)
)

SELECT * FROM products;


INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("tires", "auto", 1, 50);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("cameras", "electronics", 200, 10);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("chairs", "living", 50, 50);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("picture frames", "art", 5, 100);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("coloring book", "craft", 3, 400);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("xbox", "entertainment", 300, 20);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("dishes", "kitchen", 2, 500);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("buzz lightyear", "toys", 9, 150);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("luggage", "travel", 80, 80);

INSERT INTO products (product_name, dapartment_name, price, stock_quantity)
VALUES ("necklace", "jewelry", 1000, 5);