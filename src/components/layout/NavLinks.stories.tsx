import type { Meta, StoryObj } from '@storybook/react-vite';
import NavLinks from './NavLinks';
// import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Header/NavLinks',
  component: NavLinks,
  // decorators: [
  //   (Story) => (
  //     <MemoryRouter initialEntries={['/']}>
  //       <Story />
  //     </MemoryRouter>
  //   ),
  // ],
  args: {
    activeSection: '#home',
  },
  argTypes: {
    activeSection: {
      control: 'select',
      options: ['#home', '#techstack', '#about', '#projects', '#footer'],
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof NavLinks>;

export default meta;
type Story = StoryObj<typeof NavLinks>;

export const Default: Story = {};
export const AboutActive: Story = { args: { activeSection: '#about' } };
