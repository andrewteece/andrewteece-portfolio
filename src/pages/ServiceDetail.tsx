import { Link, useParams } from 'react-router-dom';
import SEO from '../components/shared/SEO';
import { Section } from '../components/shared/Section';
import { bookingHref, services } from '../content/services';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <main id='main' className='px-4 pb-20 pt-32'>
        <Section title='Service not found' align='center'>
          <p className='text-center text-muted'>
            That service page could not be found.
          </p>
          <p className='text-center'>
            <Link className='text-[var(--color-brand)] underline' to='/services'>
              Browse all services
            </Link>
          </p>
        </Section>
      </main>
    );
  }

  return (
    <main id='main' className='px-4 pb-20 pt-32'>
      <SEO
        title={`${service.title} | Andrew Teece`}
        description={service.summary}
        url={`https://www.andrewteece.com/services/${service.slug}`}
        canonical={`https://www.andrewteece.com/services/${service.slug}`}
      />
      <Section
        title={service.title}
        eyebrow='Service'
        size='readable'
        align='center'
      >
        <p className='text-center text-lg leading-relaxed text-muted'>
          {service.summary}
        </p>
        <p className='text-center text-lg font-semibold'>
          {service.startingAt}
        </p>
        <div className='mx-auto max-w-2xl rounded-2xl border border-[var(--color-border)] p-6'>
          <h2 className='text-xl font-bold'>What&apos;s included</h2>
          <ul className='mt-4 list-inside list-disc space-y-3'>
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className='mt-8 flex flex-wrap justify-center gap-4'>
          {service.slug === 'restaurant-direct-ordering' && (
            <Link className='btn-primary' to='/restaurants'>
              Get a Free Delivery Margin Audit
            </Link>
          )}
          <a className='btn-outline' href={bookingHref}>
            Book a 20-minute call
          </a>
        </div>
        <p className='mt-6 text-center text-sm text-muted'>
          Pricing shown here is a launch placeholder and must be confirmed
          before publishing.
        </p>
      </Section>
    </main>
  );
}
