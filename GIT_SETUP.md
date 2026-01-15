# Git Setup - Connecting to Your Repository

Your GitHub repository: `https://github.com/MarkCollins09/fureanimaging.com.git`

## Quick Setup Commands

Run these commands in your terminal from the project directory:

```bash
cd "/Users/markcollins/Documents/Corporations/Advanced Imaging/Website/Furean Advanced Imaging Website"

# Initialize git (if not already done)
git init

# Add the remote repository
git remote add origin https://github.com/MarkCollins09/fureanimaging.com.git

# Check if remote was added successfully
git remote -v
```

## First Commit and Push

```bash
# Stage all files
git add .

# Make your first commit
git commit -m "Initial commit - Furean Advanced Imaging website"

# Push to GitHub (use -u to set upstream branch)
git push -u origin main
```

**Note:** If the repository already has content, you may need to:
- Pull first: `git pull origin main --allow-unrelated-histories`
- Or force push (be careful!): `git push -u origin main --force`

## Verify .gitignore

Make sure your `.gitignore` file includes (already done):
- `node_modules/`
- `.env`
- `email.env`
- `.DS_Store`
- `*.log`

This ensures sensitive files (like email.env) are NOT committed to GitHub.

## After Pushing to GitHub

Once your code is on GitHub, you can:
1. Deploy to Render.com (or your chosen hosting platform)
2. Connect the hosting platform to your GitHub repository
3. Set up environment variables on the hosting platform
4. Deploy!

See `DEPLOYMENT_GUIDE.md` for next steps.
