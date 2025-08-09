// src/components/Sections/TechBadges.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import TechBadges from './TechBadges';

const meta: Meta<typeof TechBadges> = {
  title: 'Sections/TechBadges',
  component: TechBadges,
};
export default meta;

type Story = StoryObj<typeof TechBadges>;
export const Default: Story = {};
