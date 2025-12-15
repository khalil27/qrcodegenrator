# Changelog

All notable changes to QR Custom Generator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-05

### Initial Release

#### Added
- **Core QR Code Generation**
  - Support for 6 content types (URL, Text, Email, Phone, WiFi, Location)
  - Real-time QR code preview
  - Instant generation with canvas-based rendering

- **Customization Features**
  - Full color customization with hex color picker
  - Size adjustment (200px - 800px)
  - 4 error correction levels (L, M, Q, H)
  - 3 corner styles (Square, Rounded, Dots)
  - Logo upload and automatic embedding

- **Templates**
  - 8 pre-built professional templates
  - One-click template application
  - Template preview cards

- **Export Options**
  - Download as PNG, JPG, or SVG
  - Copy to clipboard functionality
  - Multiple export formats

- **History Management**
  - Automatic saving to Supabase database
  - View last 10 generated QR codes
  - Restore previous configurations
  - Delete from history
  - Timestamp display

- **Social Sharing**
  - Share to WhatsApp
  - Share to Facebook
  - Share to Twitter/X
  - Share to LinkedIn
  - Native system share dialog

- **User Interface**
  - Modern, clean design
  - Dark and light mode support
  - Automatic theme detection
  - Fully responsive (mobile, tablet, desktop)
  - Smooth animations and transitions

- **Content Type Features**
  - WiFi: SSID, password, encryption type, hidden network
  - Location: Latitude and longitude input
  - Email: Automatic mailto: formatting
  - Phone: International format support
  - URL: Automatic https:// prefix
  - Text: Multi-line support

- **Validation**
  - URL format validation
  - Email format validation
  - Phone number validation
  - Real-time error feedback

- **API**
  - REST API endpoint for programmatic generation
  - Full customization support
  - CORS-enabled
  - JSON request/response

- **Database**
  - Supabase PostgreSQL integration
  - Row Level Security (RLS)
  - Anonymous user support
  - Secure data storage

- **Documentation**
  - Comprehensive README
  - API documentation
  - Usage examples
  - Contributing guidelines
  - Feature list
  - Code examples in multiple languages

### Technical Details
- React 18 with TypeScript
- Vite build system
- Tailwind CSS for styling
- Supabase for backend
- Edge Functions for API
- qrcode library for generation
- react-colorful for color picking
- Lucide React for icons

### Security
- HTTPS-only connections
- Row Level Security on all database tables
- No user tracking or analytics
- GDPR-friendly privacy approach

---

## [Unreleased]

### Planned Features
- Batch QR code generation
- Advanced analytics and tracking
- Custom branding and watermarks
- QR code animation effects
- PDF export with multiple codes
- Dynamic QR codes with editable content
- Built-in QR code scanner
- User accounts with cloud synchronization
- Team collaboration features
- API authentication and rate limiting
- Webhook notifications
- A/B testing for QR designs
- More export formats (EPS, WebP)
- Custom error correction patterns
- QR code templates marketplace
- Multi-language support

### Known Issues
- None currently reported

---

## Version History

### Version Numbering
- **Major (X.0.0)**: Incompatible API changes
- **Minor (0.X.0)**: New features, backwards compatible
- **Patch (0.0.X)**: Bug fixes, backwards compatible

### Support
For issues or questions about specific versions, please open an issue on GitHub.

---

## Migration Guides

### Migrating to 1.0.0
This is the initial release. No migration needed.

---

## Deprecation Notices

No features are currently deprecated.

---

## Credits

### Contributors
- Initial development and design

### Libraries
- [qrcode](https://github.com/soldair/node-qrcode) - QR code generation
- [react-colorful](https://github.com/omgovich/react-colorful) - Color picker
- [Lucide React](https://lucide.dev/) - Icon library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Supabase](https://supabase.com/) - Backend and database

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
