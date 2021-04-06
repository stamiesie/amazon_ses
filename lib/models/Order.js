const pool = require('../utils/pool');

module.exports = class Order {
    id;
    email;
    quantity;

    constructor(row) {
        this.id = row.id;
        this.email = row.email;
        this.quantity = row.quantity;
    }

    static async create(orders)
     {
        console.log(orders)
        const {
            rows,
        } = await pool.query(
            `INSERT INTO orders (email, quantity) VALUES ($1, $2) RETURNING *`,
            [
                orders.email,
                orders.quantity,
            ]
        );
        return new Order(rows[0])
    }

    static async findAllOrders() {
        const {
            rows,
        } = await pool.query(
            'SELECT * FROM orders',
            []
        );
        return rows.map((row) => new Order(row));
    }

    static async getOrderById(id) {
        const {
            rows,
        } = await pool.query(
            'SELECT * FROM orders WHERE id=$1',
            [id]
        );
        return new Order(rows[0]);
    }
    
}