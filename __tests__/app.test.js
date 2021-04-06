const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

describe('amazon_ses routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


let order;
beforeEach (async () => {
  order = await Order.create({ email: 'stephen.tamiesie@gmail.com', 
    quantity: 10})
});

it('creates a new order in the database and sends an email', () => {
  return request(app)
  .post('/api/v1/orders')
  .send({ email: 'stephen.tamiesie@gmail.com', quantity: 10 })
  .then((res) => {
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'stephen.tamiesie@gmail.com',
      quantity: 10,
    });
  });
});
});