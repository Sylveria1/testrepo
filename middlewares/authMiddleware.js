const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Received Authorization header:', authHeader); // Log the received authorization header

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Failed to authenticate token:', err);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    console.log('Token authenticated, user:', user);
    req.user = user;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    console.log('Admin access required');
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
