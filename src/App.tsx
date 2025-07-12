import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './styles/index.css';

export default function App() {
  return (
    <div
      className='min-h-screen
        bg-gradient-to-tr from-sky-100 to-white
        dark:from-brand dark:to-gray-400
        text-brand dark:text-white
        transition-colors duration-500'
    >
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
