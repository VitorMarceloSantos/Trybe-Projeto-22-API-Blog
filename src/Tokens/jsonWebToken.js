const jwt = require('jsonwebtoken');

const configJWT = {
  algorithm: 'HS256',
  expiresIn: '10min',
};

const secret = process.env.JWT_SECRET || 'seuSegredoAqui';

const createToken = async (data) => {
  const token = jwt.sign({ data }, secret, configJWT);
  return token;
};

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const verify = jwt.verify(token, secret);
    req.checked = verify;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { createToken, verifyToken };
