import { useMemo, useState, type FormEvent } from 'react';
import SEO from '../components/shared/SEO';
import { Section } from '../components/shared/Section';
import { trackMarketingEvent } from '../lib/analytics';
import { auditFormEndpoint } from '../content/services';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function Restaurants() {
  const [monthlySales, setMonthlySales] = useState('10000');
  const [commissionRate, setCommissionRate] = useState('25');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const annualCommissions = useMemo(
    () =>
      Math.max(0, Number(monthlySales) || 0) *
      (Number(commissionRate) / 100) *
      12,
    [commissionRate, monthlySales]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setSubmissionMessage('');

    try {
      const response = await fetch(auditFormEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        setSubmissionMessage(
          'We could not send your request right now. Please try again or email andrew@andrewteece.com.'
        );
        return;
      }

      trackMarketingEvent('generate_lead', {
        lead_type: 'delivery_margin_audit',
      });
      form.reset();
      setSubmissionMessage(
        'Thanks — your Delivery Margin Audit request has been sent.'
      );
    } catch {
      setSubmissionMessage(
        'We could not send your request right now. Check your connection and try again, or email andrew@andrewteece.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main id='main' className='px-4 pb-20 pt-32'>
      <SEO
        title='Restaurant Online Ordering & Delivery Margin Audit | Andrew Teece'
        description='Explore direct online ordering and estimate marketplace commissions with a free delivery margin audit from a former restaurant owner.'
        url='https://www.andrewteece.com/restaurants'
        canonical='https://www.andrewteece.com/restaurants'
      />
      <Section
        title='Keep more of what your restaurant earns'
        eyebrow='Restaurant direct ordering & growth'
        size='wide'
        align='center'
      >
        <p className='mx-auto max-w-3xl text-center text-xl leading-relaxed text-muted'>
          Stop paying 15–30% to DoorDash on your regulars. Build a direct
          ordering relationship with a plan grounded in real restaurant
          operations.
        </p>

        <div className='mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-2'>
          <section
            aria-labelledby='commission-calculator-title'
            className='rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/70 p-6 shadow-sm'
          >
            <h2
              id='commission-calculator-title'
              className='text-2xl font-bold text-[var(--color-brand)]'
            >
              Estimate your annual marketplace commissions
            </h2>
            <p className='mt-2 text-muted'>
              Enter your monthly delivery sales and an estimated commission
              rate. This is an estimate, not a statement of your actual fees.
            </p>
            <div className='mt-6 grid gap-4 sm:grid-cols-2'>
              <label className='grid gap-2 font-medium'>
                Monthly delivery sales
                <input
                  className='rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2'
                  type='number'
                  inputMode='decimal'
                  min='0'
                  step='100'
                  value={monthlySales}
                  onChange={(event) => setMonthlySales(event.target.value)}
                  aria-label='Monthly delivery sales in dollars'
                />
              </label>
              <label className='grid gap-2 font-medium'>
                Estimated commission rate
                <select
                  className='rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2'
                  value={commissionRate}
                  onChange={(event) => setCommissionRate(event.target.value)}
                  aria-label='Estimated commission rate'
                >
                  {[15, 20, 25, 30].map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}%
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className='mt-6 rounded-xl bg-[var(--color-brand)]/10 p-4 text-lg'>
              Estimated annual commissions:{' '}
              <strong className='text-2xl text-[var(--color-brand)]'>
                {currency.format(annualCommissions)}
              </strong>
            </p>
          </section>

          <section className='rounded-2xl border border-[var(--color-border)] p-6'>
            <h2 className='text-2xl font-bold text-[var(--color-brand)]'>
              Built with an operator&apos;s perspective
            </h2>
            <p className='mt-4 leading-relaxed'>
              I spent 21 years running a multi-brand restaurant group. We
              implemented Heartland POS online ordering, and direct orders
              grew to 40% of sales. I now bring that operator experience
              together with 20+ years building for the web.
            </p>
          </section>
        </div>

        <section className='mx-auto mt-12 max-w-5xl'>
          <h2 className='text-center text-2xl font-bold'>What the offer covers</h2>
          <div className='mt-6 grid gap-4 sm:grid-cols-2'>
            {[
              'Review your current delivery mix and estimated fees',
              'Identify opportunities to encourage direct repeat orders',
              'Plan a website and ordering experience around your operations',
              'Coordinate recommendations with your existing POS and vendors',
            ].map((item) => (
              <p
                key={item}
                className='rounded-xl border border-[var(--color-border)] p-4'
              >
                {item}
              </p>
            ))}
          </div>
          <p className='mt-6 text-center font-semibold'>
            Setup from $3,500 · Monthly plans from $400
          </p>
          <p className='mt-2 text-center text-sm text-muted'>
            Final pricing depends on your POS, menu size, and locations. The
            audit is free.
          </p>
        </section>

        <section className='mx-auto mt-12 max-w-3xl'>
          <h2 className='text-center text-2xl font-bold'>Frequently asked questions</h2>
          <div className='mt-5 space-y-5'>
            <div>
              <h3 className='font-bold'>Do I have to leave DoorDash?</h3>
              <p className='mt-1 text-muted'>
                No. The goal is to understand where direct ordering fits
                alongside your existing delivery channels, not to assume you
                should remove a channel your guests use.
              </p>
            </div>
            <div>
              <h3 className='font-bold'>What about my POS?</h3>
              <p className='mt-1 text-muted'>
                The audit starts with your current POS and ordering setup.
                Compatibility and integration options depend on your specific
                systems and are confirmed before any implementation.
              </p>
            </div>
          </div>
        </section>

        <section
          id='audit-request'
          className='mx-auto mt-12 max-w-2xl rounded-2xl border border-[var(--color-border)] p-6'
        >
          <h2 className='text-center text-2xl font-bold'>
            Get a free Delivery Margin Audit
          </h2>
          <p className='mt-2 text-center text-muted'>
            Share a few details and I&apos;ll follow up about your restaurant&apos;s
            delivery margins.
          </p>
          <form
            action={auditFormEndpoint}
            method='POST'
            onSubmit={(event) => void handleSubmit(event)}
            className='mt-6 grid gap-4'
          >
            <label className='grid gap-2 font-medium'>
              Restaurant name
              <input
                className='rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2'
                name='restaurant'
                autoComplete='organization'
                required
              />
            </label>
            <label className='grid gap-2 font-medium'>
              City
              <input
                className='rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2'
                name='city'
                autoComplete='address-level2'
                required
              />
            </label>
            <label className='grid gap-2 font-medium'>
              Approximate monthly delivery sales
              <input
                className='rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2'
                name='monthly-sales'
                inputMode='decimal'
                placeholder='For example, $10,000'
                required
              />
            </label>
            <button
              type='submit'
              className='btn-primary justify-self-center'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending request…' : 'Request my free audit'}
            </button>
            <p role='status' aria-live='polite' className='text-center text-sm'>
              {submissionMessage}
            </p>
          </form>
          <p className='mt-3 text-center text-xs text-muted'>
            Your details are sent securely through Formspree. A GA4 lead event
            is recorded only after Formspree accepts the request.
          </p>
        </section>
      </Section>
    </main>
  );
}
