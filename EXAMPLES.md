# QR Custom Generator - Examples

This document provides practical examples of how to use the QR Custom Generator for various real-world scenarios.

## Table of Contents

1. [Basic Website QR Code](#basic-website-qr-code)
2. [Restaurant Menu QR Code](#restaurant-menu-qr-code)
3. [WiFi Network QR Code](#wifi-network-qr-code)
4. [Business Card QR Code](#business-card-qr-code)
5. [Event Ticket QR Code](#event-ticket-qr-code)
6. [Product Information QR Code](#product-information-qr-code)
7. [Social Media Profile QR Code](#social-media-profile-qr-code)
8. [Location/Map QR Code](#locationmap-qr-code)
9. [Email Contact QR Code](#email-contact-qr-code)
10. [Phone Number QR Code](#phone-number-qr-code)

---

## Basic Website QR Code

**Use Case**: Directing users to your website

**Settings**:
- Content Type: URL
- Content: `https://yourwebsite.com`
- QR Color: `#000000` (Black)
- Background: `#FFFFFF` (White)
- Size: 300px
- Error Correction: M
- Corner Style: Square

**Result**: A classic black and white QR code that works universally.

---

## Restaurant Menu QR Code

**Use Case**: Contactless menu access for restaurants

**Settings**:
- Content Type: URL
- Content: `https://yourmenu.com/menu`
- Template: Ocean (or Custom)
- QR Color: `#C7511F` (Restaurant Orange)
- Background: `#FFF8F0` (Warm Cream)
- Size: 400px
- Error Correction: Q
- Corner Style: Rounded
- Logo: Restaurant logo (optional)

**Result**: An attractive QR code that matches restaurant branding and is easily scannable from table tents.

**Tips**:
- Use error correction Q or H if placing on tables where codes might get splashed
- Make size at least 400px for easy scanning from distance
- Add your restaurant logo for brand recognition

---

## WiFi Network QR Code

**Use Case**: Quick WiFi connection for guests

**Settings**:
- Content Type: WiFi Network
- Network Name (SSID): `YourNetworkName`
- Password: `YourSecurePassword123`
- Encryption: WPA/WPA2
- Hidden Network: No (or Yes if applicable)
- QR Color: `#059669` (Green)
- Background: `#D1FAE5` (Light Green)
- Size: 350px
- Error Correction: M
- Corner Style: Rounded

**Result**: Guests can scan and automatically connect to WiFi without typing credentials.

**Tips**:
- Print this QR code and place it in guest areas
- Update the QR code whenever you change the WiFi password
- Consider using high error correction if printed on textured surfaces

---

## Business Card QR Code

**Use Case**: Digital business card

**Settings**:
- Content Type: Text
- Content (vCard format):
```
BEGIN:VCARD
VERSION:3.0
FN:John Doe
ORG:Company Name
TITLE:Position
TEL:+1234567890
EMAIL:john@example.com
URL:https://linkedin.com/in/johndoe
END:VCARD
```
- QR Color: `#1565C0` (Professional Blue)
- Background: `#FAFAFA` (Light Gray)
- Size: 300px
- Error Correction: M
- Corner Style: Square
- Logo: Company logo

**Result**: A professional QR code that saves contact information directly to phone.

**Tips**:
- Include all relevant contact information
- Use company colors for brand consistency
- Print on business cards, email signatures, or presentations

---

## Event Ticket QR Code

**Use Case**: Event entry and verification

**Settings**:
- Content Type: URL
- Content: `https://yourevent.com/ticket/ABC123XYZ`
- QR Color: `#7C3AED` (Purple)
- Background: `#F5F3FF` (Light Purple)
- Size: 500px
- Error Correction: H (High)
- Corner Style: Rounded
- Logo: Event logo

**Result**: A distinctive, easy-to-scan ticket code with high error correction.

**Tips**:
- Use high error correction (H) in case tickets get damaged
- Make size larger (500px+) for quick scanning at entry
- Include event branding with logo and colors
- Ensure the URL is unique per ticket for security

---

## Product Information QR Code

**Use Case**: Product details, manuals, or warranty registration

**Settings**:
- Content Type: URL
- Content: `https://yourproduct.com/info/SKU-12345`
- QR Color: `#000000` (Black)
- Background: `#FFFFFF` (White)
- Size: 250px
- Error Correction: M
- Corner Style: Square

**Result**: Clean, simple QR code suitable for product packaging.

**Tips**:
- Keep it simple for maximum compatibility
- Size should fit comfortably on product label
- Link to mobile-optimized product information page
- Include user manuals, assembly instructions, or video guides

---

## Social Media Profile QR Code

**Use Case**: Quick follow on social media

**Settings**:
- Content Type: URL
- Content: `https://instagram.com/yourusername`
- Template: Neon (or custom platform colors)
- QR Color: `#E1306C` (Instagram Pink)
- Background: `#FFEEF5` (Light Pink)
- Size: 350px
- Error Correction: M
- Corner Style: Rounded
- Logo: Instagram logo or profile picture

**Result**: Branded QR code that directs to social media profile.

**Platform-Specific Colors**:
- Instagram: `#E1306C`
- Facebook: `#1877F2`
- Twitter: `#1DA1F2`
- LinkedIn: `#0A66C2`
- TikTok: `#000000`
- YouTube: `#FF0000`

**Tips**:
- Match QR code colors to platform branding
- Use on promotional materials, storefronts, or videos
- Consider creating different QR codes for different platforms

---

## Location/Map QR Code

**Use Case**: Share business location or meeting point

**Settings**:
- Content Type: GPS Location
- Latitude: `40.7128`
- Longitude: `-74.0060`
- QR Color: `#DC2626` (Red)
- Background: `#FEE2E2` (Light Red)
- Size: 350px
- Error Correction: M
- Corner Style: Rounded

**Result**: QR code that opens location in maps app.

**Tips**:
- Get exact coordinates from Google Maps
- Test that the location opens correctly in multiple map apps
- Use for:
  - Store locations
  - Event venues
  - Meeting points
  - Tourist attractions
  - Delivery addresses

---

## Email Contact QR Code

**Use Case**: Quick email composition

**Settings**:
- Content Type: Email
- Content: `support@yourcompany.com`
- QR Color: `#2563EB` (Blue)
- Background: `#EFF6FF` (Light Blue)
- Size: 300px
- Error Correction: M
- Corner Style: Rounded

**Result**: Opens email client with pre-filled recipient address.

**Advanced Version** (using Text type):
```
mailto:support@yourcompany.com?subject=Support%20Request&body=Hello%20team
```

**Tips**:
- Can pre-fill subject and body text
- Useful for customer support contact
- Place on packaging, receipts, or promotional materials

---

## Phone Number QR Code

**Use Case**: One-tap calling

**Settings**:
- Content Type: Phone
- Content: `+1234567890`
- QR Color: `#059669` (Green)
- Background: `#ECFDF5` (Light Green)
- Size: 300px
- Error Correction: M
- Corner Style: Rounded

**Result**: Tapping opens phone dialer with number pre-filled.

**Tips**:
- Always use international format (+country code)
- Perfect for:
  - Customer service hotlines
  - Emergency contacts
  - Business contact cards
  - For sale signs
- Test on both iOS and Android devices

---

## Best Practices Summary

### For Maximum Scannability:
1. **Contrast**: Ensure high contrast between QR color and background
2. **Size**: Minimum 2cm x 2cm when printed (300px for digital)
3. **Error Correction**: Use H when QR codes might be damaged
4. **Testing**: Always test with multiple devices and QR readers
5. **Quiet Zone**: Ensure white space around QR code

### For Professional Appearance:
1. **Branding**: Use company colors and logos
2. **Consistency**: Maintain visual style across all QR codes
3. **Context**: Add text label (e.g., "Scan for menu")
4. **Quality**: Use high resolution for printing

### For Security:
1. **HTTPS**: Always use secure URLs
2. **Unique IDs**: Use unique URLs for tracking/security
3. **Verification**: Test that URLs lead to correct destinations
4. **Updates**: Keep linked content current

---

## Template Quick Reference

| Template | Best For | QR Color | BG Color |
|----------|----------|----------|----------|
| Classic | Universal use | #000000 | #FFFFFF |
| Ocean | Water/Beach businesses | #0077BE | #E6F3FF |
| Forest | Eco/Nature brands | #2D5016 | #E8F5E9 |
| Sunset | Food/Hospitality | #D84315 | #FFF3E0 |
| Elegant | Luxury brands | #212121 | #F5F5F5 |
| Neon | Entertainment/Youth | #E91E63 | #1A1A1A |
| Corporate | Professional services | #1565C0 | #FAFAFA |
| Minimal | Tech/Modern brands | #424242 | #FFFFFF |

---

## Need Help?

- Check the main README.md for detailed documentation
- Review API.md for programmatic generation
- Open an issue on GitHub for specific questions

Happy QR code generating!
