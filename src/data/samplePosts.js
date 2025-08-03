// Sample posts for InkWell demo
export const samplePosts = [
  {
    id: 'sample-1',
    title: 'Getting Started with React Hooks: A Complete Guide',
    slug: 'getting-started-react-hooks-complete-guide',
    content: `# Getting Started with React Hooks

React Hooks revolutionized how we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and learn how to leverage them effectively.

## What are React Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 and have become the standard way to write React components.

## useState Hook

The \`useState\` hook is the most fundamental hook for managing state in functional components:

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

The \`useEffect\` hook handles side effects in your components:

\`\`\`javascript
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // Empty dependency array means this runs once

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
\`\`\`

## Best Practices

1. **Always use the dependency array** with useEffect
2. **Extract custom hooks** for reusable logic
3. **Keep state close to where it's used**
4. **Use multiple useState calls** for unrelated state

## Conclusion

React Hooks provide a powerful and flexible way to build components. Start with useState and useEffect, then explore other hooks as your applications grow in complexity.

Happy coding! 🚀`,
    excerpt: 'Learn the fundamentals of React Hooks with practical examples and best practices for modern React development.',
    category: 'React',
    tags: ['react', 'hooks', 'javascript', 'frontend', 'tutorial'],
    status: 'published',
    authorId: 'demo-user',
    authorName: 'Sarah Chen',
    authorEmail: 'sarah@example.com',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 42,
    comments: 8,
    views: 256
  },
  {
    id: 'sample-2',
    title: 'Building RESTful APIs with Node.js and Express',
    slug: 'building-restful-apis-nodejs-express',
    content: `# Building RESTful APIs with Node.js and Express

Creating robust APIs is essential for modern web development. Let's build a complete REST API using Node.js and Express.

## Setting Up the Project

First, initialize your project and install dependencies:

\`\`\`bash
npm init -y
npm install express mongoose cors helmet
npm install -D nodemon
\`\`\`

## Basic Express Server

Create a simple Express server:

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Creating CRUD Operations

Let's implement a simple blog API:

\`\`\`javascript
// Sample data store (use a database in production)
let posts = [];
let nextId = 1;

// GET all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// GET single post
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// POST new post
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: nextId++,
    title,
    content,
    author: author || 'Anonymous',
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});
\`\`\`

## Error Handling

Implement global error handling:

\`\`\`javascript
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
\`\`\`

## Testing with Postman

Test your API endpoints:
- GET http://localhost:3000/api/posts
- POST http://localhost:3000/api/posts
- GET http://localhost:3000/api/posts/1

## Next Steps

1. Add database integration with MongoDB
2. Implement authentication with JWT
3. Add input validation with Joi
4. Create comprehensive tests
5. Deploy to production

Building APIs with Express is straightforward and powerful. Start simple and add complexity as needed!`,
    excerpt: 'Learn how to create robust RESTful APIs using Node.js and Express with practical examples and best practices.',
    category: 'Backend',
    tags: ['nodejs', 'express', 'api', 'backend', 'javascript'],
    status: 'published',
    authorId: 'demo-user-2',
    authorName: 'Alex Rodriguez',
    authorEmail: 'alex@example.com',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 38,
    comments: 12,
    views: 189
  },
  {
    id: 'sample-3',
    title: 'CSS Grid vs Flexbox: When to Use Each',
    slug: 'css-grid-vs-flexbox-when-to-use',
    content: `# CSS Grid vs Flexbox: When to Use Each

Both CSS Grid and Flexbox are powerful layout systems, but they serve different purposes. Let's explore when to use each one.

## Flexbox: One-Dimensional Layout

Flexbox is designed for one-dimensional layouts - either a row or a column.

### When to Use Flexbox:
- Navigation bars
- Card layouts
- Centering content
- Distributing space among items
- Simple responsive layouts

### Flexbox Example:

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px; /* grow, shrink, basis */
  min-width: 300px;
}
\`\`\`

## CSS Grid: Two-Dimensional Layout

CSS Grid is designed for two-dimensional layouts - both rows and columns simultaneously.

### When to Use CSS Grid:
- Complex page layouts
- Magazine-style layouts
- Image galleries
- Dashboard layouts
- Any layout requiring precise placement

### Grid Example:

\`\`\`css
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "sidebar header header"
    "sidebar main aside"
    "footer footer footer";
  min-height: 100vh;
  gap: 1rem;
}

.sidebar { grid-area: sidebar; }
.header { grid-area: header; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
\`\`\`

## Combining Both

You can and should use both together:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #ddd;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
\`\`\`

## Quick Decision Guide

**Use Flexbox when:**
- Working with a single row or column
- Need to distribute space or align items
- Building navigation or simple components

**Use CSS Grid when:**
- Creating complex layouts
- Need precise control over positioning
- Working with both rows and columns

## Browser Support

Both have excellent browser support:
- **Flexbox**: 98%+ support
- **CSS Grid**: 95%+ support

## Conclusion

Don't think of Grid vs Flexbox as an either/or choice. They work beautifully together to create modern, responsive layouts. Master both to become a CSS layout expert!`,
    excerpt: 'Master the differences between CSS Grid and Flexbox to choose the right tool for your layout needs.',
    category: 'CSS',
    tags: ['css', 'grid', 'flexbox', 'layout', 'frontend'],
    status: 'published',
    authorId: 'demo-user-3',
    authorName: 'Emma Thompson',
    authorEmail: 'emma@example.com',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likes: 67,
    comments: 15,
    views: 342
  },
  {
    id: 'sample-4',
    title: 'My Journey from Junior to Senior Developer',
    slug: 'journey-junior-to-senior-developer',
    content: `# My Journey from Junior to Senior Developer

Three years ago, I started as a junior developer with imposter syndrome and endless questions. Today, I'm a senior developer mentoring others. Here's what I learned along the way.

## Year 1: The Struggle is Real

### What I Thought I Knew:
- Basic HTML, CSS, JavaScript
- How to copy-paste from Stack Overflow
- Git commands (barely)

### What I Actually Learned:
- **Reading code is harder than writing it**
- **Debugging is a skill, not luck**
- **Communication matters more than code**

### Key Moments:
1. **First major bug**: Spent 3 days on a typo
2. **First code review**: Got 47 comments
3. **First production deploy**: Broke the site for 10 minutes

## Year 2: Finding My Rhythm

### New Skills Acquired:
- Test-driven development
- Database design basics
- Performance optimization
- Code reviews and mentoring juniors

### Biggest Realizations:
- **Perfect code doesn't exist**
- **Technical debt is inevitable**
- **Soft skills matter immensely**

\`\`\`javascript
// Year 1 code
function getData() {
  return fetch('/api/data').then(r => r.json());
}

// Year 2 code
async function getData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
\`\`\`

## Year 3: Leveling Up

### Leadership Skills:
- Mentoring 2 junior developers
- Leading technical discussions
- Making architectural decisions
- Cross-team collaboration

### Technical Growth:
- System design thinking
- Microservices architecture
- DevOps and CI/CD
- Security best practices

## Key Lessons Learned

### 1. Focus on Problem-Solving, Not Just Code
- Understand the business problem first
- Ask "why" before "how"
- Simple solutions are often better

### 2. Embrace the Growth Mindset
- Every mistake is a learning opportunity
- Stay curious and keep learning
- Don't be afraid to say "I don't know"

### 3. Build Relationships
- Pair programming accelerates learning
- Code reviews are conversations, not critiques
- Teaching others solidifies your own knowledge

### 4. Quality Over Quantity
\`\`\`javascript
// Don't write clever code
const result = arr.reduce((a,b)=>a.concat(b.map(c=>c*2)),[]);

// Write readable code
const doubledValues = [];
for (const subArray of arrays) {
  for (const value of subArray) {
    doubledValues.push(value * 2);
  }
}
\`\`\`

## Advice for Junior Developers

1. **Ask questions** - No question is too basic
2. **Read other people's code** - GitHub is your friend
3. **Build projects** - Personal projects teach more than tutorials
4. **Get comfortable with being uncomfortable** - Growth happens outside your comfort zone
5. **Find a mentor** - Having guidance accelerates growth

## What's Next?

The journey doesn't end at senior level. I'm now focusing on:
- Technical leadership
- System architecture
- Team building
- Industry involvement

## Final Thoughts

Becoming a senior developer isn't just about technical skills. It's about:
- **Problem-solving** over code memorization
- **Communication** over individual brilliance
- **Continuous learning** over knowing everything
- **Helping others** over personal achievement

The path isn't linear, and everyone's journey is different. Trust the process, be patient with yourself, and remember - we're all still learning.

What's your developer journey story? I'd love to hear it in the comments! 🚀`,
    excerpt: 'A personal reflection on growing from junior to senior developer, with practical advice and lessons learned.',
    category: 'Career',
    tags: ['career', 'development', 'growth', 'advice', 'experience'],
    status: 'published',
    authorId: 'demo-user-4',
    authorName: 'Marcus Johnson',
    authorEmail: 'marcus@example.com',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    likes: 124,
    comments: 23,
    views: 567
  },
  {
    id: 'sample-5',
    title: 'Building a Real-Time Chat App with Socket.io',
    slug: 'building-realtime-chat-app-socketio',
    content: `# Building a Real-Time Chat App with Socket.io

Real-time communication is essential for modern web applications. Let's build a chat app using Socket.io for real-time bidirectional communication.

## Project Setup

Initialize the project and install dependencies:

\`\`\`bash
mkdir chat-app
cd chat-app
npm init -y
npm install express socket.io
npm install -D nodemon
\`\`\`

## Server Setup

Create the basic Express server with Socket.io:

\`\`\`javascript
// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Join room
  socket.on('join-room', (room) => {
    socket.join(room);
    socket.to(room).emit('user-connected', socket.id);
  });
  
  // Handle chat messages
  socket.on('chat-message', (data) => {
    io.to(data.room).emit('chat-message', {
      message: data.message,
      username: data.username,
      timestamp: new Date(),
      id: socket.id
    });
  });
  
  // Handle typing indicators
  socket.on('typing', (data) => {
    socket.to(data.room).emit('user-typing', {
      username: data.username,
      isTyping: data.isTyping
    });
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Client-Side HTML

Create the chat interface:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real-Time Chat</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f0f0f0;
        }
        
        .chat-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .chat-header {
            background: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .messages {
            height: 400px;
            overflow-y: auto;
            padding: 20px;
            background: #f8f9fa;
        }
        
        .message {
            margin-bottom: 15px;
            padding: 10px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .message.own {
            background: #007bff;
            color: white;
            margin-left: 50px;
        }
        
        .message-form {
            display: flex;
            padding: 20px;
            background: white;
        }
        
        .message-input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-right: 10px;
        }
        
        .send-button {
            padding: 10px 20px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        
        .typing-indicator {
            font-style: italic;
            color: #666;
            padding: 5px 20px;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            <h2>Real-Time Chat</h2>
        </div>
        
        <div id="messages" class="messages"></div>
        <div id="typing-indicator" class="typing-indicator"></div>
        
        <form id="message-form" class="message-form">
            <input 
                type="text" 
                id="message-input" 
                class="message-input" 
                placeholder="Type your message..."
                required
            >
            <button type="submit" class="send-button">Send</button>
        </form>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script src="client.js"></script>
</body>
</html>
\`\`\`

## Client-Side JavaScript

Handle real-time communication:

\`\`\`javascript
// public/client.js
const socket = io();
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');
const typingIndicator = document.getElementById('typing-indicator');

// Get username and room
const username = prompt('Enter your username:') || 'Anonymous';
const room = 'general'; // Could be dynamic

// Join room
socket.emit('join-room', room);

// Handle message sending
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    
    if (message) {
        socket.emit('chat-message', {
            message,
            username,
            room
        });
        messageInput.value = '';
        stopTyping();
    }
});

// Handle typing indicators
let typingTimeout;
messageInput.addEventListener('input', () => {
    socket.emit('typing', {
        username,
        room,
        isTyping: true
    });
    
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(stopTyping, 1000);
});

function stopTyping() {
    socket.emit('typing', {
        username,
        room,
        isTyping: false
    });
}

// Listen for messages
socket.on('chat-message', (data) => {
    displayMessage(data);
});

// Listen for typing indicators
socket.on('user-typing', (data) => {
    if (data.isTyping) {
        typingIndicator.textContent = \`\${data.username} is typing...\`;
    } else {
        typingIndicator.textContent = '';
    }
});

// Display message function
function displayMessage(data) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    
    if (data.id === socket.id) {
        messageElement.classList.add('own');
    }
    
    const timestamp = new Date(data.timestamp).toLocaleTimeString();
    
    messageElement.innerHTML = \`
        <strong>\${data.username}</strong>
        <span style="float: right; font-size: 0.8em; opacity: 0.7;">\${timestamp}</span>
        <div>\${data.message}</div>
    \`;
    
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Handle connection events
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('user-connected', (userId) => {
    console.log('User connected:', userId);
});
\`\`\`

## Advanced Features

### 1. Private Messaging
\`\`\`javascript
// Send private message
socket.emit('private-message', {
    to: targetUserId,
    message: 'Hello!',
    from: username
});

// Receive private message
socket.on('private-message', (data) => {
    displayPrivateMessage(data);
});
\`\`\`

### 2. Message Persistence
\`\`\`javascript
// Store messages in database
const messages = [];

socket.on('chat-message', (data) => {
    const message = {
        ...data,
        timestamp: new Date()
    };
    messages.push(message);
    
    // Save to database
    saveMessageToDatabase(message);
    
    io.to(data.room).emit('chat-message', message);
});
\`\`\`

### 3. User Authentication
\`\`\`javascript
// Authenticate user
socket.on('authenticate', (token) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            socket.emit('authentication-error');
            return;
        }
        
        socket.userId = decoded.userId;
        socket.username = decoded.username;
        socket.emit('authenticated');
    });
});
\`\`\`

## Deployment Tips

1. **Use Redis for scaling**:
\`\`\`javascript
const redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));
\`\`\`

2. **Enable CORS for production**:
\`\`\`javascript
const io = socketIo(server, {
    cors: {
        origin: "https://yourdomain.com",
        methods: ["GET", "POST"]
    }
});
\`\`\`

3. **Add rate limiting**:
\`\`\`javascript
const rateLimit = require('express-rate-limit');
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));
\`\`\`

## Conclusion

Socket.io makes real-time communication straightforward. This foundation can be extended with:
- File sharing
- Video/voice calls
- Screen sharing
- Collaborative editing

The possibilities are endless! Start simple and add features as needed.`,
    excerpt: 'Learn to build a real-time chat application using Socket.io with typing indicators, rooms, and modern UI.',
    category: 'Tutorial',
    tags: ['socketio', 'realtime', 'nodejs', 'javascript', 'chat'],
    status: 'published',
    authorId: 'demo-user-5',
    authorName: 'Priya Patel',
    authorEmail: 'priya@example.com',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    likes: 89,
    comments: 19,
    views: 445
  }
];

// Function to populate localStorage with sample posts
export function loadSamplePosts() {
  const existingPosts = localStorage.getItem('inkwell_posts');
  if (!existingPosts || JSON.parse(existingPosts).length === 0) {
    localStorage.setItem('inkwell_posts', JSON.stringify(samplePosts));
    console.log('Sample posts loaded successfully!');
    return true;
  }
  return false;
}
