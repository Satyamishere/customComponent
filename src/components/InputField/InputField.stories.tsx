import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';
import type { InputFieldProps } from './InputField';
import { useState } from 'react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InputField>;

const ControlledInput = (args: InputFieldProps) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <InputField {...args} value={value} onChange={e => setValue(e.target.value)} />
  );
};

export const Default: Story = {
  render: ControlledInput,
  args: {
    value: '',
    label: 'Name',
    placeholder: 'Enter your name',
    helperText: 'This is a helper text',
    variant: 'outlined',
    size: 'md',
  },
};

export const Error: Story = {
  render: ControlledInput,
  args: {
    value: '',
    label: 'Email',
    placeholder: 'Enter your email',
    errorMessage: 'Invalid email address',
    invalid: true,
    variant: 'filled',
    size: 'md',
  },
};

export const Disabled: Story = {
  render: ControlledInput,
  args: {
    value: '',
    label: 'Username',
    placeholder: 'Enter your username',
    disabled: true,
    variant: 'ghost',
    size: 'md',
  },
};

export const Password: Story = {
  render: ControlledInput,
  args: {
    value: '',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    showPasswordToggle: true,
    variant: 'outlined',
    size: 'md',
  },
};

export const Clearable: Story = {
  render: ControlledInput,
  args: {
    value: 'Clear me',
    label: 'Clearable',
    clearable: true,
    variant: 'outlined',
    size: 'md',
  },
};
