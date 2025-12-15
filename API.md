# QR Custom Generator API Documentation

## Overview

The QR Custom Generator provides a REST API for generating QR codes programmatically. This is useful for integrating QR code generation into your own applications, services, or workflows.

## Base URL

```
https://YOUR_SUPABASE_URL/functions/v1
```

Replace `YOUR_SUPABASE_URL` with your actual Supabase project URL.

## Authentication

The API requires authentication using your Supabase anonymous key. Include it in the request headers:

```
Authorization: Bearer YOUR_SUPABASE_ANON_KEY
```

## Endpoints

### Generate QR Code

Generate a custom QR code with specified parameters.

**Endpoint**: `POST /generate-qr`

**Headers**:
```
Content-Type: application/json
Authorization: Bearer YOUR_SUPABASE_ANON_KEY
```

**Request Body**:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `content` | string | Yes | - | The content to encode in the QR code |
| `qrColor` | string | No | `#000000` | Hex color code for the QR code foreground |
| `bgColor` | string | No | `#FFFFFF` | Hex color code for the background |
| `size` | number | No | `300` | Size of the QR code in pixels (200-800) |
| `errorCorrection` | string | No | `M` | Error correction level: `L`, `M`, `Q`, or `H` |
| `format` | string | No | `png` | Output format: `png` or `svg` |

**Response**:

Success (200):
```json
{
  "success": true,
  "data": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "format": "png"
}
```

Error (400/500):
```json
{
  "error": "Error message description"
}
```

## Error Correction Levels

| Level | Recovery Capability | Use Case |
|-------|-------------------|----------|
| `L` | ~7% | Clean environments, maximum data capacity |
| `M` | ~15% | General use, recommended default |
| `Q` | ~25% | Outdoor use, moderate damage tolerance |
| `H` | ~30% | Maximum error recovery, use with logos |

## Examples

### JavaScript / Node.js

```javascript
const generateQR = async () => {
  const response = await fetch('https://YOUR_SUPABASE_URL/functions/v1/generate-qr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_SUPABASE_ANON_KEY'
    },
    body: JSON.stringify({
      content: 'https://example.com',
      qrColor: '#0077BE',
      bgColor: '#E6F3FF',
      size: 400,
      errorCorrection: 'H',
      format: 'png'
    })
  });

  const result = await response.json();

  if (result.success) {
    console.log('QR Code generated:', result.data);
    // Use the base64 data URL in an <img> tag or save to file
  } else {
    console.error('Error:', result.error);
  }
};

generateQR();
```

### Python

```python
import requests
import json
import base64

def generate_qr_code():
    url = "https://YOUR_SUPABASE_URL/functions/v1/generate-qr"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_SUPABASE_ANON_KEY"
    }
    payload = {
        "content": "https://example.com",
        "qrColor": "#000000",
        "bgColor": "#FFFFFF",
        "size": 300,
        "errorCorrection": "M",
        "format": "png"
    }

    response = requests.post(url, headers=headers, json=payload)
    result = response.json()

    if result.get("success"):
        # Extract base64 data
        data_url = result["data"]
        base64_data = data_url.split(',')[1]

        # Save to file
        with open("qrcode.png", "wb") as f:
            f.write(base64.b64decode(base64_data))
        print("QR code saved as qrcode.png")
    else:
        print(f"Error: {result.get('error')}")

generate_qr_code()
```

### cURL

```bash
curl -X POST https://YOUR_SUPABASE_URL/functions/v1/generate-qr \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "content": "https://example.com",
    "qrColor": "#000000",
    "bgColor": "#FFFFFF",
    "size": 300,
    "errorCorrection": "M",
    "format": "png"
  }'
```

### PHP

```php
<?php
$url = "https://YOUR_SUPABASE_URL/functions/v1/generate-qr";
$data = array(
    "content" => "https://example.com",
    "qrColor" => "#000000",
    "bgColor" => "#FFFFFF",
    "size" => 300,
    "errorCorrection" => "M",
    "format" => "png"
);

$options = array(
    'http' => array(
        'header'  => "Content-Type: application/json\r\n" .
                     "Authorization: Bearer YOUR_SUPABASE_ANON_KEY\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$response = json_decode($result, true);

if ($response['success']) {
    echo "QR Code generated successfully\n";
    echo $response['data'];
} else {
    echo "Error: " . $response['error'];
}
?>
```

