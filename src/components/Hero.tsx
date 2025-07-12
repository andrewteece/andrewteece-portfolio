import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className='min-h-[85vh] flex flex-col justify-center items-center text-center px-4'>
      <motion.h2
        className='text-4xl md:text-6xl font-bold'
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frontend Developer
      </motion.h2>
      <p className='mt-4 text-lg max-w-xl text-gray-600'>
        I build fast, responsive websites using modern web technologies like
        React, TypeScript, and Tailwind CSS.
      </p>
      <div className='mt-6 space-x-4'>
        <a
          href='#projects'
          className='px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-700'
        >
          View Work
        </a>
        <a
          href='#contact'
          className='px-6 py-2 border border-gray-900 rounded-xl hover:bg-gray-100'
        >
          Contact
        </a>
      </div>
    </section>
  );
}
