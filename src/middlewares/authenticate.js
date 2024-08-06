const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret'; // Ensure this matches the secret used in your backend

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send({ success: false, message: 'Access token required' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).send({ success: false, message: 'Invalid token' });
    req.user = user;
    next();
  });
};
