import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['contained', 'outlined', 'text', 'critical'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: { children: 'Approve deal', variant: 'contained', size: 'md' },
};
export default meta;
type Story = StoryObj<typeof Button>;

// These three match the real "Style" variants on the Button component set in Figma
// (node 1:1989: Contained, Outlined, Text).
export const Contained: Story = {};
export const Outlined: Story = { args: { variant: 'outlined', children: 'Request changes' } };
export const Text: Story = { args: { variant: 'text', children: 'Learn more' } };

// Not yet a documented Figma variant — a product extension for destructive actions.
export const Critical: Story = { args: { variant: 'critical', children: 'Withdraw offer' } };

export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="critical">Critical</Button>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['contained', 'outlined', 'text'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <Button variant={variant}>Default</Button>
          <Button variant={variant} disabled>
            Disabled
          </Button>
          <Button variant={variant} loading>
            Button
          </Button>
        </div>
      ))}
    </div>
  ),
};
