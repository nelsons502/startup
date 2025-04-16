const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('focus-coding');

const userCollection = db.collection('users');
const postCollection = db.collection('posts');
const chatCollection = db.collection('chats');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB');
  } catch (ex) {
    console.error(`MongoDB connection failed: ${ex.message}`);
    process.exit(1);
  }
})();

// User Functions
function getUser(email) {
  return userCollection.findOne({ email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token });
}

function addUser(user) {
  return userCollection.insertOne(user);
}

function updateUser(user) {
  return userCollection.updateOne({ email: user.email }, { $set: user });
}

// Post Functions
function getAllPosts() {
  return postCollection.find({}).toArray();
}

function getPostById(id) {
  return postCollection.findOne({ id });
}

function addPost(post) {
  return postCollection.insertOne(post);
}

function updatePost(post) {
  return postCollection.updateOne({ id: post.id }, { $set: post });
}

function deletePost(post) {
  return postCollection.deleteOne({ id: post.id });
}

function likePost(postId, userEmail) {
  return postCollection.updateOne(
    { id: postId },
    { $addToSet: { likedBy: userEmail }, $inc: { likes: 1 } }
  );
}
function downloadPostCode(postId) {
  return postCollection.findOne({ id: postId }, { projection: { code: 1 } });
}
function getPostsByUser(ownerEmail) {
  return postCollection.find({ owner: ownerEmail }).sort({ updatedAt: -1 }).toArray();
}

// Chat Functions
function getChatsByUser(ownerEmail) {
  return chatCollection.find({ owner: ownerEmail }).sort({ updatedAt: -1 }).toArray();
}

function getChatById(id) {
  return chatCollection.findOne({ id });
}

function addChat(chat) {
  return chatCollection.insertOne(chat);
}

function updateChat(chat) {
  return chatCollection.updateOne({ id: chat.id }, { $set: chat });
}

function deleteChat(id) {
  return chatCollection.deleteOne({ id });
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
  likePost,
  downloadPostCode,
  getPostsByUser,
  getChatsByUser,
  getChatById,
  addChat,
  updateChat,
  deleteChat,
};
