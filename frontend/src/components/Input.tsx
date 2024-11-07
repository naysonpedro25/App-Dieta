import React, { forwardRef } from "react";

interface InputProps {
  label: string;
  id: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, type = "text", placeholder, value, onChange }, ref) => {
    return (
      <div className="mb-3">
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          ref={ref}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    );
  }
);

export default Input;
