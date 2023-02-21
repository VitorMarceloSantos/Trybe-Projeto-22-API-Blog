const { BlogPost, PostCategory, User, Category } = require('../models');
const { Sequelize: { Op } } = require('../models');

const addPost = async ({ userId, title, content }) => {
  const newPost = await BlogPost.create({ userId, title, content });
  return newPost;
};

const addPostCategory = async ({ postId, categoryId }) => {
 const newCategory = PostCategory.create({ postId, categoryId });
 return newCategory;
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return allPosts;
};

const getPostId = async (id) => {
  const postId = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return postId;
};

const updatePost = async ({ id, title, content }) => {
  const upPost = await BlogPost.update({ title, content }, { where: { id } });
  return upPost;
};

const deletePost = async ({ id }) => {
  const post = await BlogPost.destroy({ where: { id } });
  return post;
};

const getSelectQuery = async (query) => {
  const post = await BlogPost.findAll({
    where: { [Op.or]: [{ 
      title: { [Op.like]: `%${query}%` }, 
    }, { 
      content: { [Op.like]: `%${query}%` },
    }] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) return { status: 404, message: 'Post does not exist' };
  return { status: 200, post };
};

module.exports = { 
  addPost, addPostCategory, getAllPosts, getPostId, updatePost, deletePost, getSelectQuery,
};