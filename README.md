# Dutch Verb Trainer

A sophisticated spaced repetition learning app for mastering Dutch verb conjugations.

## Features

- **Spaced Repetition System**: Intelligent algorithm that adapts to your learning pace
- **Problem Area Tracking**: Focuses on verb-tense combinations you struggle with
- **Contextual Learning**: Practice with real Dutch sentences and English translations
- **Customizable Tenses**: Choose which tenses to practice (Present, Past, Perfect, etc.)
- **Accurate Grammar**: Based on standard Netherlands Dutch grammar rules

## Live Demo

Visit the app at: https://ndubaz.github.io/dutch-verb-trainer

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment to GitHub Pages

1. **First time setup:**
   ```bash
   # Create repository on GitHub named 'dutch-verb-trainer'
   
   # Initialize git in your project
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/dutch-verb-trainer.git
   git push -u origin main
   ```

2. **Update package.json:**
   - Change `"homepage"` to: `"https://yourusername.github.io/dutch-verb-trainer"`
   - Replace `yourusername` with your actual GitHub username

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click Settings → Pages
   - Source should be set to `gh-pages` branch
   - Your site will be live at the homepage URL

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React Icons

## License

MIT
