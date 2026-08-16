import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Molecules/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { status: { control: 'select', options: ['diligence', 'closed', 'at-risk', 'neutral'] } },
  args: { status: 'diligence' },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Diligence: Story = {};
export const Closed: Story = { args: { status: 'closed' } };
export const AtRisk: Story = { args: { status: 'at-risk' } };
export const Neutral: Story = { args: { status: 'neutral' } };

export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge status="diligence" />
      <Badge status="closed" />
      <Badge status="at-risk" />
      <Badge status="neutral" />
    </div>
  ),
};
