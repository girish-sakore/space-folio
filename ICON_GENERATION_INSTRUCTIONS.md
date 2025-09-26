# Icon Generation Instructions

## Required Icons for SEO and PWA Support

Using the existing logo `public/Proxima_Cloud-removebg-preview.png` as the base, generate the following icon files:

### Favicons
- `favicon.ico` (16x16, 32x32, 48x48 sizes in one file)
- `favicon-16x16.png` (16x16px)
- `favicon-32x32.png` (32x32px)

### Apple Touch Icons  
- `apple-touch-icon.png` (180x180px)
- `apple-touch-icon-precomposed.png` (180x180px)

### Android Chrome Icons
- `android-chrome-192x192.png` (192x192px)
- `android-chrome-512x512.png` (512x512px)

### Microsoft Tiles
- `mstile-70x70.png` (70x70px)
- `mstile-150x150.png` (150x150px)  
- `mstile-310x150.png` (310x150px)
- `mstile-310x310.png` (310x310px)

### Additional Images for SEO
- `images/og-image.png` (1200x630px) - For Open Graph/social sharing
- `images/logo.png` (400x400px) - Company logo for structured data
- `images/screenshot-wide.png` (1280x720px) - PWA screenshot
- `images/screenshot-narrow.png` (360x640px) - PWA mobile screenshot

## Generation Tools

### Online Tools:
1. **Favicon.io** (https://favicon.io/)
   - Upload your logo
   - Download complete icon package

2. **RealFaviconGenerator** (https://realfavicongenerator.net/)
   - More comprehensive options
   - Generates all required sizes

3. **PWA Builder** (https://www.pwabuilder.com/)
   - For PWA-specific icons

### Design Guidelines:
- Use the teal color (`#0d9488`) as primary theme color
- Maintain good contrast against different backgrounds
- Ensure icons work at small sizes (16x16px)
- Keep design simple and recognizable
- Use transparent backgrounds where appropriate

### File Placement:
All icon files should be placed in the `public/` directory root so they're accessible at:
- `https://proximacloud.in/favicon.ico`
- `https://proximacloud.in/android-chrome-192x192.png`
- etc.

The manifest.json and browserconfig.xml are already configured to reference these paths.
