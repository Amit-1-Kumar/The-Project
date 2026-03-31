# 🚀 Installation & Deployment Guide

## Prerequisites
- Web server (Apache, Nginx, or Node.js)
- Text editor or IDE
- FTP/SFTP access to your server (or GitHub)
- Basic HTML/CSS/JavaScript knowledge

---

## 🌐 Option 1: WordPress Site (Most Common)

### Step 1: Upload Files
1. Using FTP/SFTP, navigate to your site root
2. Create a new folder: `/printer-support/`
3. Upload these files:
   - `index.html`
   - `styles.css`
   - `script.js`

### Step 2: Create Custom Page
1. Go to WordPress Admin
2. Pages → New Page
3. Title: "Printer Support"
4. Slug: `printer-support`
5. In editor, use this shortcode or embed:

```html
<iframe src="/printer-support/index.html" style="width:100%; height:100vh; border:none;"></iframe>
```

Or embed directly in template:
```php
<?php 
  include(get_template_directory() . '/printer-support/index.html');
?>
```

### Step 3: Update Backend Endpoint
In `script.js`, change:
```javascript
// Line 169
fetch('https://yoursite.com/wp-json/custom/v1/leads', {
```

Create custom WordPress endpoint in functions.php:
```php
add_action('rest_api_init', function() {
    register_rest_route('custom/v1', '/leads', array(
        'methods' => 'POST',
        'callback' => 'handle_lead',
        'permission_callback' => '__return_true'
    ));
});

function handle_lead($request) {
    $data = $request->get_json_params();
    // Save to database
    global $wpdb;
    $wpdb->insert('wp_leads', $data);
    return array('success' => true);
}
```

---

## 🔌 Option 2: Static HTML Site

### Step 1: Upload Files
1. Via FTP, upload to site root:
   - `index.html` as `printer-support.html`
   - `styles.css`
   - `script.js`
2. Ensure all files are in same directory

### Step 2: Update Image & Link Paths
All paths should be relative:
```html
<!-- ✅ Correct -->
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>

<!-- ❌ Wrong -->
<link rel="stylesheet" href="/var/www/styles.css">
```

### Step 3: Add to Navigation
Link in your main site navigation:
```html
<a href="/printer-support.html">Get Support</a>
```

---

## 🟢 Option 3: Node.js/Express Backend

### Step 1: Initialize Project
```bash
mkdir printer-support
cd printer-support
npm init -y
npm install express cors dotenv
```

### Step 2: Create server.js
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serve static files

// Lead endpoint
app.post('/api/leads', (req, res) => {
    // Save lead logic here
    res.json({ success: true });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running!');
});
```

### Step 3: Folder Structure
```
printer-support/
├── server.js
├── .env
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── package.json
```

### Step 4: Deploy
```bash
# Test locally
npm start

# Deploy to Heroku
heroku create your-app-name
git push heroku main

# Deploy to DigitalOcean or AWS
# Use PM2 for process management
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

---

## 🐳 Option 4: Docker Deployment

### Step 1: Create Dockerfile
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Step 2: Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    volumes:
      - ./logs:/app/logs
```

### Step 3: Deploy
```bash
docker build -t printer-support .
docker run -p 3000:3000 printer-support
```

---

## ☁️ Option 5: AWS / Vercel / Netlify

### Vercel (Easiest for Static + Serverless)
```bash
npm install -g vercel
vercel login
vercel deploy
```

### Netlify (Simple Drop & Drop)
1. GitHub → Connect repo
2. Select branch: main
3. Build command: (leave empty for static)
4. Deploy!

### AWS (Most Control)
1. EC2 → Launch instance
2. Install Node.js
3. Clone repository
4. Use PM2 for process management
5. Use Nginx as reverse proxy

---

## 🔌 Integration with Existing Website

### If You Have Contact Form Already
Replace current form submission with:

```javascript
// Old form
// $('#contactForm').submit(handler);

