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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.getById(id);

      res.send(user);
    } catch(err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, userName, pin } = req.body;

      const updatedUser = await User.updateById(id, { firstName, lastName, email, userName, pin });
            
      res.send(updatedUser);
    } catch(err) {
      next(err);
    }
  });


