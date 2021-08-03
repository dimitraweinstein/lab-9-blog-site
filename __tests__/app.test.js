const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/user');

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

  it('gets all users via GET', async () => {
    const user1 = await User.insert({
      id: '1',
      firstName: 'Sandra',
      lastName: 'Bland',
      email: 'sandy.bland@sayhername.com',
      userName: 'SBland2015',
      pin: '0713'
    });

    const user2 = await User.insert({
      id: '2',
      firstName: 'Elijah',
      lastName: 'McClain',
      email: 'e.mcclain2019@icantbreathe.com',
      userName: 'JustDifferent_Introvert23',
      pin: '0830'
    });

    const user3 = await User.insert({
      id: '3',
      firstName: 'Philando',
      lastName: 'Castille',
      email: 'philando_dad32@imaneducator.edu',
      userName: 'PC_loveskids2016',
      pin: '0706'
    });

    return request(app).get('/api/v1/users')
      .then((res) => {
        expect(res.body).toEqual([user1, user2, user3]);
      });
  });

  it('gets one user by id via GET', async () => {
    const user = await User.insert({
      id: '2',
      firstName: 'Elijah',
      lastName: 'McClain',
      email: 'e.mcclain2019@icantbreathe.com',
      userName: 'JustDifferent_Introvert23',
      pin: '0830'
    });

    const res = await request(app).get(`/api/v1/users/${user.id}`);

    expect(res.body).toEqual(user);
  });

  it('updates user info by id via PUT', async () => {
    const user = await User.insert({
      id: '3',
      firstName: 'Philando',
      lastName: 'Castille',
      email: 'philando_dad32@imaneducator.edu',
      userName: 'PC_loveskids2016',
      pin: '0706'
    });

    const res = await request(app)
      .put(`/api/v1/users/${user.id}`)
      .send({ userName: 'P_Castille_BLM' });
    
    expect(res.body).toEqual({ ...user, userName: 'P_Castille_BLM' });
  });

});

