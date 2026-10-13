import { useMemo, useState, type FormEvent } from 'react';
import SEO from '../components/shared/SEO';
import { Section } from '../components/shared/Section';
import { trackMarketingEvent } from '../lib/analytics';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function Restaurants() {
  const [monthlySales, setMonthlySales] = useState('10000');
  const [commissionRate, setCommissionRate] = useState('25');
  const annualCommissions = useMemo(
    () =>
      Math.max(0, Number(monthlySales) || 0) *
      (Number(commissionRate) / 100) *
      12,
    [commissionRate, monthlySales]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValue = (name: string) => {
      const value = formData.get(name);
      return typeof value === 'string' ? value.trim() : '';
    };
    const restaurant = fieldValue('restaurant');
    const city = fieldValue('city');
    const sales = fieldValue('monthly-sales');
    const subject = encodeURIComponent('Free Delivery Margin Audit request');
    const body = encodeURIComponent(
      `Restaurant: ${restaurant}\nCity: ${city}\nApproximate monthly delivery sales: ${sales}`
    );

    trackMarketingEvent('generate_lead', {
      lead_type: 'delivery_margin_audit',
    });
    window.location.href = `mailto:andrew@andrewteece.com?subject=${subject}&body=${body}`;
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
              I spent 21 years running a multi-brand restaurant group. Our own
              online ordering system drove 40% of sales. I now bring that
              operator experience together with 20+ years building for the web.
            </p>
            <p className='mt-4 text-sm text-muted'>
              More detailed order volume, average ticket, and commission-saved
              figures are not included until they can be verified and approved
              for sharing.
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
            Setup: [confirm price] · Monthly: [confirm price]
          </p>
          <p className='mt-2 text-center text-sm text-muted'>
            Pricing placeholders must be confirmed before publishing.
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
            Share a few details to start an email request. Your email app will
            open with the information filled in for you to review and send.
          </p>
          <form onSubmit={handleSubmit} className='mt-6 grid gap-4'>
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
            <button type='submit' className='btn-primary justify-self-center'>
              Request my free audit
            </button>
          </form>
          <p className='mt-3 text-center text-xs text-muted'>
            This form opens your email app; no details are sent until you press
            Send. The GA4 lead event records the request action, not an
            independently verified email delivery.
          </p>
        </section>
      </Section>
    </main>
  );
}
