import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Duality from './components/Duality';
import Showcase from './components/Showcase';
import Contact from './components/Contact';
import Cursor from './components/Cursor';


export default function App() {
  return (
    <div className="bg-background text-text font-sans">
      <Cursor />
      <Navbar />
      <main>
        
        <Hero />
        <About />
        <Duality />
        <Showcase />
        <Contact />
      </main>
    </div>
  );
}
