import type { Meta, StoryObj } from '@storybook/react-vite';
import TechStack from '../components/sections/TechStack';

const meta: Meta<typeof TechStack> = {
  title: 'Sections/TechStack',
  component: TechStack,
};
export default meta;

type Story = StoryObj<typeof TechStack>;

export const Default: Story = {};
