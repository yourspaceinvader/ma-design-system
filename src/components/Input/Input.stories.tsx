import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Molecules/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { label: 'Deal name', placeholder: 'Project Falcon', helperText: 'Internal codename, not shown to counterparty' },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Error: Story = { args: { error: true, helperText: 'Deal name is required', label: 'Deal name' } };
