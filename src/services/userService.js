const { User } = require('../models');

const getUser = async (email, password) => {
  const user = await User.findAll({
    where: { email, password },
    attributes: { exclude: ['password'] },
  });
  return user;
};

const addUser = async (displayName, email, password, image) => {
  const verifyUser = await User.findAll({ where: { email } });
  if (verifyUser.length !== 0) return { type: 400, message: 'User already registered' };

  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getUserId = async (id) => {
  const userId = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (userId === null) return { type: 404, message: 'User does not exist' };

  return userId;
};

const getUserEmail = async (email) => {
  const userEmail = await User.findOne({ where: { email } });
  if (userEmail === null) return { type: 404, message: 'User does not exist' };

  return userEmail;
};

const deleteUser = async (id) => {
  const delUser = await User.destroy({ where: { id } });
  return delUser;
};

module.exports = { getUser, addUser, getAllUsers, getUserId, getUserEmail, deleteUser };
