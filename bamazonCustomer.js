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
    var query = connection.query("SELECT item_id, product_name, price FROM products", function(err, show_items) {

        //display as table
        console.table(show_items);

        inquirer.prompt([{
                type: "input",
                name: "buyID",
                message: "Select item ID of the product you would like to purchase.",
            },
            {
                type: "input",
                name: "amount",
                message: "Quantity:"
            }

        ]).then(function(data) {
        	var query = connection.query("SELECT * FROM products", function(err, show_items) {
        		console.log(show_items);
            var stockNum = show_items[data.buyID - 1].stock_quantity;
            var newStock = stockNum - data.amount;
            if (stockNum < data.amount) {
                console.log("\n Insufficient Stock \n");
                runApp();
            } else {
                var query = connection.query("UPDATE products SET ? WHERE ? ", [{
                            stock_quantity: newStock
                        },
                        {
                            item_id: data.buyID
                        }
                    ],
                    function(err, res) {
                        var total = show_items[data.buyID - 1].price * data.amount;
                        console.log("Total Amount Spent: $" + total);
                        //end connection
                        connection.end();
                    });
            }
        });
        });
    });
}