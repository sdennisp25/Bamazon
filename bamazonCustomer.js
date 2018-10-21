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
	// if (err) throw err;
	initialPurchase();
});


function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	}
	else {
		return 'Please enter a whole non-zero number.';
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
					// if (err) throw err;
					if (data.length === 0) {
						console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
						displayInventory();
					}

					else {
						console.log("you got a valid ID!");
					}

					var productData = data[0];
					if (quantity <= productData.stock_quantity) {
						console.log('We have the item in stock!');

						var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
						// Update the inventory
						connection.query(updateQueryStr, function (err, data) {
							// if (err) throw err;

							console.log('Order placed! Your total is $' + productData.price * quantity);
							console.log('Thank you for shopping with us!');
							console.log("\n---------------------------------------------------------------------\n");

							connection.end();
						})
					}
					else {
						console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
						console.log('Please modify your order.');
						console.log("\n---------------------------------------------------------------------\n");

						displayInventory();
					}
				})
			})
};

function displayInventory() {
	queryStr = 'SELECT * FROM products';
	connection.query(queryStr, function (err, data) {
		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '\n';
			strOut += 'Item ID: ' + data[i].item_id + '  ||  ';
			strOut += 'Product: ' + data[i].product_name + '  ||  ';
			strOut += 'Department: ' + data[i].department_name + '  ||  ';
			strOut += 'Price: $' + data[i].price;

			console.log(strOut);
		}

		console.log("---------------------------------------------------------------------\n");

		initialPurchase();
	})
}

function runBamazon() {

	displayInventory();
}
runBamazon();