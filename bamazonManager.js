var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        runApp();
    }
});

function runApp() {
	inquirer.prompt([
		{
			type: "list",
	        name: "action",
			message: "What would you like to do?",
			choices: ["View Products for Sale" , "View Low Inventory" , "Add to Inventory" , "Add New Product"]
		}	
	]).then(function(data) {
		if(data.action == "View Products for Sale") {
			var query = connection.query("SELECT item_id, product_name, price, stock_quantity FROM products" , function(err , show_items) {
				console.table(show_items);
			})
		} else if(data.action == "View Low Inventory") {
			var query = connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity <= 5" , function(err , low_inv) {
				console.table(low_inv);
			});
		} else if(data.action == "Add to Inventory") {
			var query = connection.query("SELECT item_id, product_name, stock_quantity FROM products" , function(err , show_items) {
				console.table(show_items);
				inquirer.prompt([
					{
						type: "input",
						name: "addInv",
						message: "Give ID of product you would like to add Inventory to."
					},
					{
						type: "input",
						name: "addAmount",
						message: "What amount would you like to add to the Inventory?"
					}
				]).then(function(data) {
					var query = connection.query("UPDATE products SET ? WHERE ?" , [
						{
							stock_quantity: addAmount
						},
						{
							item_id: addID
						}
					] , function(err , res) {
						console.log("Added to Inventory.")
					});
				});
			});
		}
		connection.end();
	});
}