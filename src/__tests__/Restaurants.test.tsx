import { fireEvent, render, screen } from '@testing-library/react';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Restaurants from '../pages/Restaurants';

type AuditFetch = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;

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

  it('asks for contact and restaurant details for the audit request', () => {
    const { container } = render(
      <HelmetProvider>
        <Restaurants />
      </HelmetProvider>
    );

    expect(screen.getByLabelText('Your name')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Phone (optional)')).not.toBeRequired();
    expect(screen.getByLabelText('Restaurant name')).toBeRequired();
    expect(screen.getByLabelText('City')).toBeRequired();
    expect(container.querySelector('input[name="_gotcha"]')).toHaveAttribute(
      'tabindex',
      '-1'
    );
    expect(
      screen.getByLabelText('Approximate monthly delivery sales', {
        selector: 'input',
      })
    ).toBeRequired();
    expect(
      screen.getByText(
        "Your details are only used to prepare your audit. I'll reply within one business day."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Keep it\. You don't need to switch systems\. I work with Toast, Square, Clover, SpotOn, Heartland, and most other systems/
      )
    ).toBeInTheDocument();
  });

  it('sends the audit form and tracks a lead only after Formspree accepts it', async () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    let submittedForm: FormData | undefined;
    const fetchMock = vi.fn<AuditFetch>((_input, init) => {
      if (init?.body instanceof FormData) {
        submittedForm = init.body;
      }
      return Promise.resolve(new Response(null, { status: 200 }));
    });
    vi.stubGlobal('fetch', fetchMock);
    render(
      <HelmetProvider>
        <Restaurants />
      </HelmetProvider>
    );

    fireEvent.change(screen.getByLabelText('Restaurant name'), {
      target: { value: 'Test Bistro' },
    });
    fireEvent.change(screen.getByLabelText('Your name'), {
      target: { value: 'Alex Example' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'alex@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Phone (optional)'), {
      target: { value: '555-0100' },
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
    fireEvent.submit(
      screen.getByRole('button', { name: 'Request my free audit' }).closest('form')!
    );

    expect(
      await screen.findByText(
        'Thanks — your Delivery Margin Audit request has been sent.'
      )
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://formspree.io/f/xqpeydjk',
      expect.objectContaining({
        method: 'POST',
      })
    );
    if (!submittedForm) {
      throw new Error('Expected audit request to include FormData');
    }
    expect(submittedForm.get('_subject')).toBe(
      'New Delivery Margin Audit request'
    );
    expect(submittedForm.get('_gotcha')).toBe('');
    expect(submittedForm.get('name')).toBe('Alex Example');
    expect(submittedForm.get('email')).toBe('alex@example.com');
    expect(submittedForm.get('phone')).toBe('555-0100');
    expect(gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      lead_type: 'delivery_margin_audit',
    });
  });

  it('does not track a lead when the form service rejects a request', async () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    vi.stubGlobal(
      'fetch',
      vi
        .fn<AuditFetch>()
        .mockResolvedValue(new Response(null, { status: 400 }))
    );
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
