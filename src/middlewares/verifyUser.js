function verifyEmail(email) {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (regex.test(email) === true) return true;
  return false;
}

const verifyUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8 || displayName === undefined) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  } if (verifyEmail(email) === false) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  } 
  if (password.length < 6) {
    return res.status(400)
    .json({ message: '"password" length must be at least 6 characters long' });
  }
  return next();
};

module.exports = { verifyUser };