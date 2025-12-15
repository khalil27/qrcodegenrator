# QR Custom Generator

A powerful, modern web application for generating fully customized QR codes with advanced features including logo embedding, multiple content types, templates, history tracking, and social media sharing.

## Features

### Core Functionality
- **Multiple Content Types**: Support for URLs, plain text, email addresses, phone numbers, WiFi credentials, and GPS locations
- **Full Customization**:
  - Custom foreground and background colors
  - Adjustable QR code size (200px - 800px)
  - Error correction levels (L, M, Q, H)
  - Corner styles (Square, Rounded, Dots)
- **Logo Integration**: Upload and automatically embed logos in the center of QR codes
- **Real-time Preview**: See your QR code update instantly as you configure options

### Advanced Features
- **Multiple Export Formats**: Download QR codes as PNG, JPG, or SVG
- **Pre-built Templates**: 8 professionally designed templates (Classic, Ocean, Forest, Sunset, Elegant, Neon, Corporate, Minimal)
- **History Management**: Automatic saving of generated QR codes to database
- **Social Media Sharing**: Share directly to WhatsApp, Facebook, Twitter, and LinkedIn
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### API Access
REST API endpoint available for generating QR codes programmatically from external applications.

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **react-colorful** for color picking

### Backend & Database
- **Supabase** for database and authentication
- **Supabase Edge Functions** for serverless API
- PostgreSQL with Row Level Security (RLS)

### Libraries
- **qrcode** - QR code generation
- **html-to-image** - Image export functionality

## Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account (database is already configured)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd qr-custom-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**

   The `.env` file is already configured with Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Usage Guide

### Basic QR Code Generation

1. **Select Content Type**
   - Choose from URL, Text, Email, Phone, WiFi, or Location

2. **Enter Content**
   - For URLs: Enter the website address (e.g., `https://example.com`)
   - For Email: Enter email address (e.g., `hello@example.com`)
   - For Phone: Enter phone number (e.g., `+1234567890`)
   - For WiFi: Fill in SSID, password, and encryption type
   - For Location: Enter latitude and longitude coordinates
   - For Text: Enter any plain text

3. **Customize Appearance**
   - Choose QR code color using the color picker
   - Choose background color
   - Adjust size using the slider or preset buttons
   - Select error correction level (higher = more recovery but denser QR code)
   - Choose corner style for aesthetic preference

4. **Add Logo (Optional)**
   - Click "Upload" to select a logo image
   - Recommended: Square image, max 2MB
   - Logo will be automatically centered and sized

5. **Generate**
   - Click "Generate QR Code" button
   - Preview appears instantly on the right side

6. **Export**
   - Select format (PNG, JPG, or SVG)
   - Click "Download" to save to your device
   - Click "Copy" to copy to clipboard
   - Click "Share" to share on social media

### Using Templates

Click on any of the 8 pre-built templates to instantly apply professional color schemes and settings:

- **Classic**: Traditional black on white
- **Ocean**: Deep blue theme
- **Forest**: Natural green colors
- **Sunset**: Warm orange/red tones
- **Elegant**: Sophisticated dark theme
- **Neon**: Vibrant bright colors
- **Corporate**: Professional blue
- **Minimal**: Clean and simple

### History Management

- All generated QR codes are automatically saved to your history
- View recent QR codes in the "Recent QR Codes" section
- Click "Restore" to reload a previous configuration
- Click the download icon to re-download
- Click the trash icon to delete from history

### WiFi QR Codes

1. Select "WiFi Network" as content type
2. Enter your network name (SSID)
3. Enter password
4. Select security type (WPA/WPA2, WEP, or No Password)
5. Check "Hidden Network" if applicable
6. Generate and share - users can scan to connect automatically

### GPS Location QR Codes

1. Select "GPS Location" as content type
2. Enter latitude (e.g., `48.8566`)
3. Enter longitude (e.g., `2.3522`)
4. Generate - users can scan to open in maps application

## API Documentation

### Generate QR Code API

**Endpoint**: `POST /functions/v1/generate-qr`

**Request Body**:
```json
{
  "content": "https://example.com",
  "qrColor": "#000000",
  "bgColor": "#FFFFFF",
  "size": 300,
  "errorCorrection": "M",
  "format": "png"
}
```

**Parameters**:
- `content` (required): The content to encode in the QR code
- `qrColor` (optional): Hex color for QR code, default `#000000`
- `bgColor` (optional): Hex color for background, default `#FFFFFF`
- `size` (optional): Size in pixels, default `300`
- `errorCorrection` (optional): Error correction level (`L`, `M`, `Q`, `H`), default `M`
- `format` (optional): Output format (`png` or `svg`), default `png`