// New submit - integrates with chat
function handleExistingForm() {
    const name = $('#name').val();
    const phone = $('#phone').val();
    const issue = $('#issue').val();
    
    // Send to same backend
    fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, issue, source: 'contact_form' })
    });
}
```

### If You Have Navigation Menu
Add support link:
```html
<nav>
    <a href="/">Home</a>
    <a href="/services">Services</a>
    <a href="/printer-support">Support</a> <!-- New -->
    <a href="/contact">Contact</a>
</nav>
```

### If You Have CRM
Connect leads to your CRM:

```javascript
// In script.js after lead capture
function sendToCRM(lead) {
    fetch('/api/crm/create-contact', {
        method: 'POST',
        body: JSON.stringify(lead)
    });
}
```

---

## 🔧 Server Configuration

### Apache (.htaccess)
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]
</IfModule>
```

### Nginx
```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/printer-support;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### SSL/HTTPS (Required for Production)
```bash
# Free SSL with Let's Encrypt
sudo apt install certbot
certbot certonly --standalone -d example.com
```

---

## 📦 Database Setup (If Using Backend)

### PostgreSQL
```sql
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    issue TEXT,
    source VARCHAR(50),
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_phone ON leads(phone);
CREATE INDEX idx_created_at ON leads(created_at);
```

### MongoDB
```javascript
db.createCollection("leads", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "phone"],
            properties: {
                name: { bsonType: "string" },
                phone: { bsonType: "string" },
                issue: { bsonType: "string" },
                source: { bsonType: "string" },
                status: { bsonType: "string" },
                createdAt: { bsonType: "date" }
            }
        }
    }
});

db.leads.createIndex({ "phone": 1 });
db.leads.createIndex({ "createdAt": -1 });
```

---

## 🌍 CDN Setup (For Fast Loading)

### CloudFlare (Recommended)
1. Add domain to CloudFlare
2. Update nameservers
3. Enable:
   - Caching
   - Compression
   - Minification

### AWS CloudFront
1. Create distribution
2. Origin: Your S3 bucket or server
3. Set cache behavior
4. Deploy

---

## 📊 Monitoring & Logging

### Set Up Error Tracking
```javascript
// Sentry integration
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  environment: "production"
});
```

### Monitor API Calls
```bash
# View server logs
tail -f /var/log/app.log

# PM2 logs
pm2 logs
```

---

## 🔐 SSL Certificate Setup

### Free Using Let's Encrypt
```bash
# On Ubuntu
sudo apt update
sudo apt install certbot python3-certbot-apache

# Generate certificate
sudo certbot certonly --apache -d example.com

# Auto-renew
sudo systemctl enable certbot.timer
```

### In Nginx
```nginx
server {
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    # Configuration...
}

server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

---

## ✅ Post-Deployment Checklist

- [ ] All files uploaded correctly
- [ ] Phone numbers updated
- [ ] WhatsApp number configured
- [ ] Backend API endpoint updated
- [ ] SSL certificate installed
- [ ] Database created and connected
- [ ] Logs configured
- [ ] Monitoring set up
- [ ] Backups enabled
- [ ] Testing completed
- [ ] Performance optimized
- [ ] Analytics integrated
- [ ] Mobile responsive tested
- [ ] All links working
- [ ] Chat functionality verified

---

## 🚨 Troubleshooting

### Files Not Loading
```bash
# Check file permissions
chmod 644 *.html *.css *.js
chmod 755 permissions on directories
```

### API Not Working
```bash
# Check CORS headers
curl -H "Origin: https://example.com" \
     -H "Access-Control-Request-Method: POST" \
     https://api.example.com/api/leads -v

# Check backend logs
pm2 logs your-app
```

### Performance Issues
1. Enable gzip compression
2. Minify CSS/JS
3. Use CDN
4. Optimize images
5. Cache static files

---

## 📞 Get Help

If you get stuck during deployment:
1. Check browser console (F12)
2. Review server logs
3. Test API endpoints directly
4. Verify file paths
5. Clear browser cache

---

**Version:** 1.0
**Last Updated:** 2024
