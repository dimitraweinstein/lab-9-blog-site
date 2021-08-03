const User = require('../models/User.js');
const { Router } = require('express');
const sendEmail = require('../utils/sendEmail.js');

module.exports = Router()

  .post('/', async (req, res, next) => {
    try {
      const user = await User.insert(req.body);
        
      const mailPreview = await sendEmail({
        to: user.email,
        subject: 'Welcome to Blog Site!',
        html: `<h1>Wlecome, ${user.firstName}</h1>`
      });

      res.send({ ...user, mailPreview });
    } catch(err) {
      next(err);
    }
  });


