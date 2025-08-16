import { lazy, Suspense, useEffect, useState, startTransition } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToAnchor from './components/ui/ScrollToAnchor';
import SEO from './components/shared/SEO';

import Hero from './components/sections/Hero';

// Route-level lazy chunks (Vite will split these automatically)
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const StyleGuide = lazy(() => import('./pages/StyleGuide'));

// Home sections that aren’t LCP — defer until idle
const TechStack = lazy(() => import('./components/sections/TechStack'));
const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/Projects'));

// Minimal, non-janky fallback (keeps layout stable)
function Fallback() {
  return <div className='h-6' aria-hidden />;
}

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '';
  const isBlogList = pathname === '/blog';

  // NEW: gate non-critical home sections until after first idle slice
  const [showSections, setShowSections] = useState(false);
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout?: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const schedule = () => startTransition(() => setShowSections(true));

    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(schedule, { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(schedule, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Page-scoped SEO (posts handle SEO in PostLayout) */}
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
              // No entry animations on first paint — keep hero fast
              <main>
                <Hero />

                {showSections && (
                  <>
                    <Suspense fallback={<Fallback />}>
                      <TechStack />
                    </Suspense>
                    <Suspense fallback={<Fallback />}>
                      <About />
                    </Suspense>
                    <Suspense fallback={<Fallback />}>
                      <Projects />
                    </Suspense>
                  </>
                )}
              </main>
            }
          />

          <Route
            path='/blog'
            element={
              <Suspense
                fallback={
                  <main>
                    <Fallback />
                  </main>
                }
              >
                <Blog />
              </Suspense>
            }
          />

          <Route
            path='/blog/:slug'
            element={
              <Suspense
                fallback={
                  <main>
                    <Fallback />
                  </main>
                }
              >
                <BlogPost />
              </Suspense>
            }
          />

          <Route
            path='/styleguide'
            element={
              <Suspense
                fallback={
                  <main>
                    <Fallback />
                  </main>
                }
              >
                <StyleGuide />
              </Suspense>
            }
          />

          <Route path='*' element={<main>Not found</main>} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}
