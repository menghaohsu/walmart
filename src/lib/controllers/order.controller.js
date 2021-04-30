const connection = require('../database/mysql.js');
const mysqlOperations = require('../database/operations.js');

class OrderController {
    static async createOrder(req, res) {
        const { orders, customerID } = req.body;
        if (!customerID || !orders || !orders.length) return res.status(400).send("Invalid request");

        try {
            // Verify Customer existed
            const customer = await mysqlOperations.select(connection, 'Customer', ['id'], customerID);
            if (!customer.length) return res.status(400).send("Invalid request");

            // Verify Item existed
            for (let order of orders) {
                if (!order.itemID || !order.qty) return res.status(400).send("Invalid request");
                const item = await mysqlOperations.select(connection, 'Item', ['id'], order.itemID);
                if (!item.length) return res.status(400).send("Invalid request");
            }

            const newOrder = await mysqlOperations.insert(connection, 'Order', ['userID'], [[parseInt(customerID)]]);
            const orderData = orders.map(order => [newOrder.insertId, order.itemID, order.qty]);

            await mysqlOperations.insert(connection, 'Order_Line', ['orderID', 'itemID', 'qty'], orderData);

            return res.sendStatus(201);
        } catch (err) {
            console.log(`Failed to create Order, err: ${err}`);
            return res.status(500).send("Interal server error");
        }
    }

    static async updateOrder(req, res) {
        const { orderID, itemID, qty } = req.body;

        try {
            const orderLines = await mysqlOperations.select(connection, 'Order_Line', ['orderID'], orderID);
            let itemExistedInPreviousOrder = false;

            for (let orderLine of orderLines) {
                if (orderLine.itemID === itemID) {
                    if (orderLine.qty === qty) {
                        return res.sendStatus(204);
                    }
                    itemExistedInPreviousOrder = true;
                    break;
                }
            }

            if (itemExistedInPreviousOrder) {
                await mysqlOperations.update(connection, 'Order_Line', ['qty'], qty, [['itemID'], ['orderID']], [itemID, orderID]);
            } else {
                await mysqlOperations.insert(connection, 'Order_Line', ['orderID', 'itemID', 'qty'], [[orderID, itemID, qty]]);
            }

            return res.sendStatus(204);
        } catch (err) {
            console.log(`Failed to update Order, err: ${err}`);
            return res.status(500).send("Interal server error");
        }
    }

    static async deleteOrder(req, res) {
        const { orderID } = req.body;

        if (!orderID) return res.status(400).send("Invalid request");

        try {
            await mysqlOperations.delete(connection, 'Order_Line', ['orderID'], orderID);
            await mysqlOperations.delete(connection, 'Order', ['id'], orderID)

            return res.sendStatus(204);
        } catch (err) {
            console.log(`Failed to delete Order, err: ${err}`);
            return res.status(500).send("Interal server error");
        }
    }
}

module.exports = exports = OrderController;