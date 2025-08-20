import React, { useState } from 'react';

export interface InputFieldProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  type?: 'text' | 'password';
  showPasswordToggle?: boolean;
}

const sizeClasses = {
  sm: 'py-1 px-2 text-xs w-24 bg-red-100',
  md: 'py-2 px-3 text-base w-48 bg-yellow-100',
  lg: 'py-3 px-4 text-xl w-80 bg-green-100',
};

const variantClasses = {
  filled: 'border-4 border-blue-500 bg-blue-200',
  outlined: 'border-4 border-pink-500 bg-white',
  ghost: 'border-4 border-black bg-transparent',
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
  clearable = false,
  type = 'text',
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  const inputClass = `rounded transition-colors duration-150 outline-none ${sizeClasses[size]} ${variantClasses[variant]} ${
    invalid ? 'border-red-500 focus:border-red-500' : ''
  } ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`;
  
  const sizeWidthMap: Record<typeof size, string> = {
    sm: '6rem',
    md: '12rem',
    lg: '20rem',
  };
  const inlineStyle: React.CSSProperties = { width: sizeWidthMap[size] };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-medium text-gray-700 dark:text-gray-200 mb-1">{label}</label>
      )}
      <div className="relative flex items-center">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          aria-label={label || placeholder}
          className={inputClass}
          style={inlineStyle}
        />
        {clearable && value && !disabled && (
          <button
            type="button"
            className="absolute right-2 text-gray-400 hover:text-gray-600"
            onClick={() => {
              if (onChange) {
                const event = {
                  target: { value: '' },
                
                  preventDefault: () => {},
                  stopPropagation: () => {},
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
              }
            }}
            tabIndex={-1}
            aria-label="Clear input"
          >
            ×
          </button>
        )}
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            className="absolute right-8 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'hide' : 'see'}
          </button>
        )}
      </div>
      {helperText && !errorMessage && (
        <span className="text-xs text-gray-500 dark:text-gray-400">{helperText}</span>
      )}
      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};
