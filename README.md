# 🪔 Diwali Wish Creator

A beautiful web application that allows users to create personalized Diwali wish pages with custom themes, animations, and social sharing capabilities.

## ✨ Features

- **Personalized Wish Pages**: Create custom Diwali greetings with your name and message
- **11 Beautiful Messages**: Pre-written messages with emojis or write your own
- **6 Stunning Themes**: Gold Glow, Royal Purple, Festive Orange, Midnight Sky, Rose Gold, Emerald Green
- **Smart Theme Recommendations**: Each message has a recommended theme
- **Rich Animations**: Confetti, fireworks, floating diyas, and twinkling stars
- **2-Step Form**: Simple and intuitive creation process
- **Multiple Sharing Options**: WhatsApp text sharing, image download, and native image sharing
- **Enhanced WhatsApp Sharing**: Bold headlines with emoji borders
- **Image Upload**: Add personal photos to your wishes
- **Signature Section**: Editable signature with name and number
- **Responsive Design**: Works perfectly on all devices
- **Real-time Storage**: Powered by Supabase for reliable data storage

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- A Supabase account
- Git

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd diwali-wish-creator
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Copy `env.example` to `.env.local`:

```bash
cp env.example .env.local
```

4. Add your Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set up Database

Run the SQL commands from `supabase-schema.sql` in your Supabase SQL editor:

```sql
-- Create the wishes table
CREATE TABLE wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  theme TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON wishes
  FOR SELECT USING (true);

-- Create policy to allow public insert access
CREATE POLICY "Allow public insert access" ON wishes
  FOR INSERT WITH CHECK (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('wish-images', 'wish-images', true);

-- Create policy for storage bucket
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'wish-images');

CREATE POLICY "Allow public downloads" ON storage.objects
  FOR SELECT USING (bucket_id = 'wish-images');
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 🎨 Themes

### Gold Glow
- Warm golden gradient background
- Floating diya animations
- Perfect for traditional celebrations

### Royal Purple
- Elegant purple gradient
- Confetti animations
- Great for formal wishes

### Festive Orange
- Vibrant orange-pink gradient
- Fireworks animations
- Perfect for joyful celebrations

### Midnight Sky
- Dark navy gradient
- Twinkling star animations
- Ideal for evening wishes

### Rose Gold
- Pink to gold gradient
- Confetti animations
- Perfect for family wishes

### Emerald Green
- Green gradient
- Diya animations
- Great for health and success wishes

## 🚀 Deploy to Vercel

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Option 2: Deploy with GitHub

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Animations**: Canvas Confetti, CSS Animations
- **Image Export**: html2canvas
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📱 Usage

1. **Step 1 - Choose Message**: Select from 11 beautiful pre-written messages with emojis or write your own
2. **Step 2 - Customize**: Pick a theme (recommended theme is pre-selected), enter your name (required), and optionally add receiver name and photo
3. **Generate**: Click "Generate My Wish Page" to create your personalized page
4. **Share**: Use WhatsApp sharing, download as image, or share image natively
5. **Enjoy**: Your wish page gets a unique URL that you can share with anyone!

## 🎯 Message Types

- **Traditional Blessing**: Classic Diwali wishes with prosperity themes
- **Elegant Wishes**: Sophisticated and refined messages
- **Joyful Celebration**: Fun and energetic wishes
- **Peaceful Wishes**: Calm and serene messages
- **Prosperity Wishes**: Wealth and success focused
- **Family Togetherness**: Family bonding themes
- **Success & Growth**: Career and personal growth
- **Health & Wellness**: Health and well-being
- **Friendship & Love**: Friendship focused
- **New Beginnings**: Fresh starts and opportunities
- **Write Your Own**: Complete freedom to write custom messages

## 🎯 API Endpoints

- `GET /` - Main form page
- `GET /wish/[id]` - Personalized wish page
- `POST /api/wishes` - Create new wish (handled by Supabase)

## 🔧 Customization

### Adding New Themes

1. Add theme configuration to `themeConfigs` in `/src/app/wish/[id]/page.tsx`
2. Add CSS classes in `globals.css`
3. Update the theme selection in the main form

### Modifying Animations

- Edit CSS animations in `globals.css`
- Modify confetti triggers in the wish page component
- Add new animation libraries as needed

## 📄 License

MIT License - feel free to use this project for your own Diwali wishes!

## 🤝 Contributing

We welcome contributions to make the Diwali Wish Creator even better! Here's how you can contribute:

### 🐛 Bug Reports
- Use the GitHub Issues to report bugs
- Include steps to reproduce the issue
- Provide screenshots if applicable

### ✨ Feature Requests
- Suggest new message types or themes
- Propose UI/UX improvements
- Request new sharing options

### 🔧 Development
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### 📝 Code Style
- Follow existing code patterns
- Use TypeScript for type safety
- Add comments for complex logic
- Test on multiple devices/browsers

### 🎨 Design Contributions
- New theme designs
- Animation improvements
- Mobile responsiveness
- Accessibility enhancements

## 🆘 Support

If you encounter any issues:

1. Check that your Supabase credentials are correct
2. Ensure the database schema is set up properly
3. Verify that storage bucket policies are configured
4. Check the browser console for any errors

---

**Happy Diwali! 🪔✨**

May this festival of lights bring joy, prosperity, and happiness to you and your loved ones.
