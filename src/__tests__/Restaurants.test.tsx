import { fireEvent, render, screen } from '@testing-library/react';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { describe, expect, it } from 'vitest';
import Restaurants from '../pages/Restaurants';

describe('Restaurants page', () => {
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
});
