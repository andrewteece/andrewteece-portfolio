function Footer() {
  return (
    <footer id='contact' className='text-center py-10 text-sm text-gray-500'>
      <p>
        © {new Date().getFullYear()} Andrew Teece •{' '}
        <a href='mailto:andrew@example.com' className='underline'>
          Email Me
        </a>
      </p>
    </footer>
  );
}

export default Footer;
