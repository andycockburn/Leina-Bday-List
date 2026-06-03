# Leina's Birthday Wishlist

A shared gift-claiming app for Leina's 9th birthday.

## Deploy to Vercel

### 1. Push to GitHub
Create a new GitHub repo and push this folder to it.

```bash
git init
git add .
git commit -m "Leina's birthday wishlist"
git remote add origin https://github.com/YOUR_USERNAME/leina-birthday.git
git push -u origin main
```

### 2. Add Vercel KV (for storing claims)
- Go to your Vercel dashboard → Storage → Create → KV Database
- Name it anything (e.g. `leina-birthday-kv`)
- Connect it to your project — Vercel will automatically add the required environment variables

### 3. Deploy
- Go to vercel.com → Add New Project → import your GitHub repo
- Click Deploy — that's it!

Your site will be live at a URL like `leina-birthday.vercel.app` which you can share with family.
