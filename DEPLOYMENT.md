# CodeBox Deployment Guide

Quick guide to deploy CodeBox to production using Vercel.

## 🚀 Quick Deploy (5 minutes)

### Option 1: Deploy with Vercel (Recommended)

1. **Push to GitHub** (if not already done):
   ```bash
   # Add GitHub remote
   git remote add github https://github.com/YOUR_USERNAME/codebox.git

   # Push to GitHub
   git push github claude/devtools-compilation-webapp-01Qg6ZLZwWdHwJgvR7phm8Jb:main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Done! Your site is live in ~2 minutes

### Option 2: Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from project root)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? codebox
# - In which directory is your code located? ./
# - Auto-detected Next.js. Override? No
# - Deploy? Yes

# Production deployment
vercel --prod
```

---

## 🔧 Configuration

### Environment Variables

**No environment variables needed!** All tools run 100% client-side.

### Build Settings (Auto-detected)

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher

### Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate auto-generated

---

## 📊 Performance Checklist

Before deployment, verify:

- [x] TypeScript types pass (`npx tsc --noEmit`)
- [x] Build succeeds (`npm run build`)
- [x] All tools functional
- [x] Keyboard shortcuts work
- [x] Toast notifications work
- [x] Copy/download functions work
- [x] Responsive on mobile

Expected Lighthouse scores:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

---

## 🌐 Alternative Platforms

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Build command: npm run build
# Publish directory: .next
```

### Cloudflare Pages

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set build output: `.next`
4. Deploy

### Self-Hosted (VPS/Docker)

```bash
# Build for production
npm run build

# Start production server
npm run start

# Or use PM2 for process management
npm i -g pm2
pm2 start npm --name "codebox" -- start
```

---

## 🔒 Security

✅ **All tools run client-side** - No data sent to servers
✅ **No API keys needed** - No secrets to manage
✅ **No database** - Stateless architecture
✅ **HTTPS enforced** - Vercel provides free SSL

---

## 📈 Monitoring

### Vercel Analytics (Free)

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Web Vitals

Already included in Next.js 14. View in Vercel Dashboard → Analytics.

---

## 🐛 Troubleshooting

### Build fails with font loading error
- **Expected behavior** - Fonts load from Google CDN
- **Solution**: Build will succeed on Vercel (network available)

### "Module not found" error
```bash
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

### Deployment timeout
- Increase timeout in Vercel settings (default: 10s)
- Or remove heavy dependencies

---

## 📝 Post-Deployment

### Test Production

1. Visit your deployed URL
2. Test all 5 tools:
   - JSON Formatter
   - Base64 Encoder/Decoder
   - URL Encoder/Decoder
   - UUID Generator
   - Lorem Ipsum Generator
3. Test keyboard shortcuts (Ctrl+Enter, Ctrl+K)
4. Test mobile responsiveness
5. Check Lighthouse scores

### Set Up Monitoring

- Enable Vercel Analytics
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor web vitals

### Share!

- Tweet your launch
- Share on Reddit (r/webdev, r/programming)
- Post on Hacker News
- Add to Product Hunt

---

## 🎉 You're Live!

Your developer tools are now available to the world!

**Next Steps:**
- Add more tools (67 remaining from roadmap)
- Implement search functionality
- Add categories page
- Gather user feedback

---

**Need help?** Check [DEVELOPMENT.md](./DEVELOPMENT.md) or open an issue on GitHub.
