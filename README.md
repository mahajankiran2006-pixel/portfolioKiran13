<<<<<<< HEAD
# kiran_Portfolio_13
Portfolio of my
=======
# Kiran Mahajan - Cinematic Portfolio

A modern, fully responsive personal portfolio website with cinematic animations, built with React, Node.js, Express, and Firebase.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation & Running

**Option 1: Run Both Servers at Once (Recommended)**
```bash
npm start
```

**Option 2: Run Servers Separately**

Terminal 1 - Frontend:
```bash
cd client
npm start
```

Terminal 2 - Backend:
```bash
cd server
npm start
```

### First Time Setup
If you're running the project for the first time:
```bash
npm run install-all
npm start
```

### Access the Portfolio
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🛠️ Troubleshooting

### PowerShell Execution Policy Error
If you get an error about scripts being disabled, run this command first:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
```

Then run:
```bash
npm start
```

### Port Already in Use
If port 3000 or 5000 is already in use:
```bash
# Kill the process using the port
npx kill-port 3000 5000
# Then restart
npm start
```

## � Deployment

### Quick Deploy to Firebase Hosting

```bash
# 1. Install Firebase CLI (first time only)
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Deploy Firestore security rules
npm run deploy-rules

# 4. Build and deploy
npm run deploy
```

Your portfolio will be live at: `https://portfoliokiran13.web.app`

### Deployment Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Create production build |
| `npm run deploy-rules` | Deploy Firestore security rules |
| `npm run deploy` | Build and deploy to Firebase Hosting |
| `npm run deploy-all` | Deploy everything (hosting + rules) |

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🔒 Security Features

- **Environment Variables**: Firebase config secured in `.env` files
- **Firestore Rules**: Database locked down - visitors can only CREATE contact messages
- **Input Validation**: All form inputs validated on client and server
- **No Data Exposure**: Cannot read, update, or delete from client side
- **CORS Protection**: Backend configured with proper CORS settings

## ⚡ Performance Optimizations

- **Code Splitting**: React.lazy for optimal bundle size
- **Asset Caching**: Static files cached for 1 year
- **Image Optimization**: Optimized images with proper formats
- **Animation Performance**: Transform/opacity only for 60fps
- **Lazy Loading**: Components load on demand
- **Minification**: Production build minified and compressed

## 📁 Project Structure
```
portfolioKiran/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # All React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                # Express Backend
│   ├── server.js          # API server
│   ├── .env              # Environment variables
│   └── package.json
└── package.json          # Root package (scripts)
```

## ✨ Features

- **Cinematic Opening Animation** - Full-screen name reveal with particles and energy effects
- **Hero Name Transform** - Dynamic name animation that expands and settles into position
- **Custom Runner Animation** - Unique skill level indicators with "KM" branding
- **Cybersecurity Focus** - Beginner-level cybersecurity content throughout
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Smooth Animations** - GSAP and Framer Motion powered animations
- **Contact Form** - Firebase Firestore integration (optional)

## 🔧 Technologies Used

### Frontend
- React 18
- GSAP (animations)
- Framer Motion
- Lenis (smooth scrolling)
- CSS3 with modern features

### Backend
- Node.js
- Express.js
- Firebase Admin SDK
- CORS enabled

## 📧 Contact Form Setup (Optional)

The contact form requires Firebase credentials. To enable it:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `portfoliokiran13`
3. Go to Project Settings → Service Accounts
4. Generate a new private key
5. Copy the credentials to `server/.env`:

```env
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Key_Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_client_email
```

See `FIREBASE_SETUP.md` for detailed instructions.

## 📝 Customization

To customize the portfolio content, edit these files:
- **Personal Info:** `client/src/components/HeroCinematic.js`
- **About Section:** `client/src/components/About.js`
- **Skills:** `client/src/components/SkillsCinematic.js`
- **Projects:** `client/src/components/Projects.js`
- **Experience:** `client/src/components/Experience.js`
- **Certifications:** `client/src/components/Certifications.js`

## 🎨 Color Theme

The portfolio uses a dark anime-inspired theme:
- Primary: Crimson Red (#ff4655)
- Secondary: Orange (#ff6b35)
- Accent: Electric Blue (#00d4ff)
- Background: Dark (#0a0a0a, #151515)

## 📱 Social Links

- **Email:** mahajankiran2006@gmail.com
- **Instagram:** [@13_kiran_mahajan](https://www.instagram.com/13_kiran_mahajan)
- **LinkedIn:** [Kiran Mahajan](https://www.linkedin.com/in/kiran-mahajan-102412325)

## 🚀 Deployment

To create a production build:
```bash
cd client
npm run build
```

The optimized files will be in `client/build/` directory.

## 📄 License

This project is for personal portfolio use.

##Powershell error solving command for frontend or backend
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force


---

**Built with ❤️ by Kiran Mahajan**
>>>>>>> 3572f13 (Initial commit)
