var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",

	port: 3306,

	user: "root",

	password: "password",
	database: "bamazon"
});

connection.connect(function (err) {
	if (err) throw err;
	displayInventory();
	initialPurchase();
});


// displayInventory();
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	}
	else {
		return 'Please enter a valid number.';
	}

}

function initialPurchase() {
	inquirer
		.prompt([
			{
				type: "input",
				name: "item_id",
				message: "Enter the ID number of the item you would like to purchase?",
				validate: validateInput,
				filter: Number
			},
			{
				type: "input",
				name: "quantity",
				message: "Enter the quantity you would like?",
				validate: validateInput,
				filter: Number

			}]).then(function (input) {
				var item = input.item_id;
				var quantity = input.quantity;
				var queryStr = 'SELECT * FROM products WHERE ?';

				connection.query(queryStr, { item_id: item }, function (err, data) {
					if (err) throw err;

					//test the condition to validate users choice for item ID
					if (data.length === 0) {
						console.log('ERROR: Please enter a valid Item ID.');
					}
					else {
						console.log("\n-------------------------------------------------------------\n");
						console.log("Item ID Validated!");
					}

					var productData = data[0];
					//will run the conditions if the customers choice is a valid ID choice
					if (quantity <= productData.stock_quantity) {
						console.log('We have the item in stock!');
						console.log("\n-------------------------------------------------------------\n");

						//This will update the inventory in products list
						var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
						connection.query(updateQueryStr, function (err, data) {
							if (err) throw err;

							console.log("\n-------------------------------------------------------------\n");
							console.log('Your order has been placed! Your total is $' + productData.price * quantity);
							console.log('Thank you!');
							console.log("\n-------------------------------------------------------------\n");

							connection.end();
						})
					}
					else {
						console.log("\n-------------------------------------------------------------\n");
						console.log('Insufficient Quantity! We do not have enough.');
						console.log('Please modify your order.');
						console.log("\n-------------------------------------------------------------\n");
						connection.end();
					}
				})
			})
};

//this displays the list of items in sql folder for products
function displayInventory() {
	queryStr = 'SELECT * FROM products';
	connection.query(queryStr, function (err, data) {
		console.log("\n");
		for (var i = 0; i < data.length; i++) {
			var stringOutput = "ID: " + data[i].item_id + " || Price: $" + data[i].price + " || Product: " + data[i].product_name + " || Department: " + data[i].department_name;

			console.log(stringOutput);
		}
		console.log("---------------------------------------------------------------------\n");
	})
}