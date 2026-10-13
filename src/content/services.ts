export interface ServiceOffer {
  slug: string;
  title: string;
  summary: string;
  startingAt: string;
  includes: string[];
}

export const services: ServiceOffer[] = [
  {
    slug: 'restaurant-direct-ordering',
    title: 'Restaurant Direct Ordering & Growth',
    summary:
      'A practical direct-ordering and growth plan designed around your restaurant, guests, and existing operations.',
    startingAt: 'Starting at: [confirm price]',
    includes: [
      'Delivery margin and ordering-channel review',
      'Direct-ordering website strategy',
      'Guest retention and repeat-order recommendations',
      'Implementation plan for your existing POS and delivery mix',
    ],
  },
  {
    slug: 'fractional-marketing-director',
    title: 'Fractional Marketing Director, Hospitality',
    summary:
      'Experienced marketing leadership for hospitality businesses that need a clear plan and consistent execution.',
    startingAt: 'Starting at: [confirm price]',
    includes: [
      'Marketing priorities and a measurable plan',
      'Campaign planning tied to business goals',
      'Coordination with your team and outside partners',
      'Regular review of results and next steps',
    ],
  },
  {
    slug: 'monthly-local-marketing',
    title: 'Monthly Local Marketing',
    summary:
      'Ongoing support for the local channels that help guests discover, trust, and return to your business.',
    startingAt: 'Starting at: [confirm price]',
    includes: [
      'Social content planning',
      'Google Business Profile updates',
      'Review response and reputation workflows',
      'Email marketing and photography planning',
    ],
  },
  {
    slug: 'website-audits-and-builds',
    title: 'Website Audits & Builds',
    summary:
      'Clear recommendations and fast, accessible websites built around your customers and business goals.',
    startingAt: 'Starting at: [confirm price]',
    includes: [
      'Website, accessibility, and performance audit',
      'Conversion-focused design and implementation',
      'Modern React and Next.js development',
      'Agency subcontracting for senior Next.js and headless WordPress work',
    ],
  },
];

export const bookingHref =
  'mailto:andrew@andrewteece.com?subject=Book%20a%2020-minute%20call';
