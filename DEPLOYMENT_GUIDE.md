# 🚀 CodeBox Deployment Guide

**Last Updated:** November 23, 2025
**Build Status:** ✅ Production Ready
**Pages:** 87 (all building successfully)

---

## ✅ PRE-DEPLOYMENT CHECKLIST

### 1. Configuration (15 minutes)

#### Update Site Configuration
Edit `lib/config/site.ts`:

```typescript
export const siteConfig = {
  // ✅ Update these values:
  name: 'CodeBox',  // Your site name
  url: 'https://your-domain.com',  // Your actual domain

  links: {
    github: 'https://github.com/yourusername/codebox',  // Your GitHub repo
    twitter: 'https://twitter.com/yourhandle',  // Your Twitter
    email: 'hello@your-domain.com',  // Your contact email
  },

  // Toggle features:
  features: {
    showGitHubLink: true,  // Set to false to hide
    showTwitterLink: true,  // Set to false to hide
    showEmailLink: true,    // Set to false to hide
  },
}
```

#### Create Environment Variables
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```bash
# Your actual domain
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Social links (optional)
NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername/codebox
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yourhandle
NEXT_PUBLIC_CONTACT_EMAIL=hello@your-domain.com
```

---

### 2. Favicon & Branding (15 minutes)

#### Option A: Use Existing SVG Icons
The app already includes terminal-themed SVG icons:
- ✅ `app/icon.svg` (main favicon)
- ✅ `app/apple-icon.svg` (iOS app icon)

**To customize:**
1. Edit the SVG files to match your brand colors
2. Current color: `#00ff41` (terminal green)
3. Change to your brand color

#### Option B: Create Custom Icons
1. Create your logo (512x512px)
2. Visit https://realfavicongenerator.net/
3. Upload your logo
4. Download generated files
5. Replace `app/icon.svg` and `app/apple-icon.svg`

---

### 3. Test Build Locally (10 minutes)

```bash
# Install dependencies (if not already done)
npm install

# Build for production
npm run build

# Test production build
npm run start

# Open http://localhost:3000 and verify:
# ✅ Favicon appears in browser tab
# ✅ All navigation links work
# ✅ Category pages load (/tools/formatters, /tools/security, /tools/generators)
# ✅ Social links point to your profiles
# ✅ Contact email is correct
```

---

## 🌐 DEPLOYMENT OPTIONS

### Option 1: Vercel (Recommended - 5 minutes)

**Why Vercel?**
- Built by Next.js creators
- Zero configuration
- Free tier includes:
  - Unlimited bandwidth
  - Automatic HTTPS
  - Edge network (CDN)
  - Preview deployments

**Steps:**

1. **Push to GitHub**
```bash
git add -A
git commit -m "Production ready deployment"
git push origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repo
- Vercel auto-detects Next.js
- Click "Deploy"

3. **Add Environment Variables** (in Vercel dashboard)
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Redeploy after adding variables

4. **Custom Domain** (optional)
- Go to Project Settings → Domains
- Add your domain
- Update DNS records as shown
- SSL certificate auto-generated

**Done!** Your site is live at `https://your-project.vercel.app`

---

### Option 2: Netlify (Alternative - 5 minutes)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Click "Add new site" → "Import an existing project"
- Connect GitHub repo
- Build settings (auto-detected):
  - Build command: `npm run build`
  - Publish directory: `.next`

3. **Environment Variables**
- Site settings → Build & deploy → Environment
- Add variables from `.env.local`

4. **Custom Domain**
- Site settings → Domain management
- Add custom domain
- Update DNS records

---

### Option 3: Self-Hosted (Advanced - 30 minutes)

**Requirements:**
- Node.js 18+
- Server with at least 512MB RAM
- Domain with SSL certificate

**Steps:**

1. **On your server:**
```bash
# Clone repo
git clone https://github.com/yourusername/codebox.git
cd codebox

# Install dependencies
npm install

# Build
npm run build

# Install PM2 (process manager)
npm install -g pm2

# Start with PM2
pm2 start npm --name "codebox" -- start
pm2 save
pm2 startup
```

2. **Setup Nginx reverse proxy:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Setup SSL with Let's Encrypt:**
```bash
sudo certbot --nginx -d your-domain.com
```

---

## 📊 POST-DEPLOYMENT VERIFICATION

### Immediate Checks (5 minutes)

1. **Homepage**: https://your-domain.com
   - [ ] Loads correctly
   - [ ] Hero section displays
   - [ ] Tool grid shows all 70+ tools

2. **Navigation**:
   - [ ] /tools - All tools page
   - [ ] /docs - Documentation
   - [ ] /about - About page
   - [ ] /changelog - Changelog

3. **Category Pages**:
   - [ ] /tools/formatters - Shows formatter tools
   - [ ] /tools/security - Shows security tools
   - [ ] /tools/generators - Shows generator tools

