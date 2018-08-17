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
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function(data) {
        if (data.action == "View Products for Sale") {
            var query = connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
                console.table(res);
                connection.end();
            });
        } else if (data.action == "View Low Inventory") {
            var query = connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity <= 5", function(err, res) {
                console.table(res);
                connection.end();
            });
        } else if (data.action == "Add to Inventory") {
            var query = connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
                console.table(res);
                inquirer.prompt([{
                        type: "input",
                        name: "item",
                        message: "ID to Add to:"
                    },
                    {
                        type: "input",
                        name: "amount",
                        message: "Amount to Add:"
                    }
                ]).then(function(data) {
                    var newInv = parseInt(res[data.item - 1].stock_quantity) + parseInt(data.amount);
                    var query = connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newInv
                        },
                        {
                            item_id: data.item
                        }
                    ], function(err, res) {
                        if (err) {
                        	throw err;
                        } else {
                        	console.log("Stock Updated!");
                        	var query = connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
		                            console.table(res);
		                            connection.end();
		                        });
                        }
                    });
                });
            });
        } else if (data.action == "Add New Product") {
            inquirer.prompt([{
                    type: "input",
                    name: "product_name",
                    message: "Product Name:"
                },
                {
                    type: "list",
                    name: "department_name",
                    message: "Department:",
                    choices: ["Outerwear", "Footwear", "Bottoms", "Gear", "Accessories", "Other"]
                },
                {
                    type: "input",
                    name: "price",
                    message: "Price:"
                },
                {
                    type: "input",
                    name: "stock_quantity",
                    message: "Quantity:"
                }
            ]).then(function(data) {
                var query = connection.query("INSERT INTO products SET ?", data, function(err, res) {
                    if (err) {
                        console.log("Error! Could not add product.")
                    } else {
                        console.log("Added Successfully!")
                        var query = connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
                            console.table(res);
                            connection.end();
                        });
                    }
                });

            })
        }
    });
}