import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when 50% of the section is in view
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setTheme('light');
    }
  };

  const getLinkClass = (sectionId) => (
    `hover:text-brand transition-colors ${activeSection === sectionId ? 'text-brand font-semibold' : 'text-subtle-text'}`
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto px-8 py-4 flex justify-between items-center">
        <a href="#hero" className="text-3xl font-display font-bold text-text tracking-wide">0x1</a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-base items-center">
          <li><a href="#about" className={getLinkClass('about')}>About</a></li>
          <li><a href="#duality" className={getLinkClass('duality')}>Duality</a></li>
          <li><a href="#showcase" className={getLinkClass('showcase')}>Showcase</a></li>
          <li><a href="#contact" className="bg-brand text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">Contact</a></li>
          <li>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-subtle-bg transition-colors">
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707.707M5.382 18.618l-.707.707M18.618 5.382l-.707-.707M5.382 5.382l-.707-.707M12 18a6 6 0 100-12 6 6 0 000 12z"></path></svg>
              ) : (
                <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden mr-12">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-subtle-bg transition-colors mr-2">
            {theme === 'dark' ? (
              <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707.707M5.382 18.618l-.707.707M18.618 5.382l-.707-.707M5.382 5.382l-.707-.707M12 18a6 6 0 100-12 6 6 0 000 12z"></path></svg>
            ) : (
              <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            )}
          </button>
          <button onClick={toggleMenu} className="text-text focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-md py-4">
          <ul className="flex flex-col items-center gap-6 text-base">
            <li><a href="#about" onClick={toggleMenu} className={getLinkClass('about')}>About</a></li>
            <li><a href="#duality" onClick={toggleMenu} className={getLinkClass('duality')}>Duality</a></li>
            <li><a href="#showcase" onClick={toggleMenu} className={getLinkClass('showcase')}>Showcase</a></li>
            <li><a href="#contact" onClick={toggleMenu} className="block py-2 bg-brand text-white px-4 rounded-md hover:opacity-90 transition-opacity">Contact</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}