## Common Use Cases

### 1. Dynamic Event Tickets

Generate unique QR codes for event tickets:

```javascript
const createTicketQR = async (ticketId, eventName) => {
  const ticketUrl = `https://yourapp.com/tickets/${ticketId}`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { /* ... */ },
    body: JSON.stringify({
      content: ticketUrl,
      qrColor: '#1E40AF',
      bgColor: '#EFF6FF',
      size: 500,
      errorCorrection: 'H'
    })
  });

  return await response.json();
};
```

### 2. Product Labels

Generate QR codes for product information:

```javascript
const createProductQR = async (productSku) => {
  const productUrl = `https://yourstore.com/products/${productSku}`;

  return await fetch(API_URL, {
    method: 'POST',
    headers: { /* ... */ },
    body: JSON.stringify({
      content: productUrl,
      size: 250,
      errorCorrection: 'M'
    })
  });
};
```

### 3. WiFi Credentials

Generate QR codes for easy WiFi sharing:

```javascript
const createWiFiQR = async (ssid, password) => {
  const wifiString = `WIFI:T:WPA;S:${ssid};P:${password};;`;

  return await fetch(API_URL, {
    method: 'POST',
    headers: { /* ... */ },
    body: JSON.stringify({
      content: wifiString,
      qrColor: '#059669',
      bgColor: '#D1FAE5',
      size: 400,
      errorCorrection: 'Q'
    })
  });
};
```

### 4. Contact Cards (vCard)

Generate QR codes for business cards:

```javascript
const createContactQR = async (name, email, phone) => {
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
EMAIL:${email}
TEL:${phone}
END:VCARD`;

  return await fetch(API_URL, {
    method: 'POST',
    headers: { /* ... */ },
    body: JSON.stringify({
      content: vCard,
      size: 350,
      errorCorrection: 'M'
    })
  });
};
```

## Rate Limiting

Currently, there are no rate limits imposed on the API. However, please use the API responsibly:

- Don't make excessive requests in a short period
- Implement caching for frequently generated QR codes
- Consider generating and storing QR codes in advance for static content

## Error Handling

The API returns standard HTTP status codes:

- `200`: Success
- `400`: Bad Request (invalid parameters)
- `405`: Method Not Allowed (not using POST)
- `500`: Internal Server Error

Always check the `success` field in the response:

```javascript
const response = await fetch(API_URL, { /* ... */ });
const result = await response.json();

if (!result.success) {
  console.error('API Error:', result.error);
  // Handle error appropriately
}
```

## Best Practices

1. **Cache Generated QR Codes**: Store generated QR codes to avoid regenerating the same code multiple times

2. **Use Appropriate Error Correction**:
   - Use `L` or `M` for simple, clean environments
   - Use `Q` or `H` when QR codes might be damaged or partially obscured

3. **Optimize Size**:
   - Use smaller sizes (200-300px) for web display
   - Use larger sizes (500-800px) for printing

4. **Color Contrast**: Ensure sufficient contrast between `qrColor` and `bgColor` for reliable scanning

5. **Test Scanning**: Always test generated QR codes with multiple QR code readers

6. **Handle Base64 Data**: The returned data URL includes the base64 prefix. Extract properly when saving to files

## Security Considerations

- Keep your Supabase anonymous key secure
- Don't expose API keys in client-side code for production apps
- Validate and sanitize content before generating QR codes
- Be cautious about generating QR codes with user-provided URLs (potential phishing)

## Support

For API issues or questions:
- Check the main README.md for troubleshooting
- Review the error message in the API response
- Open an issue on GitHub with details about your request

## Changelog

### v1.0.0
- Initial API release
- Support for PNG and SVG formats
- Full customization options
- Error correction levels
