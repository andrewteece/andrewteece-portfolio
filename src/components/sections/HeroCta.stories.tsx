// src/components/Hero/HeroCTA.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import HeroCTA from './HeroCta';

const meta: Meta<typeof HeroCTA> = {
  title: 'Sections/HeroCTA',
  component: HeroCTA,
};
export default meta;

type Story = StoryObj<typeof HeroCTA>;
export const Default: Story = {};
