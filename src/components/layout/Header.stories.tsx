import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import { within, userEvent, expect, waitFor } from '@storybook/test';

const meta: Meta<typeof Header> = {
  title: 'Header/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const MobileMenuFlow: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [320] },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open menu
    const menuToggle = await canvas.findByRole('button', {
      name: /toggle menu/i,
    });
    await userEvent.click(menuToggle);

    // Verify Close button is visible
    const closeBtn = await canvas.findByRole('button', { name: /close menu/i });
    await expect(closeBtn).toBeInTheDocument();

    // Close the menu
    await userEvent.click(closeBtn);

    // Wait until the close button is removed from DOM
    await waitFor(async () => {
      await expect(
        canvas.queryByRole('button', { name: /close menu/i })
      ).toBeNull();
    });

    // Toggle theme as extra interaction
    const themeToggle = await canvas.findByRole('button', {
      name: /toggle theme/i,
    });
    await userEvent.click(themeToggle);
  },
};
