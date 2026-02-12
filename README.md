# PurityScan - Halal & Vegan Food Scanner

A lightning-fast, privacy-first Progressive Web App (PWA) that allows users to scan food ingredient labels to instantly detect non-compliant ingredients for Halal and Vegan diets.

## 🚀 Features

- **📸 Live Camera Scanning**: Real-time OCR using your device camera
- **🔴 Red Flag Detection**: Instant alerts for pork, gelatin, alcohol, and more
- **🟡 Doubtful Ingredients**: Warnings for items that need verification (E-numbers)
- **🟢 Safe Indication**: Clear feedback when no flagged ingredients are found
- **🔒 Privacy First**: All processing happens locally on your device
- **📱 PWA Ready**: Install on your phone like a native app
- **🌙 Dark Mode**: Beautiful light and dark themes
- **⚙️ Customizable**: Toggle between Halal, Vegan, or Both modes

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Tesseract.js** - Client-side OCR (no API costs!)
- **react-webcam** - Camera access
- **Lucide React** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
```
Deploy the `.next` folder to any Node.js hosting platform.

## 📱 PWA Installation

1. Open the app in a mobile browser
2. Look for "Add to Home Screen" prompt
3. Install and use like a native app

## 🗄️ Ingredients Database

The app uses a local JSON database with 500+ ingredient entries:
- **Red Flags**: Pork, Gelatin, Carmine (E120), Alcohol, Rennet, etc.
- **Yellow Flags**: E471, E472, Natural Flavors, Vitamin D3, etc.

Located at: `data/ingredients.json`

## 🎨 Customization

### Adding New Ingredients
Edit `data/ingredients.json`:

```json
{
  "red_flags": [
    {
      "id": "new_ingredient",
      "names": ["ingredient name", "alternative name"],
      "reason": "Why it's flagged",
      "severity": "HIGH"
    }
  ]
}
```

### Changing Theme Colors
Edit `tailwind.config.ts` and `app/globals.css`

## 📝 License

This project is open source and available for educational purposes.

## ⚠️ Disclaimer

PurityScan is a helpful tool but **not a substitute for official Halal certification**. Always verify with certified authorities when in doubt.

## 🙏 Acknowledgments

Built with ❤️ for the Muslim and Vegan communities.

---

**Note**: For production use, please expand the ingredients database, add comprehensive testing, and implement proper error handling.