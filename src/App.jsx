import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Duality from './components/Duality';
import Showcase from './components/Showcase';
import Contact from './components/Contact';
import Cursor from './components/Cursor';


export default function App() {
  const cursorRef = useRef(null);

  return (
    <div className="bg-background text-text font-sans">
      <Cursor ref={cursorRef} />
      <Navbar cursorRef={cursorRef} />
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
