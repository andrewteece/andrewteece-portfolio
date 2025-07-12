import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './styles/index.css';

export default function App() {
  return (
    // <div className='min-h-screen transition-colors duration-500 bg-gradient-to-tr from-sky-100 to-white dark:from-brand dark:to-gray-400'>
    <div
      className='min-h-screen transition-colors duration-500 
  bg-white text-gray-900
  dark:bg-gray-900 dark:text-white'
    >
      <Header />
      <Hero />
      <About />
      <Projects />
      <Footer />
    </div>
  );
}
