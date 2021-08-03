const { insert } = require('../models/User');
const sendEmail = require('../utils/sendEmail');

module.exports = class UserService {
  static async create(values) {
    const userAccount = await insert(values);
        
    const mailPreview = await sendEmail({
      to: userAccount.email,
      subject: 'Welcome to Blog Site!',
      html: `<h1>Wlecome, ${userAccount.firstName}</h1>`
    });
    return { ...userAccount, mailPreview };
  }
};

