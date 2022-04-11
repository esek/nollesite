import React from 'react';
import { FiCheck } from 'react-icons/fi';

type Props = {
  value: boolean;
  onChange: (b: boolean) => void;
  label?: string;
  name: string;
};

const Cbx: React.FC<Props> = ({ value, onChange, label, name }) => {
  const n = `cbx-${name}`;
  const toggle = () => {
    onChange(!value);
  };
  return (
    <>
      <input
        type="checkbox"
        className="hidden"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        id={n}
      />
      <div className="flex items-center gap-2">
        <button onClick={toggle}>
          <div
            className={`grid aspect-square h-6 place-items-center border border-accent ${
              value ? 'bg-accent' : ''
            }`}
          >
            {value && <FiCheck size="1.25em" />}
          </div>
        </button>
        {label && <label htmlFor={n}>{label}</label>}
      </div>
    </>
  );
};

export default Cbx;
