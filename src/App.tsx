import { Routes, Route, useLocation } from 'react-router-dom';
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

import { useGaPageViews } from './hooks/useGaPageViews';

export default function App() {
  // GA4 SPA pageviews
  useGaPageViews('G-HRXLND5LVK');

  // Scope SEO: home + blog index only (posts render SEO in PostLayout)
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '';
  const isBlogList = pathname === '/blog';

  return (
    <>
      {isHome && (
        <SEO
          title='Andrew Teece | Front-End Developer'
          description='Experienced front-end developer delivering performant, accessible, and beautiful web apps.'
          url='https://www.andrewteece.com/'
          canonical='https://www.andrewteece.com/'
          type='website'
        />
      )}

      {isBlogList && (
        <SEO
          title='Blog — Andrew Teece'
          description='Articles on React, Vite, Tailwind, and front-end craft.'
          url='https://www.andrewteece.com/blog'
          canonical='https://www.andrewteece.com/blog'
          type='website'
        />
      )}

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
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}
