import type { Meta, StoryObj } from '@storybook/react-vite';
import App from '../App';

const meta: Meta<typeof App> = {
  title: 'App',
  component: App,
};
export default meta;

type Story = StoryObj<typeof App>;

export const Default: Story = {};
