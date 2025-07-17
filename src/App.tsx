import { HelmetProvider, Helmet } from 'react-helmet-async';
import SEO from './components/shared/SEO';
import { motion } from 'framer-motion';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import TechStack from './components/sections/TechStack';
import About from './components/sections/About';
import Projects from './components/Projects';
import Footer from './components/layout/Footer';
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
      </Helmet>
      <div className='min-h-screen bg-bg text-text font-sans transition-colors duration-300 dark:bg-bg dark:text-text'>
        <Header />
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
        <Footer />
      </div>
    </HelmetProvider>
  );
}
