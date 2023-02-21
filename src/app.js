const express = require('express');

const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');
const { verifyLogin } = require('./middlewares/verifyLogin');
const { verifyUser } = require('./middlewares/verifyUser');
const { verifyToken } = require('./Tokens/jsonWebToken');
const { verifyCategory } = require('./middlewares/verifyCategory');
const { verifyPost } = require('./middlewares/verifyPost');
const { verifyUpdatePost } = require('./middlewares/verifyUpdatePost');

const app = express();

app.use(express.json());

// Users
app.get('/user', verifyToken, userController.getAllUsers);
app.get('/user/:id', verifyToken, userController.getUserId);

app.post('/user', verifyUser, userController.newUser);
app.post('/login', verifyLogin, userController.login);

app.delete('/user/me', verifyToken, userController.deleteUser);

// Categories
app.get('/categories', verifyToken, categoryController.getAllCategory);

app.post('/categories', verifyCategory, verifyToken, categoryController.addCategory);

// Posts
app.get('/post', verifyToken, postController.getAllPosts);
app.get('/post/search', verifyToken, postController.getSelectQuery);
app.get('/post/:id', verifyToken, postController.getPostId);

app.post('/post', verifyPost, verifyToken, postController.addPost);
app.put('/post/:id', verifyToken, verifyUpdatePost, postController.updatePost);

app.delete('/post/:id', verifyToken, postController.deletePost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
