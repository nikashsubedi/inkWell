# InkWell 🖋️

A modern, developer-focused blogging platform inspired by dev.to - built with React, Vite, and Tailwind CSS.

![InkWell Screenshot](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.0.4-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.11-teal)

## ✨ Features

### 🔐 Authentication System
- **Beautiful Login/Signup Pages** with Inter font (developer favorite)
- **Local Storage Authentication** for demo purposes
- **Password strength indicators** and form validation
- **Protected routes** with seamless redirects

### 🏠 Home Feed (Dev.to-style)
- **Clean, minimalist design** with excellent readability
- **Smart filtering** by relevance, latest, and top posts
- **Real-time search** across posts and authors
- **Tag-based navigation** with trending tags
- **Interactive sidebar** with community stats

### ✍️ Content Creation
- **Rich Markdown Editor** with live preview
- **Auto-generated slugs** from titles
- **Tag management** with popular suggestions
- **Draft/Published status** with one-click publishing
- **Reading time estimation** automatically calculated

### 📖 Reading Experience
- **Individual post pages** with full markdown rendering
- **Engagement metrics** (likes, comments, views, bookmarks)
- **Interactive commenting system** with threaded replies
- **Social sharing** capabilities
- **Author profiles** and post metadata

### 📊 Dashboard
- **Personal analytics** with post statistics
- **Content management** with search and filters
- **Quick actions** for editing/deleting posts
- **Visual stats cards** showing engagement metrics

### 🎨 UI/UX Excellence
- **Developer-friendly design** using Inter font
- **Responsive layout** that works on all devices
- **Smooth animations** and hover effects
- **Consistent color scheme** with indigo/purple gradients
- **Accessible components** with proper contrast

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nikashsubedi/inkWell.git
cd inkWell
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 7.7.1
- **Icons**: Lucide React 0.526.0
- **Markdown**: React Markdown
- **Storage**: LocalStorage (for demo)
- **Font**: Inter (via @fontsource/inter)

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx          # Beautiful login page
│   │   └── Signup.jsx         # Registration with validation
│   ├── AllPosts.jsx           # Grid view of all posts
│   ├── CreatePost.jsx         # Rich markdown editor
│   ├── Dashboard.jsx          # Personal dashboard
│   ├── Home.jsx               # Main feed (dev.to style)
│   ├── Layout.jsx             # App layout wrapper
│   ├── Navbar.jsx             # Navigation component
│   ├── PostView.jsx           # Individual post page
│   ├── ProtectedRoute.jsx     # Route protection
│   └── Sidebar.jsx            # Community sidebar
├── context/
│   └── AuthContext.jsx        # Authentication state
├── routes/
│   └── Routes.jsx             # App routing config
├── card/                      # Legacy card components
├── test/                      # Test components
└── assets/                    # Static assets
```

## 🎯 Key Features Comparison with Dev.to

| Feature | InkWell | Dev.to | Status |
|---------|---------|---------|---------|
| Clean UI Design | ✅ | ✅ | ✅ Complete |
| Markdown Support | ✅ | ✅ | ✅ Complete |
| Tag System | ✅ | ✅ | ✅ Complete |
| User Authentication | ✅ | ✅ | ✅ Complete |
| Reading Time | ✅ | ✅ | ✅ Complete |
| Engagement Metrics | ✅ | ✅ | ✅ Complete |
| Search & Filter | ✅ | ✅ | ✅ Complete |
| Responsive Design | ✅ | ✅ | ✅ Complete |
| Comments System | ✅ | ✅ | ✅ Complete |
| Personal Dashboard | ✅ | ✅ | ✅ Complete |

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Demo Features

### Authentication Flow
1. Visit the app → Redirected to login
2. Create account with strong password validation
3. Auto-login after successful registration
4. Protected routes ensure security

### Content Creation Workflow
1. Click "Write" → Rich markdown editor
2. Live preview while typing
3. Auto-generated URL slugs
4. Tag suggestions and categorization
5. Save as draft or publish immediately

### Reading Experience
1. Browse posts on home feed
2. Filter by relevance/latest/top
3. Search across all content
4. Click to read full posts
5. Engage with likes/comments/bookmarks

## 📱 Responsive Design

- **Desktop**: Full sidebar with community stats
- **Tablet**: Collapsible sidebar navigation
- **Mobile**: Touch-friendly with optimized layouts

## 🎨 Design Philosophy

InkWell follows dev.to's design principles:
- **Content-first** approach
- **Minimal distractions** 
- **Developer-friendly** aesthetics
- **High readability** with proper typography
- **Consistent spacing** and visual hierarchy

## 🔮 Future Enhancements

### Phase 1: Backend Integration
- [ ] Replace LocalStorage with Firebase/Supabase
- [ ] Real user authentication
- [ ] Image upload capabilities
- [ ] Email notifications

### Phase 2: Advanced Features
- [ ] User profiles and following
- [ ] Advanced search with filters
- [ ] Code syntax highlighting
- [ ] SEO optimization
- [ ] RSS feeds

### Phase 3: Community Features
- [ ] User badges and achievements
- [ ] Community challenges
- [ ] Direct messaging
- [ ] Advanced moderation tools

### Phase 4: Next.js Migration
- [ ] Server-side rendering (SSR)
- [ ] Better SEO performance
- [ ] API routes
- [ ] Static generation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Dev.to** for design inspiration
- **React team** for the amazing framework
- **Tailwind CSS** for beautiful styling
- **Lucide** for the clean icons
- **Inter font** for excellent typography

## 📞 Contact

- **Developers**: Nikash Subedi, Harish Govindasamy [ Team leader], Muneeb Shah
- **GitHub**: [@nikashsubedi](https://github.com/nikashsubedi), [@itsharishg](https://github.com/itsharishg), [@muneebshah](https://github.com/muneeb99shah)
- **Project Link**: [https://github.com/nikashsubedi/inkWell](https://github.com/nikashsubedi/inkWell)

---

**Built with ❤️ by developers, for developers**

*InkWell - Where great ideas flow like ink* 🖋️✨
