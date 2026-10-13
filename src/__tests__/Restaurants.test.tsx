import { fireEvent, render, screen } from '@testing-library/react';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Restaurants from '../pages/Restaurants';

describe('Restaurants page', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete window.gtag;
  });

  it('estimates annual commissions from monthly sales and the selected rate', () => {
    render(
      <HelmetProvider>
        <Restaurants />
      </HelmetProvider>
    );

    expect(screen.getByText('$30,000')).toBeInTheDocument();

    fireEvent.change(
      screen.getByLabelText('Monthly delivery sales in dollars'),
      { target: { value: '15000' } }
    );
    fireEvent.change(screen.getByLabelText('Estimated commission rate'), {
      target: { value: '20' },
    });

    expect(screen.getByText('$36,000')).toBeInTheDocument();
  });

  it('asks for restaurant, city, and monthly sales for the audit request', () => {
    render(
      <HelmetProvider>
        <Restaurants />
      </HelmetProvider>
    );

    expect(screen.getByLabelText('Restaurant name')).toBeRequired();
    expect(screen.getByLabelText('City')).toBeRequired();
    expect(
      screen.getByLabelText('Approximate monthly delivery sales', {
        selector: 'input',
      })
    ).toBeRequired();
  });

  it('sends the audit form and tracks a lead only after Formspree accepts it', async () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    render(
      <HelmetProvider>
        <Restaurants />
      </HelmetProvider>
    );

    fireEvent.change(screen.getByLabelText('Restaurant name'), {
      target: { value: 'Test Bistro' },
    });
    fireEvent.change(screen.getByLabelText('City'), {
      target: { value: 'Naples' },
    });
    fireEvent.change(
      screen.getByLabelText('Approximate monthly delivery sales', {
        selector: 'input',
      }),
      { target: { value: '$10,000' } }
    );
    fireEvent.submit(screen.getByRole('button', { name: 'Request my free audit' }).closest('form')!);

    expect(
      await screen.findByText(
        'Thanks — your Delivery Margin Audit request has been sent.'
      )
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://formspree.io/f/xqpeydjk',
      expect.objectContaining({ method: 'POST' })
    );
    expect(gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      lead_type: 'delivery_margin_audit',
    });
  });

  it('does not track a lead when the form service rejects a request', async () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    render(
      <HelmetProvider>
        <Restaurants />
      </HelmetProvider>
    );

    fireEvent.change(screen.getByLabelText('Restaurant name'), {
      target: { value: 'Test Bistro' },
    });
    fireEvent.change(screen.getByLabelText('City'), {
      target: { value: 'Naples' },
    });
    fireEvent.change(
      screen.getByLabelText('Approximate monthly delivery sales', {
        selector: 'input',
      }),
      { target: { value: '$10,000' } }
    );
    fireEvent.submit(screen.getByRole('button', { name: 'Request my free audit' }).closest('form')!);

    expect(
      await screen.findByText(
        'We could not send your request right now. Please try again or email andrew@andrewteece.com.'
      )
    ).toBeInTheDocument();
    expect(gtag).not.toHaveBeenCalled();
  });
});
