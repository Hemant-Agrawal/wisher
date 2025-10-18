# 🚀 Deployment Guide

## Deploy to Vercel (Recommended)

### Step 1: Prepare Your Repository

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Diwali Wish Creator"
git branch -M main
git remote add origin https://github.com/yourusername/diwali-wish-creator.git
git push -u origin main
```

### Step 2: Deploy with Vercel

1. **Option A: Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Option B: Vercel CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

### Step 3: Configure Environment Variables

In your Vercel dashboard, go to Settings > Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Set up Supabase

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Set up Database**
   - Go to SQL Editor in Supabase
   - Run the commands from `supabase-schema.sql`

3. **Configure Storage**
   - Go to Storage in Supabase
   - Create a bucket named `wish-images`
   - Set it to public

### Step 5: Update Domain (Optional)

- Go to Vercel dashboard > Settings > Domains
- Add your custom domain
- Update DNS records as instructed

## Alternative Deployment Options

### Netlify

1. Build the project:
```bash
npm run build
npm run export
```

2. Deploy the `out` folder to Netlify

### Railway

1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

### DigitalOcean App Platform

1. Connect your repository
2. Set build command: `npm run build`
3. Set run command: `npm start`
4. Add environment variables

## Environment Variables Reference

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional (for analytics)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Post-Deployment Checklist

- [ ] Environment variables are set
- [ ] Supabase database is configured
- [ ] Storage bucket is created and public
- [ ] Domain is working
- [ ] SSL certificate is active
- [ ] Form submission works
- [ ] Image upload works
- [ ] Wish pages load correctly
- [ ] Social sharing works
- [ ] Image download works

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_`
   - Redeploy after adding variables
   - Check variable names match exactly

3. **Supabase Connection Issues**
   - Verify URL and key are correct
   - Check RLS policies are set up
   - Ensure storage bucket exists

4. **Images Not Uploading**
   - Check storage bucket is public
   - Verify upload policies
   - Check file size limits

### Performance Optimization

1. **Enable Vercel Analytics**
2. **Optimize Images**
   - Use Next.js Image component
   - Compress images before upload

3. **Enable Caching**
   - Set appropriate cache headers
   - Use CDN for static assets

## Monitoring

### Vercel Analytics
- Built-in performance monitoring
- Real-time user analytics
- Error tracking

### Supabase Monitoring
- Database performance
- Storage usage
- API request logs

## Security Considerations

1. **Environment Variables**
   - Never commit `.env.local`
   - Use Vercel's secure environment variables

2. **Database Security**
   - Enable RLS policies
   - Limit public access appropriately
   - Regular security updates

3. **File Upload Security**
   - Validate file types
   - Set file size limits
   - Scan for malware (optional)

## Scaling Considerations

### Database
- Monitor query performance
- Add indexes for frequently queried fields
- Consider read replicas for high traffic

### Storage
- Monitor storage usage
- Implement cleanup policies for old images
- Consider CDN for global distribution

### Application
- Monitor response times
- Set up alerts for errors
- Consider serverless scaling limits

## Backup Strategy

1. **Database Backups**
   - Enable Supabase automatic backups
   - Export data regularly

2. **Code Backups**
   - Use Git for version control
   - Regular commits and pushes

3. **Asset Backups**
   - Export storage bucket contents
   - Keep local copies of important assets

---

Your Diwali Wish Creator is now ready to spread joy and happiness! 🪔✨
