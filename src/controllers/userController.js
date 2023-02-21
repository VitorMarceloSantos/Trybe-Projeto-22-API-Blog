const userService = require('../services/userService');
const { createToken } = require('../Tokens/jsonWebToken');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUser(email, password);
    if (user.length === 0) return res.status(400).json({ message: 'Invalid fields' });
    
    const token = await createToken(user);
    return res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ message: `${e}` });
  }
};

const newUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const { type, message } = await userService.addUser(displayName, email, password, image);
    if (type) return res.status(409).json({ message });

    const token = await createToken(email);
    return res.status(201).json({ token });
  } catch (e) {
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await userService.getAllUsers();
    // if (users.length === 0) return res.status(400).json({ message: 'Invalid fields' });
    
    return res.status(200).json(users);
} catch (e) {
    res.status(500).json({ e });
  }
};

const getUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = await userService.getUserId(Number(id));
    if (userId.type) return res.status(userId.type).json({ message: userId.message });
    
    return res.status(200).json(userId);
} catch (e) {
    res.status(500).json({ e });
  }
};

const deleteUser = async (req, res) => {
  const { data } = req.checked;
  const { id: userId } = data[0];
  try {
    await userService.deleteUser(userId);
    return res.status(204).end();
} catch (e) {
    res.status(500).json({ e });
  }
};

module.exports = { login, newUser, getAllUsers, getUserId, deleteUser };
