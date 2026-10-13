import { Link } from 'react-router-dom';
import SEO from '../components/shared/SEO';
import { Section } from '../components/shared/Section';
import { bookingHref, services } from '../content/services';

interface ServicesProps {
  standalone?: boolean;
}

export default function Services({ standalone = false }: ServicesProps) {
  const content = (
    <div className='grid gap-6 md:grid-cols-2'>
      {services.map((service) => (
        <article
          key={service.slug}
          className='flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/70 p-6 shadow-sm'
        >
          <h3 className='text-xl font-bold text-[var(--color-brand)]'>
            {service.title}
          </h3>
          <p className='mt-3 leading-relaxed text-muted'>{service.summary}</p>
          <p className='mt-4 font-semibold'>{service.startingAt}</p>
          <Link
            className='mt-auto pt-5 font-semibold text-[var(--color-brand)] underline underline-offset-4'
            to={`/services/${service.slug}`}
          >
            Explore this service
          </Link>
        </article>
      ))}
    </div>
  );

  if (!standalone) {
    return (
      <Section
        id='services'
        title='Services'
        eyebrow='Built for owners and operators'
        size='wide'
        align='center'
      >
        <p className='mx-auto mb-6 max-w-3xl text-center text-lg leading-relaxed text-muted'>
          Practical marketing, ordering, and web services from someone who has
          run a restaurant and built for the web.
        </p>
        {content}
        <div className='mt-8 text-center'>
          <a
            className='btn-primary inline-flex'
            href={bookingHref}
          >
            Book a 20-minute call
          </a>
        </div>
      </Section>
    );
  }

  return (
    <main id='main' className='px-4 pb-20 pt-32'>
      <SEO
        title='Restaurant Marketing & Website Services | Andrew Teece'
        description='Restaurant direct ordering, hospitality marketing leadership, local marketing, and website builds for businesses and agencies.'
        url='https://www.andrewteece.com/services'
        canonical='https://www.andrewteece.com/services'
      />
      <Section
        title='Services'
        eyebrow='For restaurants, hospitality teams, and agencies'
        size='wide'
        align='center'
      >
        <p className='mx-auto mb-6 max-w-3xl text-center text-lg leading-relaxed text-muted'>
          Senior-level help to strengthen your online presence, improve how
          customers order, and turn marketing into a repeatable part of
          operations.
        </p>
        {content}
        <div className='mt-8 text-center'>
          <a className='btn-primary inline-flex' href={bookingHref}>
            Book a 20-minute call
          </a>
        </div>
      </Section>
    </main>
  );
}
