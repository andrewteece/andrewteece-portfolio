// src/App.tsx
import { Routes, Route } from 'react-router-dom';

import { motion } from 'framer-motion';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToAnchor from './components/ui/ScrollToAnchor';
import SEO from './components/shared/SEO';

import Hero from './components/sections/Hero';
import TechStack from './components/sections/TechStack';
import About from './components/sections/About';
import Projects from './components/Projects';

import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import StyleGuide from './pages/StyleGuide';
import NotFound from './pages/NotFound';

import { useGaPageViews } from './hooks/useGaPageViews'; // ← add this

export default function App() {
  // GA4 SPA pageviews
  useGaPageViews('G-HRXLND5LVK');

  return (
    <>
      <SEO />

      <div className='min-h-screen font-sans transition-colors duration-300 bg-bg text-text dark:bg-bg dark:text-text'>
        <Header />
        <ScrollToAnchor />

        <Routes>
          <Route
            path='/'
            element={
              <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Hero />
                <TechStack />
                <About />
                <Projects />
              </motion.main>
            }
          />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:slug' element={<BlogPost />} />
          <Route path='/styleguide' element={<StyleGuide />} />
          <Route path='*' element={<NotFound />} />{' '}
          {/* ← removed stray space */}
        </Routes>

        <Footer />
      </div>
    </>
  );
}
