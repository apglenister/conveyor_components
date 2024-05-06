import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Alert, AlertProps, Alerts, useAlerts } from '@/Alerts';

const meta = {
  title: 'Commons/Alerts',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    alertId: '',
    content: 'This is an Alert!',
    expires: 2000,
    className: undefined,
  },
  // TODO: make className of type options: undefined, success, warning, danger
  argTypes: {
    alertId: { table: { disable: true } },
    className: { table: { disable: false }, control: 'text' },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (props) => {
    return (
      <div className="overflow-hidden relative w-96 h-96 box-border border-[--border-color] border-2">
        <Alerts>
          <AddAlertButton {...props} />
        </Alerts>
      </div>
    );
  },
};

export const CustomizingAlert: Story = {
  render: (props) => {
    return (
      <div>
        <Alerts AlertComponent={CustomAlert}>
          <AddAlertButton {...props} />
        </Alerts>
      </div>
    );
  },
};

const AddAlertButton = (props: AlertProps) => {
  const { addAlert } = useAlerts();
  const [counter, setCounter] = useState(0);
  return (
    <button
      onClick={() => {
        addAlert({
          ...props,
          content: `${props.content} ${counter}`,
          className: props.className,
        });
        setCounter(counter + 1);
      }}
    >
      Add Alert
    </button>
  );
};

const CustomAlert = (props: AlertProps) => {
  return (
    <div>
      <p>This is customized</p>
      <Alert {...props} />
    </div>
  );
};
