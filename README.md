# Bamazon

## Getting Started

`npm install`

## Commands

`node bamazonCustomer.js` - - Customer

`node bamazonManager.js` - - Manager

### Bamazon

Bamazon is a Command Line Application simulating store-like operations. The `bamazonCustomer.js` mode will allow users to "buy" products from a list and the amount they desire. The `bamazonManager.js` mode will allow users to view all products for sale, view products that have low inventory, add to product inventory, and add new products. 

### Instructions

** Customer **
   * Choose the item ID of the product you would like to purchase. Enter ID of product. Then Enter quantity. Total amount spent will be displayed.
     * If there isn't enough in stock to fulfill your order, an _Insufficient Stock Error_ will appear. After the error, you will be taken back to the start and see the full list of all products.

** Manager **
   * Select an option in the given list (View Products for Sale, View Low Inventory, Add to Inventory, Add New Product).
     * _View Products for Sale_
	   * Shows all available products
	 * _View Low Inventory_
	   * Shows all products with an inventory count of 5 or less. 
	 * _Add to Inventory_
       * Shows the list of all products. Enter the item ID of the product you would like to add inventory to. Then enter the amount you would like to add.
     * _Add New Product_
       * Enter product name. Then select department. If your new product doesn't fit into any department, select _Other._ Then enter the price of the new product. Lastly, enter the quantity of the product.




