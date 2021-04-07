const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');
// const OrderService = require('../lib/services/OrderService');
jest.mock('../lib/utils/aws-ses.js');

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

it('GETS all orders from the DB', () => {
  return request(app)
  .get('/api/v1/orders')
  .then((res) => {
    expect(res.body).toEqual([{
      id: '1',
      email: 'stephen.tamiesie@gmail.com',
      quantity: 10,
    }]);
  });
});

it('GETS a single order by ID from the DB', () => {
  return request(app)
  .get('/api/v1/orders/1')
  .then((res) => {
    expect(res.body).toEqual({
      id: '1',
      email: 'stephen.tamiesie@gmail.com',
      quantity: 10,
    });
  });
});

it('UPDATES a single order by ID in the DB', () => {
  return request(app)
  .put('/api/v1/orders/1')
  .send({ quantity: 5 })
  .then((res) => {
    expect(res.body).toEqual({
      id: '1',
      email: 'stephen.tamiesie@gmail.com',
      quantity: 5,
    });
  });
});

});