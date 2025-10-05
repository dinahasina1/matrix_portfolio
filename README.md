# 🟢 Dinahasina Ralaivao - Portfolio

A Matrix/Terminal themed portfolio showcasing software architecture and development skills.

## 🚀 Features

- **Matrix Background Animation** - Dynamic falling code characters
- **Terminal Interface** - Authentic command-line aesthetic
- **Responsive Design** - Works on desktop and mobile
- **Interactive Elements** - Hover effects and animations
- **GitHub Pages Ready** - Easy deployment configuration

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Header.js      # Main header with ASCII art
│   │   ├── About.js       # Profile information
│   │   ├── Experience.js  # Career timeline
│   │   ├── Skills.js      # Technical skills display
│   │   ├── Contact.js     # Contact information
│   │   └── MatrixBackground.js # Matrix animation
│   ├── App.js            # Main app component
│   └── App.css           # Matrix/terminal styling
├── static-portfolio/      # Static HTML/CSS/JS version
│   ├── index.html        # Static HTML version
│   ├── style.css         # Static CSS
│   └── script.js         # Static JavaScript
└── package.json          # Dependencies and scripts
```

## 🛠️ Installation & Setup

### React Version (Recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```
   Opens at `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

### Static Version (Fallback)

If React doesn't work or you prefer static files:

1. **Open the static version:**
   - Navigate to `static-portfolio/`
   - Open `index.html` in your browser
   - Or serve it with any web server

2. **Features:**
   - Pure HTML/CSS/JavaScript
   - Matrix background animation
   - Terminal styling
   - No build process required

## 🎨 Customization

### Update Personal Information

1. **Edit `src/components/Header.js`:**
   - Change ASCII art name
   - Update typing text

2. **Edit `src/components/About.js`:**
   - Update profile information
   - Modify philosophy quotes

3. **Edit `src/components/Experience.js`:**
   - Add/update work experience
   - Modify timeline entries

4. **Edit `src/components/Skills.js`:**
   - Update technical skills
   - Modify skill levels

5. **Edit `src/components/Contact.js`:**
   - Update contact information
   - Add social media links

### Styling Changes

- **Colors:** Edit CSS variables in `App.css`
- **Fonts:** Change font imports in `index.html`
- **Animations:** Modify keyframes in `App.css`

## 📱 Responsive Design

The portfolio is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🌐 Deployment Options

### GitHub Pages (Recommended)

1. **Configure package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

2. **Deploy:**
   ```bash
   npm run deploy
   ```

### Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Drag and drop** the `build/` folder to Netlify

### Vercel

1. **Connect your GitHub repository**
2. **Vercel will auto-deploy** from your repository

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to GitHub Pages
- `npm test` - Run tests (if configured)

## 🎯 Key Features Explained

### Matrix Background
- Canvas-based animation
- Falling green characters
- Configurable speed and density

### Terminal Interface
- Authentic command-line styling
- Typing animations
- Interactive command prompts

### Responsive Design
- Mobile-first approach
- Flexible grid system
- Optimized for all devices

## 🐛 Troubleshooting

### React App Won't Start
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires Node 14+)

### GitHub Pages Deployment Issues
- Verify `homepage` field in `package.json`
- Ensure `gh-pages` package is installed
- Check repository settings for Pages configuration

### Static Version Issues
- Ensure all files are in the same directory
- Check browser console for JavaScript errors
- Verify CSS and JS file paths

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Contact: dinahasina.s217@gmail.com
- LinkedIn: linkedin.com/in/dinahasina

## 📄 License

This project is open source and available under the MIT License.

---

**⚡ "Code. Create. Innovate. Repeat." ⚡**