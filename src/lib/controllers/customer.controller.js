const connection = require('../database/mysql.js');
const mysqlOperations = require('../database/operations.js');

class CustomerController {
    static async createCustomer(req, res) {
        const name = req.body.name;

        if (!name) return res.status(400).send("Invalid request");

        try {
            await mysqlOperations.insert(connection, 'Customer', ['name'], [[name]]);

            return res.sendStatus(201);
        } catch (err) {
            console.log(`Failed to create Customer, err: ${err}`);
            return res.status(500).send("Interal server error");
        }
    }

    static async updateCustomer(req, res) {
        const { id, newName } = req.body;

        if (!id || !newName) return res.status(400).send("Invalid request");

        try {
            await mysqlOperations.update(connection, 'Customer', ['name'], newName, [['id']], [id]);

            return res.sendStatus(204);
        } catch (er) {
            console.log(`Failed to update Customer, err: ${err}`);
            return res.status(500).send("Interal server error");
        }
    }
}

module.exports = exports = CustomerController;