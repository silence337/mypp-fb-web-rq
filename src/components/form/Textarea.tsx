import React, { forwardRef } from 'react';
import { type FieldError } from 'react-hook-form';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error: FieldError;
  value: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Partial<TextareaProps>>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <textarea className='' ref={ref} {...props} />
        {/* {label && <label>{label}</label>} */}

        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </div>
    );
  }
);

export default Textarea;
