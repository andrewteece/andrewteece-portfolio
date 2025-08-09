import type { Meta, StoryObj } from '@storybook/react-vite';
import HeroCta from '../components/sections/HeroCta';

const meta: Meta<typeof HeroCta> = {
  title: 'Sections/HeroCTA',
  component: HeroCta,
};
export default meta;

type Story = StoryObj<typeof HeroCta>;

export const Default: Story = {};
