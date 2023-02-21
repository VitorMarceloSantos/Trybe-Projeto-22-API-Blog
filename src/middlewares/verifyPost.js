const verifyPost = async (req, res, next) => {
  const { categoryIds, title, content } = req.body;
  if (!categoryIds || !title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  return next();
};

module.exports = { verifyPost };