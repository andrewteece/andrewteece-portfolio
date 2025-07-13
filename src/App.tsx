import { motion } from 'framer-motion';
import Header from './components/Header/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './styles/index.css';

export default function App() {
  return (
    <div className='min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300 font-sans'>
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Hero />
        <About />
        <Projects />
      </motion.main>
      <Footer />
    </div>
  );
}
