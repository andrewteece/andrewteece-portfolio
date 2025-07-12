export default function About() {
  return (
    <section
      id='about'
      className='py-20 px-4 max-w-4xl mx-auto text-center text-[var(--color-text)] transition-colors'
    >
      <h3 className='text-3xl font-semibold mb-6 text-[var(--color-brand)]'>
        About Me
      </h3>
      <p className='text-lg leading-relaxed text-[var(--color-text)]'>
        I'm a frontend developer passionate about building responsive,
        accessible, and high-performance interfaces. I enjoy working with modern
        technologies like <strong>React</strong>, <strong>TypeScript</strong>,
        and <strong>Tailwind CSS</strong>
        to create clean, user-friendly web experiences.
      </p>
    </section>
  );
}
