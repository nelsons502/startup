const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const authCookieName = 'token';
// include default values for the users, posts, and chats arrays
let users = [{email: "bruce@wayne.com", password: "darkknight", token: "robin"}];
let posts = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is the first post',
    code: 'print("Hello, World!")',
    type: 'python',
    timestamp: '2023-10-01T12:00:00Z',
    likes: 0,
  }
];
let chats = [
  {
    id: '1',
    title: 'General Chat',
    messages: [
      { role: 'user', content: 'Hello!', timestamp: '2023-10-01T12:00:00Z' },
      { role: 'assistant', content: 'Hi there!', timestamp: '2023-10-01T12:01:00Z' },
    ],
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-01T12:01:00Z',
  }
];


/* ========= AUTH ========= */

// Register
app.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;
  if (await getUser('email', email)) {
    return res.status(409).send({ msg: 'Existing user' });
  }
  const user = await createUser(email, password);
  setAuthCookie(res, user);
  res.send({ email: user.email });
});

// Login
app.put('/api/auth', async (req, res) => {
  const { email, password } = req.body;
  const user = await getUser('email', email);
  if (user && await bcrypt.compare(password, user.password)) {
    user.token = uuid.v4();
    setAuthCookie(res, user);
    return res.send({ email: user.email });
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Logout
app.delete('/api/auth', async (req, res) => {
  const token = req.cookies[authCookieName];
  const user = await getUser('token', token);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.send({});
});

// Get current user
app.get('/api/user/me', async (req, res) => {
  const token = req.cookies[authCookieName];
  const user = await getUser('token', token);
  user ? res.send({ email: user.email }) : res.status(401).send({ msg: 'Unauthorized' });
});

/* ========= POSTS ========= */

// Get all posts
app.get('/api/posts', verifyAuth, (_req, res) => res.send(posts));

// Create a new post
app.post('/api/posts', verifyAuth, (req, res) => {
  const post = {
    id: uuid.v4(),
    title: req.body.title,
    content: req.body.content,
    code: req.body.code,
    type: req.body.type,
    timestamp: new Date().toISOString(),
    likes: 0,
  };
  posts.unshift(post);
  res.send(post);
});

// Like a post
app.post('/api/posts/:id/like', verifyAuth, (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    post.likes++;
    res.send({ likes: post.likes });
  } else {
    res.status(404).send({ msg: 'Post not found' });
  }
});

// Download post code
app.get('/api/posts/:id/download', verifyAuth, (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).send({ msg: 'Post not found' });

  const filename = `${post.title.toLowerCase().replace(/\s+/g, '_')}.${extByType(post.type)}`;
  res.setHeader('Content-disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-Type', 'text/plain');
  res.send(post.code);
});

/* ========= CHATS ========= */

// Get all chats
app.get('/api/chats', verifyAuth, (_req, res) => res.send(chats));

// Get single chat
app.get('/api/chats/:id', verifyAuth, (req, res) => {
  const chat = chats.find(c => c.id === req.params.id);
  chat ? res.send(chat) : res.status(404).send({ msg: 'Chat not found' });
});

// Create new chat
app.post('/api/chats', verifyAuth, (req, res) => {
  const chat = {
    id: uuid.v4(),
    title: req.body.title || "New Chat",
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  chats.unshift(chat);
  res.send(chat);
});

// Add message to chat
app.post('/api/chats/:id/message', verifyAuth, (req, res) => {
  const chat = chats.find(c => c.id === req.params.id);
  if (!chat) return res.status(404).send({ msg: 'Chat not found' });

  const msg = {
    role: req.body.role,
    content: req.body.content,
    timestamp: new Date().toISOString()
  };

  chat.messages.push(msg);
  chat.updatedAt = new Date().toISOString();
  res.send(chat);
});

/* ========= QUOTES ========= */

// Proxy to external quote API
app.get('/api/quote', async (_req, res) => {
  try {
    const r = await fetch('https://dummyjson.com/quotes/random');
    const q = await r.json();
    res.send({ content: q.quote, author: q.author });
  } catch {
    res.status(500).send({ msg: 'Quote fetch failed' });
  }
});

/* ========= UTILITIES ========= */

function verifyAuth(req, res, next) {
  const token = req.cookies[authCookieName];
  const user = users.find(u => u.token === token);
  user ? next() : res.status(401).send({ msg: 'Unauthorized' });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  users.push(user);
  return user;
}

async function getUser(field, value) {
  return value ? users.find(u => u[field] === value) : null;
}

function setAuthCookie(res, user) {
  res.cookie(authCookieName, user.token, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

function extByType(type) {
  switch (type) {
    case 'python': return 'py';
    case 'javascript': return 'js';
    case 'java': return 'java';
    case 'c++': return 'cpp';
    default: return 'txt';
  }
}

app.listen(PORT, () => console.log(`🛡️  Server running on http://localhost:${PORT}`));