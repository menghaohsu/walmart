const fs = require('fs');
const path = require('path');
const connection = require('../database/mysql.js');
const mysqlOperations = require('../database/operations.js');

class DataController {
    static async initialize(req, res) {
        try {
            const customersRawData = fs.readFileSync(path.resolve(__dirname, '../constants/customers.json'));
            const itemsRawData = fs.readFileSync(path.resolve(__dirname, '../constants/items.json'));
            const ordersRawData = fs.readFileSync(path.resolve(__dirname, '../constants/orders.json'));
            const orderLinesRawData = fs.readFileSync(path.resolve(__dirname, '../constants/order_lines.json'));
            const customersData = JSON.parse(customersRawData).map(customer => [customer.id, customer.name]);
            const itemsData = JSON.parse(itemsRawData).map(item => [item.id, item.name]);
            const ordersData = JSON.parse(ordersRawData).map(order => [order.id, order.user_id]);
            const orderLinesData = JSON.parse(orderLinesRawData).map(orderLine => [orderLine.order_id, orderLine.item_id, orderLine.qty]);

            await mysqlOperations.insert(connection, 'Customer', ['id', 'name'], customersData);
            await mysqlOperations.insert(connection, 'Item', ['id', 'name'], itemsData);
            await mysqlOperations.insert(connection, 'Order', ['id', 'userID'], ordersData);
            await mysqlOperations.insert(connection, 'Order_Line', ['orderID', 'itemID', 'qty'], orderLinesData);

            return res.sendStatus(201);
        } catch (err) {
            console.log('something went wrong when initializing', err)
            return res.sendStatus(500);
        }
    }
}


module.exports = exports = DataController;