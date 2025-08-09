// src/components/Sections/About.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import About from './About';

const meta: Meta<typeof About> = {
  title: 'Sections/About',
  component: About,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof About>;
export const Default: Story = {};
