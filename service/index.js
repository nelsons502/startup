const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const authCookieName = 'token';
// include default values for the users, posts, and chats arrays
let users = [
    {
        email: "bruce@wayne.com", 
        password: bcrypt.hashSync("darkknight", 10), 
        token: "robin"
    },
    {
        email: "bob",
        password: bcrypt.hashSync("hi", 10),
        token: "default"
    }
];
let posts = [
    {
        id: 1,
        title: "Post Title 1",
        content: "Content of the post goes here...",
        timestamp: "2025-02-12 10:30 AM",
        likes: 0,
        likedBy: [],
        code: "# This is dummy code\nprint('Hello, World!')",
        type: "python",
      },
      {
        id: 2,
        title: "Post Title 2",
        content: "Another example post content here...",
        timestamp: "2025-02-13 11:00 AM",
        likes: 0,
        likedBy: [],
        code: "// This is dummy code\nconsole.log('Hello, World!');",
        type: "javascript",
      },
      {
        id: 3,
        title: "Post Title 3",
        content: "Third post sample with simple content.",
        timestamp: "2025-02-14 09:15 AM",
        likes: 0,
        likedBy: [],
        code: '// This is dummy code\nclass Main {\n\tpublic static void main() {\nSystem.out.println("Hello, World!");\n}\n}',
        type: "java",
      },
      {
        id: 4,
        title: "Post Title 4",
        content: "More placeholder text for demonstration.",
        timestamp: "2025-02-15 08:45 AM",
        likes: 0,
        likedBy: [],
        code: '// This is dummy code\n#include <iostream>\nusing namespace std;\nint main() {\ncout << "Hello, World!";\nreturn 0;\n}',
        type: "c++",
      },
      {
        id: 5,
        title: "Post Title 5",
        content: "Yet another post with fake data.",
        timestamp: "2025-02-16 03:20 PM",
        likes: 0,
        likedBy: [],
        code: "# This is dummy code\nprint('Hello, World!')",
        type: "python",
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
    owner: 'bruce@wayne.com',
  }
];

let router = express.Router();
app.use('/api', router);

/* ========= AUTH ========= */

// Register
router.post('/auth/register', async (req, res) => {
  if (await getUser('email', req.body.email)) {
    return res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user);
    return res.send({ email: user.email });
  }
});

// Login
router.put('/auth/login', async (req, res) => {
  console.log(req.body);
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
router.delete('/auth/logout', async (req, res) => {
  const token = req.cookies[authCookieName];
  const user = await getUser('token', token);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

/* ========= POSTS ========= */

// Get all posts
router.get('/posts', verifyAuth, (req, res) => {
  console.log('getting all posts, server');
  res.send(posts); // any logged-in user can see all posts
});

// Create a new post
router.post('/posts', verifyAuth, (req, res) => {
  const post = {
    id: uuid.v4(),
    title: req.body.title,
    content: req.body.content,
    likedBy: [],
    code: req.body.code,
    type: req.body.type,
    timestamp: new Date().toISOString(),
    likes: 0,
    owner: req.body.owner,
  };
  posts.unshift(post);
  res.send(post);
});

// Like a post
router.post('/posts/:id/like', verifyAuth, (req, res) => {
  const post = posts.find(p => String(p.id) === String(req.params.id));
  if (post) {
    const token = req.cookies[authCookieName];
    const user = users.find(u => u.token === token);
    if (!post.likedBy.includes(user.email)) { // make sure user can only like once
        post.likedBy.push(user.email);
        post.likes++;
    }
    res.send({ likes: post.likes });
  } else {
    res.status(404).send({ msg: 'Post not found' });
  }
});

// Download post code
router.get('/posts/:id/download', verifyAuth, (req, res) => {
  const post = posts.find(p => String(p.id) === String(req.params.id));
  if (!post) return res.status(404).send({ msg: 'Post not found' });

  const filename = `${post.title.toLowerCase().replace(/\s+/g, '_')}.${extByType(post.type)}`;
  res.setHeader('Content-disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-Type', 'text/plain');
  res.send({ code: post.code, filename: filename });
});

// Get single post
router.get('/posts/:id', verifyAuth, (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).send({ msg: 'Post not found' });

  const token = req.cookies[authCookieName];
  const user = users.find(u => u.token === token);
  // if owner, user can see all details
  if (post.owner === user.email) return res.send(post);
  // if not owner, user can only see title, content, timestamp, likes
  const { title, content, timestamp, likes } = post;
  res.send({ title, content, timestamp, likes });
});

/* ========= CHATS ========= */

// Get all chats by user
router.get('/chats', verifyAuth, (req, res) => {
  const token = req.cookies[authCookieName];
  const user = users.find(u => u.token === token);
  const userChats = chats.filter(c => c.owner === user.email);
  res.send(userChats);
});

// Get single chat
router.get('/chats/:id', verifyAuth, (req, res) => {
  const chat = chats.find(c => c.id === req.params.id);
  const token = req.cookies[authCookieName];
  const user = users.find(u => u.token === token);
  if (chat && chat.owner === user.email) return res.send(chat);
  // if not owner, user can only see title, messages, createdAt, updatedAt
  return res.status(403).send({ msg: 'Forbidden' });
});

// Create new chat
router.post('/chats', verifyAuth, (req, res) => {
  const token = req.cookies[authCookieName];
  const user = users.find(u => u.token === token);
  const chat = {
    id: uuid.v4(),
    title: req.body.title || "New Chat",
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    owner: user.email
  };
  chats.unshift(chat);
  res.send(chat);
});

// Change chat title
router.put('/chats/:id/title', verifyAuth, (req, res) => {
    const chat = chats.find(c => c.id === req.params.id);
    if (!chat) return res.status(404).send({ msg: 'Chat not found' });
    
    chat.title = req.body.title;
    chat.updatedAt = new Date().toISOString();
    res.send(chat);
    }
);

// Delete chat
router.delete('/chats/:id', verifyAuth, (req, res) => {
  const chatIndex = chats.findIndex(c => c.id === req.params.id);
  if (chatIndex !== -1) {
    chats.splice(chatIndex, 1);
    return res.status(204).end();
  }
  res.status(404).send({ msg: 'Chat not found' });
});

// Add message to chat
router.post('/chats/:id/message', verifyAuth, (req, res) => {
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
  // Move the updated chat to the top
  const chatIndex = chats.findIndex(c => c.id === req.params.id);
  if (chatIndex !== -1) {
    const updated = chats.splice(chatIndex, 1)[0];
    chats.unshift(updated);
  }
});

/* ========= QUOTES ========= */

// Proxy to external quote API
router.get('/quote', async (_req, res) => {
  try {
    const r = await fetch('https://dummyjson.com/quotes/random');
    const q = await r.json();
    res.send({ quote: q.quote, author: q.author });
  } catch {
    res.status(500).send({ msg: 'Quote fetch failed' });
  }
});

/* ========= DEFAULT ERROR HANDLER ========= */
app.use(function(err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

/* ========= DEFAULT PAGE ========= */
app.use((_req, res) => {
  console.log('default page');
  res.sendFile('index.html', { root: 'public' });
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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));