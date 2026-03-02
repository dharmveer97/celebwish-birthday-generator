# CelebWish - Celebrity Birthday Wishes Generator 🎉

Create personalized birthday wishes from your favorite celebrities and download them for Instagram Stories & Posts!

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd erp-landing

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build the app
npm run build

# Start production server
npm start
```

## ✨ Features

### 🎨 **Professional UI**
- Modern, responsive design
- Glassmorphism effects
- Instagram-authentic styling
- Dark/Light mode support

### 📱 **Instagram Formats**
- **Story** (9:16 - 1080x1920px)
- **Post** (1:1 - 1080x1080px)
- Perfect dimensions for social media

### 🎭 **3 Story Variants**
- **Minimal** - Clean and simple
- **Elegant** - Sophisticated with decorative elements
- **Bold** - Modern and impactful

### 🌈 **10 Gradient Backgrounds**
- Vibrant colors
- Dark/black gradients
- Instagram-optimized

### 👤 **15+ Celebrities**
- Sydney Sweeney, Zendaya, Taylor Swift
- Dwayne Johnson, Tom Holland, Margot Robbie
- Ariana Grande, Billie Eilish, Dua Lipa
- Cristiano Ronaldo, LeBron James
- And more!

### 🎨 **Full Customization**
- Upload custom celebrity images
- Custom celebrity name & title
- Write your own birthday message
- Add your Instagram handle
- Personalize with recipient's name

### 📥 **High-Quality Download**
- 1080x1920 for Stories
- 1080x1080 for Posts
- PNG format
- Ready to post!

## 🎯 How to Use

1. **Select a Celebrity** - Click on any celebrity or upload your own image
2. **Enter Details**:
   - Your name (recipient)
   - Instagram handle (optional)
   - Custom message (optional)
3. **Choose Format** - Story or Post
4. **Select Style** - Minimal, Elegant, or Bold (for stories)
5. **Pick Background** - Choose from 10 gradients
6. **Download** - Click download button and post to Instagram!

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router & Turbopack
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - No config needed!
- **Radix UI** - Accessible components
- **next-themes** - Dark mode
- **html-to-image** - High-quality exports
- **react-dropzone** - File uploads
- **Lucide Icons** - Beautiful icons

## 📁 Project Structure

```
app/
├── components/
│   ├── birthday-wish-generator.tsx  # Main app
│   ├── theme-provider.tsx           # Theme context
│   └── theme-toggle.tsx             # Dark/light toggle
├── data/
│   └── celebrities.ts               # Celebrity data
├── globals.css                      # Tailwind v4 + custom styles
├── layout.tsx                       # Root layout
└── page.tsx                         # Home page
```

## 🎨 Customization

### Add New Celebrity

Edit `app/data/celebrities.ts`:

```typescript
{
  id: 16,
  name: "Celebrity Name",
  title: "Their Title",
  image: "https://images.unsplash.com/...",
  category: "Entertainment",
  premium: false,
  messages: [
    "Birthday message 1",
    "Birthday message 2",
    "Birthday message 3"
  ]
}
```

### Add New Gradient

Edit `app/data/celebrities.ts`:

```typescript
export const gradients = [
  // ... existing gradients
  "from-cyan-500 via-blue-500 to-purple-500",
];
```

### Modify Styles

Edit `app/globals.css` for glassmorphism effects and custom styles.

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🌐 Environment

No environment variables needed! Everything works out of the box.

## 📱 Social Media Specs

### Instagram Story
- **Dimensions**: 1080 x 1920 pixels
- **Aspect Ratio**: 9:16
- **Format**: PNG

### Instagram Post
- **Dimensions**: 1080 x 1080 pixels
- **Aspect Ratio**: 1:1
- **Format**: PNG

## 🎨 Design Features

- **Glassmorphism** - Frosted glass effects with blur
- **Text Shadows** - Strong shadows for readability
- **Instagram UI** - Authentic story interface
- **Responsive** - Works on all devices
- **Accessible** - WCAG compliant

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Other Platforms

Works on any Node.js hosting:
- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill existing process
pkill -f "next dev"

# Or use different port
npm run dev -- -p 3001
```

### Build Errors

```bash
# Clean cache
rm -rf .next
npm run dev
```

### TypeScript Errors

```bash
# Check for errors
npx tsc --noEmit
```

## 📄 License

MIT License - feel free to use for personal or commercial projects!

## 🙏 Credits

- Celebrity images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)

## 💡 Tips

- Use **Story format** for Instagram Stories
- Use **Post format** for Instagram Feed
- **Dark gradients** work best with light text
- Add your **@handle** to get tagged
- **Custom messages** make it more personal

---

**Made with ❤️ using Next.js 16 & Tailwind CSS v4**

Happy Birthday Wishing! 🎂✨
