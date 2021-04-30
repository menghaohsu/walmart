class MysqlOperations {
    static async insert(connection, tableName, columns, data) {
        let columnsStr = '';

        columns.forEach(column => columnsStr += `${column},`)

        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO ?? (${columnsStr.slice(0, -1)}) VALUES ?;`, [tableName, data], function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }

                console.log(`Successfully insert into ${tableName} table`);
                resolve(result);
            })
        })
    }

    static async update(connection, tableName, column, newValue, conditionColumn, conditionValue) {
        let queryStr = `UPDATE ?? SET ?? = ? WHERE ?? = ?`;
        let queryInput = [tableName, column, newValue, conditionColumn[0], conditionValue[0]];

        if (conditionColumn.length > 1) {
            for (let i = 1; i < conditionColumn.length; i++) {
                queryStr += ` AND ?? = ?`;
                queryInput.push(conditionColumn[i]);
                queryInput.push(conditionValue[i]);
            }
        }

        return new Promise((resolve, reject) => {
            connection.query(queryStr, queryInput, function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }

                console.log(`Successfully update at ${tableName} table`);
                resolve(result);
            })
        })
    }

    static async select(connection, tableName, conditionColumn, conditionValue) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ?? WHERE ?? = ?;`, [tableName, conditionColumn, conditionValue], function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result)
            })
        })
    }

    static async selectAll(connection, tableName, conditionColumn, conditionValue) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ??;`, [tableName], function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result)
            })
        })
    }

    static async delete(connection, tableName, conditionColumn, conditionValue) {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM ?? WHERE ?? = ?;`, [tableName, conditionColumn, conditionValue], function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result)
            })
        })
    }
}

module.exports = exports = MysqlOperations;