import type { Meta, StoryObj } from '@storybook/react-vite';
import ThemeToggle from '../components/layout/ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};
