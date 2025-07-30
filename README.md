# 0x1 Labs - Next.js Website

A modern, high-performance Next.js conversion of the 0x1 Labs website with Tailwind CSS, Framer Motion animations, and optimized components.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- **Optimized Performance** with lazy loading and code splitting
- **Responsive Design** that works on all devices
- **SEO Optimized** with proper meta tags and structured data
- **Modern Font Loading** with Google Fonts optimization

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd 0x1-labs-nextjs
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with fonts and metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── Navbar.tsx           # Navigation component
│   ├── Hero.tsx             # Hero section with animated background
│   ├── BinaryRain.tsx       # Animated binary rain effect
│   ├── WhatWeDo.tsx         # Services section
│   ├── Process.tsx          # Process timeline
│   ├── Products.tsx         # Product showcase
│   ├── Team.tsx             # Team stats and testimonial
│   ├── Contact.tsx          # Contact form
│   ├── Footer.tsx           # Footer component
│   └── FloatingElements.tsx # Floating background elements
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Key Improvements

### Performance Optimizations
- **Component Splitting**: Each section is a separate component for better code organization
- **Lazy Loading**: Components are loaded as needed
- **Optimized Animations**: Using Framer Motion with proper performance considerations
- **Font Optimization**: Google Fonts loaded with `next/font` for better performance

### Modern React Patterns
- **TypeScript**: Full type safety throughout the application
- **Hooks**: Using modern React hooks for state management
- **Server Components**: Leveraging Next.js 13+ app directory features

### Enhanced User Experience
- **Smooth Scrolling**: Native CSS smooth scrolling
- **Intersection Observer**: Efficient scroll-triggered animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Proper ARIA labels and semantic HTML

## 🔧 Customization

### Colors
The color palette is defined in `tailwind.config.js` and can be easily customized:

```javascript
colors: {
  primary: {
    blue: '#4A90E2',
    navy: '#0F172A',
    purple: '#7C3AED',
    mint: '#10B981',
    gray: '#64748B',
    light: '#F1F5F9',
  },
}
```

### Fonts
Fonts are configured in `app/layout.tsx` using Next.js font optimization:

```typescript
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Static Export
For static hosting, uncomment the lines in `next.config.js`:
```javascript
output: 'export',
trailingSlash: true