**Response**:
```json
{
  "success": true,
  "data": "data:image/png;base64,...",
  "format": "png"
}
```

**Example Usage**:

```javascript
const response = await fetch('YOUR_SUPABASE_URL/functions/v1/generate-qr', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer YOUR_SUPABASE_ANON_KEY`
  },
  body: JSON.stringify({
    content: 'https://example.com',
    qrColor: '#0077BE',
    bgColor: '#E6F3FF',
    size: 400,
    errorCorrection: 'H'
  })
});

const result = await response.json();
console.log(result.data); // Base64 image data
```

## Database Schema

### qr_codes Table

```sql
- id (uuid, primary key)
- user_id (uuid, nullable, references auth.users)
- content_type (text) - Type of content (url, text, email, phone, wifi, location)
- content (text) - The actual content/data
- qr_color (text) - Foreground color (hex)
- bg_color (text) - Background color (hex)
- size (integer) - Size in pixels
- logo_url (text, nullable) - URL to uploaded logo
- error_correction (text) - Error correction level (L, M, Q, H)
- corner_style (text) - Style of corners (square, rounded, dots)
- template_name (text, nullable) - Name of template used
- qr_data_url (text) - Base64 data URL of generated QR code
- created_at (timestamptz) - Creation timestamp
```

### Row Level Security (RLS)

- Users can view, insert, and delete their own QR codes
- Anonymous users can insert and view QR codes (with null user_id)
- All data is protected by Supabase RLS policies

## Project Structure

```
src/
├── components/          # React components
│   ├── ColorPicker.tsx     # Color selection component
│   ├── ContentInput.tsx    # Content type and input forms
│   ├── History.tsx         # QR code history display
│   ├── LogoUpload.tsx      # Logo upload component
│   ├── QRPreview.tsx       # QR code preview and download
│   ├── ShareModal.tsx      # Social media sharing modal
│   ├── Templates.tsx       # Template selection grid
│   └── ThemeToggle.tsx     # Dark/light mode toggle
├── constants/           # Application constants
│   └── templates.ts        # Template definitions and presets
├── hooks/              # Custom React hooks
│   └── useDarkMode.ts     # Dark mode management hook
├── lib/                # Library configurations
│   └── supabase.ts        # Supabase client setup
├── types/              # TypeScript type definitions
│   └── index.ts           # All application types
├── utils/              # Utility functions
│   └── qrGenerator.ts     # QR code generation logic
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles

supabase/
└── functions/
    └── generate-qr/    # Edge Function for API
        └── index.ts
```

## Features Deep Dive

### Error Correction Levels

- **L (Low)**: ~7% data recovery - Best for clean environments
- **M (Medium)**: ~15% data recovery - Recommended for most uses
- **Q (Quartile)**: ~25% data recovery - Good for outdoor use
- **H (High)**: ~30% data recovery - Best when logo is embedded

### Color Customization

- Full hex color support for foreground and background
- Real-time color picker with visual preview
- Manual hex input for precise color matching
- Pre-defined templates for quick professional looks

### Export Formats

- **PNG**: Best for web and general use, supports transparency
- **JPG**: Smaller file size, solid background
- **SVG**: Vector format, perfect for printing and scaling

### Content Validation

- URLs are validated and automatically prefixed with https://
- Email addresses are validated against standard format
- Phone numbers are checked for valid international format
- WiFi and location data is formatted to QR code standards

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Instant QR code generation (< 100ms)
- Optimized image processing
- Lazy loading for history items
- Efficient re-renders with React hooks

## Security

- Row Level Security (RLS) enabled on all database tables
- Anonymous users can generate QR codes without authentication
- Secure API endpoints with CORS protection
- No sensitive data stored in QR codes unless explicitly added by user

## Troubleshooting

### QR Code Not Generating
- Check that content field is not empty
- Verify content matches the selected type (e.g., valid URL format)
- Try reducing logo size if using a logo

### Logo Not Appearing
- Ensure image is under 2MB
- Use square images for best results
- Try PNG or JPG formats

### History Not Saving
- Check browser console for database errors
- Verify Supabase connection in .env file
- Ensure you have internet connection

### Dark Mode Not Working
- Clear browser localStorage
- Refresh the page
- Check system theme preferences

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes with clear commit messages
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

## Roadmap

Future enhancements planned:
- Batch QR code generation
- Advanced analytics tracking
- Custom branding options
- QR code animation effects
- PDF export with multiple codes
- API rate limiting and authentication
- User accounts with cloud storage

---

Built with React, TypeScript, Tailwind CSS, and Supabase.
