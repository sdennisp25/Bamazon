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
	runSearch();
});

function runSearch() {
	inquirer
		.prompt({
			name: "action",
			type: "list",
			message: "Which item would you like to purchase?a",
			choices: [
				"tires",
				"cameras",
				"chairs",
				"picture frames",
				"coloring book",
				"xbox",
				"dishes",
				"buzz lightyear",
				"luggage",
				"necklace"
			]
		})

}