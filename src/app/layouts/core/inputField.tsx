import React, { useState, ChangeEvent } from 'react';

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string | null;
  required?: boolean;
  checkIsvalid: (value: string) => string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  required = false,
 
  checkIsvalid,
  onChange,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(e);

    if (checkIsvalid && value) {
      const validationError = checkIsvalid(value);
      setError(validationError);
    } else {
      setError(null);
    }
  };
  return (
    <div className="mb-2">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={name}
        required={required}
        className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
        placeholder={placeholder}
        value={value+''}
        onChange={handleChange}
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
