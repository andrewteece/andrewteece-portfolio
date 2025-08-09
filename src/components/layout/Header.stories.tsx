import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';
import { within, userEvent, expect } from '@storybook/test';

const meta: Meta<typeof Header> = {
  title: 'Header/Header',
  component: Header,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the menu
    const menuToggle = await canvas.findByRole('button', {
      name: /toggle menu/i,
    });
    await userEvent.click(menuToggle);

    // Assert menu is open by finding the Close button
    const closeBtn = await canvas.findByRole('button', { name: /close menu/i });
    await expect(closeBtn).toBeInTheDocument(); // <-- awaited

    // Close the menu
    await userEvent.click(closeBtn);

    // Menu-closed assertion
    await expect(
      canvas.queryByRole('button', { name: /close menu/i })
    ).toBeNull();

    // Also exercise the theme toggle
    const themeToggle = canvas.getByRole('button', { name: /toggle theme/i });
    await userEvent.click(themeToggle);
  },
};
