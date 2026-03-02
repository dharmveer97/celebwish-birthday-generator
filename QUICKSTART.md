# 🚀 Quick Start Guide

## Start the App (3 Steps)

```bash
# 1. Make sure you're in the project directory
cd /Users/dharamveerbangar/Projects/erp-landing

# 2. Start the development server
npm run dev

# 3. Open in browser
# Visit: http://localhost:3000 (or 3001 if 3000 is busy)
```

## First Time Setup (Already Done ✅)

All dependencies are installed and configured:
- ✅ Next.js 16.1.6
- ✅ Tailwind CSS v4
- ✅ TypeScript
- ✅ All UI libraries
- ✅ Dark mode support
- ✅ Image export functionality

## Test the App

1. **Select a Celebrity** - Click on any celebrity card
2. **Enter Your Name** - Type in the "Your Name" field
3. **Choose a Message** - Click different message options
4. **Change Background** - Click the colored gradient boxes
5. **Toggle Dark Mode** - Click the moon/sun icon in header
6. **Download** - Click "Download for Instagram" button

## Common Commands

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Troubleshooting

### Port Already in Use
```bash
# Kill existing server
pkill -f "next dev"

# Or use different port
npm run dev -- -p 3002
```

### Build Errors
```bash
# Clean cache and rebuild
rm -rf .next
npm run dev
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## File Structure

```
📁 app/
  📁 components/
    📄 birthday-wish-generator.tsx  ← Main app
    📄 theme-provider.tsx           ← Dark mode
    📄 theme-toggle.tsx             ← Theme button
  📁 data/
    📄 celebrities.ts               ← Add celebrities here
  📄 globals.css                    ← Styles
  📄 layout.tsx                     ← Root layout
  📄 page.tsx                       ← Home page
```

## Quick Customizations

### Add a Celebrity
Open `app/data/celebrities.ts` and add:
```typescript
{
  id: 11,
  name: "Your Celebrity",
  title: "Their Title",
  image: "https://images.unsplash.com/photo-...",
  category: "Tech",
  premium: false,
  messages: ["Message 1", "Message 2", "Message 3"]
}
```

### Change App Name
Edit `app/components/birthday-wish-generator.tsx`:
```typescript
<h1>CelebWish</h1>  // Change this
```

### Add More Gradients
Edit `app/data/celebrities.ts`:
```typescript
export const gradients = [
  // Add new gradient
  "from-red-500 via-yellow-500 to-pink-500",
];
```

## Features Overview

✅ **10+ Celebrities** - Tech, Music, Sports, Entertainment, Media
✅ **Dark/Light Mode** - Auto-detects system preference
✅ **Search & Filter** - Find celebrities instantly
✅ **Custom Messages** - 3 messages per celebrity
✅ **8 Backgrounds** - Instagram-optimized gradients
✅ **Download** - 1080x1080 PNG for social media
✅ **Responsive** - Works on mobile, tablet, desktop

## Need Help?

- 📖 Read: `README.md` - Full documentation
- 📋 Check: `PROJECT_SUMMARY.md` - Complete overview
- 🐛 Issues: Check console for errors
- 💡 Tips: All features work in free mode!

---

**Ready to go!** Just run `npm run dev` and start creating birthday wishes! 🎉
