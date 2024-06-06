const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sequelize = require('sequelize');

// Login a user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        [sequelize.Op.or]: [{ username }, { email: username }]
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, role: user.user_role }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    console.log('Login successful, token:', token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