4. **Tool Pages**: Test 5 random tools
   - [ ] /tools/json-formatter
   - [ ] /tools/base64-encoder
   - [ ] /tools/hash-generator
   - [ ] /tools/uuid-generator
   - [ ] /tools/qr-code-generator

5. **SEO**:
   - [ ] /robots.txt - Loads correctly
   - [ ] /sitemap.xml - Shows all 87+ pages
   - [ ] Favicon appears in browser tab
   - [ ] Page titles are correct

6. **Social Links**:
   - [ ] GitHub link opens your repo
   - [ ] Twitter link opens your profile
   - [ ] Email link has correct address

---

### SEO & Performance (10 minutes)

1. **Google Search Console**
   - Add your site
   - Submit sitemap: `https://your-domain.com/sitemap.xml`
   - Request indexing

2. **Test Performance**
   - PageSpeed Insights: https://pagespeed.web.dev/
   - Target scores:
     - Performance: 90+
     - Accessibility: 90+
     - Best Practices: 100
     - SEO: 100

3. **Test Security Headers**
   - Visit: https://securityheaders.com/
   - Should show:
     - X-Frame-Options: DENY
     - X-Content-Type-Options: nosniff
     - Referrer-Policy: strict-origin-when-cross-origin

---

## 🔧 MAINTENANCE

### Regular Updates

```bash
# Update dependencies (monthly)
npm update

# Check for security vulnerabilities
npm audit
npm audit fix

# Test after updates
npm run build
npm run start
```

### Monitoring (Optional but Recommended)

**Add Error Tracking:**
1. Sign up for [Sentry](https://sentry.io)
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
   ```
3. Install Sentry:
   ```bash
   npm install @sentry/nextjs
   ```

**Add Analytics (Privacy-Respecting):**
1. Sign up for [Plausible Analytics](https://plausible.io)
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
   ```

---

## 🐛 TROUBLESHOOTING

### Build Fails

**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Error: "TypeScript errors"**
```bash
# Check for type errors
npm run type-check

# Fix or temporarily bypass (not recommended)
# In next.config.js: typescript: { ignoreBuildErrors: true }
```

### Deployment Issues

**Vercel: Build fails**
1. Check build logs in Vercel dashboard
2. Ensure Node version is 18+ in Project Settings
3. Verify all environment variables are set

**Links not working**
1. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
2. Check `lib/config/site.ts` for correct URLs
3. Verify `.env.local` values

**Favicon not showing**
1. Clear browser cache
2. Check `app/icon.svg` exists
3. Verify `app/layout.tsx` has icon metadata

---

## 📈 NEXT STEPS (Post-Launch)

### Week 1
- [ ] Monitor for errors (check logs daily)
- [ ] Test all 70+ tools manually
- [ ] Gather user feedback
- [ ] Fix any reported bugs

### Month 1
- [ ] Add analytics to understand usage
- [ ] Implement user-requested features
- [ ] Improve SEO (backlinks, content)
- [ ] Consider adding:
  - Tool favorites/bookmarks
  - Keyboard shortcut customization
  - Dark/light theme toggle
  - PWA support

### Month 3
- [ ] Review performance metrics
- [ ] Optimize bundle size if needed
- [ ] Add more tools based on user requests
- [ ] Consider premium features (if commercial)

---

## 🎯 QUICK REFERENCE

### Important URLs
- **Live Site**: https://your-domain.com
- **Sitemap**: https://your-domain.com/sitemap.xml
- **Robots**: https://your-domain.com/robots.txt
- **GitHub Repo**: Update in `lib/config/site.ts`

### Important Files
- **Configuration**: `lib/config/site.ts`
- **Environment**: `.env.local`
- **Icons**: `app/icon.svg`, `app/apple-icon.svg`
- **Security**: `next.config.js` (headers section)
- **SEO**: `app/sitemap.ts`, `app/robots.txt`

### Support
- **Documentation**: See `PRODUCTION_READINESS_AUDIT.md`
- **Critical Fixes**: See `CRITICAL_FIXES_REQUIRED.md`
- **Issues**: File at your GitHub repo

---

## ✅ DEPLOYMENT COMPLETE!

**Congratulations!** Your CodeBox installation is now live.

**Share it:**
- Twitter: "Just launched CodeBox with 70+ free developer tools! 🚀"
- Reddit: r/webdev, r/programming, r/devtools
- Product Hunt: Submit for visibility
- Hacker News: Share in Show HN

**Remember:**
- All tools run client-side (privacy-first)
- No data collection
- Free and open source (MIT License)
- Mobile-responsive
- Fast and secure

**Need help?** Review the audit reports or file an issue on GitHub.

---

**Last Build:** 87 pages
**Status:** ✅ Production Ready
**Date:** November 23, 2025
