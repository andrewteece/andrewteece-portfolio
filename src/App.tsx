import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  return (
    <div className='min-h-screen bg-white text-gray-900'>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Footer />
    </div>
  );
}
