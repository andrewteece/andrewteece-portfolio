import { HelmetProvider, Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SEO from './components/shared/SEO';
import { motion } from 'framer-motion';
import ScrollToAnchor from './components/ui/ScrollToAnchor';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Hero from './components/sections/Hero';
import TechStack from './components/sections/TechStack';
import About from './components/sections/About';
import Projects from './components/Projects';

import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import StyleGuide from './pages/StyleGuide';

import './styles/index.css';

export default function App() {
  return (
    <HelmetProvider>
      <SEO />
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link rel='dns-prefetch' href='https://fonts.googleapis.com' />
        <link rel='dns-prefetch' href='https://fonts.gstatic.com' />
        <link rel='prefetch' as='image' href='/images/bg-waves.webp' />
      </Helmet>

      <div className='min-h-screen bg-bg text-text font-sans transition-colors duration-300 dark:bg-bg dark:text-text'>
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
        </Routes>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
