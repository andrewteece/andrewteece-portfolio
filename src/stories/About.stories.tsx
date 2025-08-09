import type { Meta, StoryObj } from '@storybook/react-vite';
import About from '../components/sections/About';

const meta: Meta<typeof About> = {
  title: 'Sections/About',
  component: About,
};

export default meta;
type Story = StoryObj<typeof About>;

export const Default: Story = {};
