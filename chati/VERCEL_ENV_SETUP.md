# Vercel Environment Variables Setup

## Required Environment Variable

To fix the blog posts not showing on production, you need to set this environment variable in Vercel:

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/dashboard
2. Select your project: **chati-eta**
3. Click on **Settings** tab
4. Click on **Environment Variables** in the sidebar

### Step 2: Add Environment Variable

Add the following variable:

**Variable Name:**
```
NEXT_PUBLIC_BASE_URL
```

**Value:**
```
https://chati-eta.vercel.app
```
(Or use your custom domain if you have one)

**Environment:** Select all (Production, Preview, Development)

### Step 3: Redeploy

After adding the environment variable:
1. Go to **Deployments** tab
2. Click on the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Check "Use existing Build Cache" is OFF
5. Click **Redeploy**

## Alternative: Add to .env.local (for local testing)

Create `.env.local` file in your project root:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

This is already gitignored, so it won't be committed.

## Verification

After redeployment, your blog posts should appear at:
- https://chati-eta.vercel.app/blog

You should see all your database blog posts along with the static ones.

## Why This Was Needed

The issue was that Next.js was trying to fetch from `http://localhost:3000` during the build process on Vercel, which doesn't work because:
1. There's no localhost on Vercel's build servers
2. The API needs to be accessed via the public URL

By setting `NEXT_PUBLIC_BASE_URL`, the app knows to use the production URL when deployed.

## Troubleshooting

If posts still don't appear:
1. Check Vercel deployment logs for errors
2. Verify your DATABASE_URL is set in Vercel environment variables
3. Make sure your blog posts have `status: "PUBLISHED"` in the database
4. Check that your API routes (`/api/blog` and `/api/public/blog/slug/[slug]`) are working
