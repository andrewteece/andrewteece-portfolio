import type { Meta, StoryObj } from '@storybook/react-vite';
import ThemeToggle, { ThemeToggleProps } from './ThemeToggle';
import { within, userEvent } from '@storybook/test';
import { expect, fn } from '@storybook/test';

const meta: Meta<ThemeToggleProps> = {
  title: 'Header/ThemeToggle',
  component: ThemeToggle,
  args: {
    isDark: false,
    toggle: () => {},
  },
  argTypes: {
    isDark: { control: 'boolean' },
    toggle: { action: 'toggled' },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<ThemeToggleProps>;

export const Light: Story = {
  args: { isDark: false, toggle: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: /toggle theme/i })
    );
    await expect(args.toggle).toHaveBeenCalledTimes(1); // ✅
  },
};

export const Dark: Story = {
  args: { isDark: true },
};
