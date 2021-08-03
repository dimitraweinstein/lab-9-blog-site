const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('user account blog-site routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a user account on blog site via POST', async () => {
    const user = {
      firstName: 'Sandra',
      lastName: 'Bland',
      email: 'sandy.bland@sayhername.com',
      userName: 'SBland2015',
      pin: '0713'
    };

    const res = await request(app)
      .post('/api/v1/users')
      .send(user);
    
    expect(res.body).toEqual({
      id: '1',
      ...user,
      mailPreview: expect.any(String)
    });
  });

});

