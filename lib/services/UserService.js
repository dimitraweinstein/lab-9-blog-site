const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');

module.exports = class UserService {
  static async create(values) {
    const userAccount = await User.insert(values);
        
    const mailPreview = await sendEmail({
      to: userAccount.email,
      subject: 'Welcome to Blog Site!',
      html: `<h1>Wlecome, ${userAccount.firstName}</h1>`
    });
    return { ...userAccount, mailPreview };
  }

  static async delete(id) {
    const userAccount = await User.getById(id);
        
    const mailPreview = await sendEmail({
      to: userAccount.email,
      subject: 'Account Deleted!',
      html: `<h1>The Account Belonging to ${userAccount.firstName} Has Been Deleted.</h1>`
    });
    return { ...userAccount, mailPreview };
  }
};

