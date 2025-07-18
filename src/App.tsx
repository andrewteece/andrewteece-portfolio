import { Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToAnchor from './components/ui/ScrollToAnchor';
import SEO from './components/shared/SEO';

import Hero from './components/Sections/Hero';
import TechStack from './components/Sections/TechStack';
import About from './components/Sections/About';
import Projects from './components/Projects';

import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import StyleGuide from './pages/StyleGuide';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <HelmetProvider>
      <SEO />
      <Helmet>
        <link rel='preload' as='image' href='/images/bg-waves.webp' />
        <link
          rel='alternate'
          type='application/rss+xml'
          title='RSS Feed'
          href='/feed.xml'
        />
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
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
