const userService = require('../services/userService');
const categoryService = require('../services/categoryService');
const postService = require('../services/postService');

const verifyCategory = async (categoryIds) => {
  let contError = 0;

  const verifyCateg = categoryIds.map(async (categoryId) => {
    const getCategory = await categoryService.getCategoryId(categoryId);
    if (getCategory.length === 0) contError += 1;
  });

  await Promise.all(verifyCateg);
  return contError;
};

const addPost = async (req, res) => {
  try {
  const { title, content, categoryIds } = req.body;
    const verify = await verifyCategory(categoryIds);
    if (verify > 0) return res.status(400).json({ message: 'one or more "categoryIds" not found' });

    const { data } = req.checked;
    const { dataValues: { id } } = await userService.getUserEmail(data[0].email);
    const posts = await postService.addPost({ userId: id, title, content });
    const { dataValues } = posts;
    categoryIds.forEach(async (categoryId) => {
      await postService.addPostCategory({ postId: dataValues.id, categoryId });
    });

    return res.status(201).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postService.getAllPosts();
    if (allPosts.length === 0) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(allPosts);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getPostId = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = await postService.getPostId(id);
    if (postId === null) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(postId);
  } catch (e) {
    res.status(500).json(e);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { title, content } = req.body;

    const getId = await postService.getPostId(postId);
    const { userId: idPostUser } = getId.dataValues;
    const { data } = req.checked;
    const { id: idUser } = data[0];

    if (idUser !== idPostUser) return res.status(401).json({ message: 'Unauthorized user' });

    await postService.updatePost({ id: postId, title, content });
    const upPost = await postService.getPostId(postId);
    return res.status(200).json(upPost);
  } catch (e) {
    res.status(500).json(e);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id: postId } = req.params;

    const getId = await postService.getPostId(postId);
    if (getId === null) return res.status(404).json({ message: 'Post does not exist' });

    const { userId: idPostUser } = getId.dataValues;
    const { data } = req.checked;
    const { id: idUser } = data[0];
    if (idUser !== idPostUser) return res.status(401).json({ message: 'Unauthorized user' });

    await postService.deletePost({ id: postId });
    return res.status(204).end();
  } catch (e) {
    res.status(500).json(e);
  }
};

const getSelectQuery = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await postService.getSelectQuery(q);
    if (posts.message) return res.status(posts.status).json({ message: posts });

    return res.status(posts.status).json(posts.post);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = { addPost, getAllPosts, getPostId, updatePost, deletePost, getSelectQuery };