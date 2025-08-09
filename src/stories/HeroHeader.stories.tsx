import type { Meta, StoryObj } from '@storybook/react-vite';
import HeroHeader from '../components/sections/HeroHeader';

const meta: Meta<typeof HeroHeader> = {
  title: 'Sections/HeroHeader',
  component: HeroHeader,
};
export default meta;

type Story = StoryObj<typeof HeroHeader>;

export const Default: Story = {};
