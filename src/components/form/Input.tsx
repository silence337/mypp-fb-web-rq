import React, { forwardRef } from 'react';
import { type FieldError } from 'react-hook-form';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: FieldError;
  value: string;
  onChange: () => void;
  onBlur: () => void;
}

const Input = forwardRef<HTMLInputElement, Partial<InputProps>>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className='input-box'>
        {/* {label && <label>{label}</label>} */}
        <input ref={ref} {...props} />
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </div>
    );
  }
);

export default Input;
