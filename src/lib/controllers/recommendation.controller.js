const connection = require('../database/mysql.js');
const mysqlOperations = require('../database/operations.js');

class RecommendationController {
    static async getTopThreeMostOrderItems(req, res) {
        try {
            const orderLines = await mysqlOperations.selectAll(connection, 'Order_Line');
            const itemMap = new Map();

            for (let orderLine of orderLines) {
                itemMap.set(orderLine.itemID,
                    itemMap.has(orderLine.itemID) ? itemMap.get(orderLine.itemID) + orderLine.qty
                        : orderLine.qty)
            }

            const allItems = await mysqlOperations.selectAll(connection, 'Item');
            const top3items = Array.from(itemMap, ([itemID, qty]) => ({ itemID, qty }))
                .sort((a, b) => b.qty - a.qty)
                .slice(0, 3);

            for (let itemFromTop3 of top3items) {
                for (let item of allItems) {
                    if (itemFromTop3.itemID === item.id) itemFromTop3['name'] = item.name;
                }
            }


            return res.status(200).json(top3items);
        } catch (err) {
            console.log(`Failed to get top three recommendation items, err: ${err}`);
            return res.status(500).send("Interal server error");
        }
    }
}

module.exports = exports = RecommendationController;