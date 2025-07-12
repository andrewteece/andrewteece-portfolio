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
      <div className='text-green-600 text-3xl font-bold p-4'>Tailwind Test</div>
      <div className='test-style'>Tailwind Works!</div>
      <Footer />
    </div>
  );
}
