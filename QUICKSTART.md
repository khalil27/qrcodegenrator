# Quick Start Guide - QR Custom Generator

Get up and running with QR Custom Generator in less than 5 minutes!

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**

   Navigate to `http://localhost:5173`

That's it! The application is now running.

## Your First QR Code

### Simple URL QR Code

1. In the application, ensure "Website URL" is selected
2. Enter a URL, for example: `https://github.com`
3. Click "Generate QR Code"
4. See the preview appear on the right
5. Click "Download" to save it

### Add Custom Colors

1. Click on the colored square next to "QR Code Color"
2. Pick your favorite color
3. Do the same for "Background Color"
4. Click "Generate QR Code" again
5. See your colorful QR code!

### Try a Template

1. Scroll down to "Quick Templates"
2. Click on any template (e.g., "Ocean")
3. Your colors and settings are instantly applied
4. Click "Generate QR Code"

### Add a Logo

1. Click the "Upload" button under "Logo (Optional)"
2. Select a square image from your computer
3. Click "Generate QR Code"
4. Your logo appears in the center of the QR code!

## Common Tasks

### Create a WiFi QR Code

1. Select "WiFi Network" from content types
2. Enter your WiFi name (SSID)
3. Enter your WiFi password
4. Select security type (usually WPA/WPA2)
5. Generate and share - guests can now connect automatically!

### Share on Social Media

1. After generating a QR code, click "Share"
2. Choose your platform (WhatsApp, Facebook, Twitter, LinkedIn)
3. Post or send directly

### View History

1. Scroll to "Recent QR Codes" section
2. See all your previously generated codes
3. Click "Restore" to reload any configuration
4. Click the download icon to save again
5. Click trash to delete

## Keyboard Shortcuts

- `Tab` - Navigate between fields
- `Enter` - Generate QR code (when in content field)
- `Escape` - Close color picker or modal

## Tips for Best Results

### For Maximum Scannability
- Use high contrast (dark QR on light background)
- Keep size at least 300px
- Use error correction "M" or higher
- Test with multiple devices

### For Printing
- Use size 600px or larger
- Select high error correction (Q or H)
- Test print at actual size before mass printing
- Ensure minimum 2cm x 2cm physical size

### For Logos
- Use square images
- Keep file size under 2MB
- PNG with transparent background works best
- Logo should be simple and recognizable

## Production Build

To build for production:

```bash
npm run build
```

Files will be in the `dist/` folder.

To preview the production build:

```bash
npm run preview
```

## Troubleshooting

### Port Already in Use

If port 5173 is taken:
```bash
npm run dev -- --port 3000
```

### QR Code Not Scanning

- Ensure good contrast between colors
- Increase error correction level
- Make QR code larger
- Remove logo and try again
- Clean your phone camera lens

### Build Errors

```bash
rm -rf node_modules
npm install
npm run build
```

## Next Steps

- Read [README.md](README.md) for complete documentation
- Check [EXAMPLES.md](EXAMPLES.md) for real-world use cases
- Review [API.md](API.md) to use the REST API
- See [FEATURES.md](FEATURES.md) for all capabilities

## Need Help?

- Check the FAQ in README.md
- Open an issue on GitHub
- Review existing issues for solutions

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Deploy to Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Deploy to Your Server

1. Run `npm run build`
2. Upload `dist/` folder to your web server
3. Point domain to the folder

---

**You're all set!** Start creating beautiful QR codes.

Happy generating! 🎨
