import React from 'react';

type Props = {
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  label?: string;
  placeholder?: string;
  type?: string;
  helper?: string;
};

const Input: React.FC<Props> = ({ label, type, helper, ...inputProps }) => {
  const n = `input--${inputProps.name}`;

  const className =
    'border-2 border-accent bg-secondary/10 p-4 outline-none focus:bg-secondary/10';

  return (
    <div className="input-container relative flex flex-col gap-2" id={n}>
      {label && (
        <label className="input-label font-medium" htmlFor={n}>
          {label}
        </label>
      )}
      {type === 'multiline' ? (
        <textarea {...inputProps} rows={6} className={className} id={n} />
      ) : (
        <input {...inputProps} type={type} className={className} id={n} />
      )}
      {helper && <p className="text-sm italic">{helper}</p>}
    </div>
  );
};

export default Input;
