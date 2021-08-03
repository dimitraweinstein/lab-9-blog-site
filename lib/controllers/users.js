const { Router } = require('express');
const UserService = require('../services/UserService');
const User = require('../models/user');

module.exports = Router()

  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
        
      res.send(user);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const users = await User.getAll();

      res.send(users);
    } catch(err) {
      next(err);
    }
  });


