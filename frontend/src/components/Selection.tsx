import React, {forwardRef} from "react";

interface InputProps {
    label: string;
    id: string;
    placeholder?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    options : {key :string, value : string}[];
}

const Selection = forwardRef<HTMLSelectElement, InputProps>(
    ({label, id, value, onChange, options}, ref) => {
        return (
            <div className="mb-3">
                <label
                    htmlFor={id}
                    className="block mb-1 text-sm font-medium text-white dark:text-white"
                >
                    {label}
                </label>
                <select
                    id={id}
                    ref={ref}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={value}
                    onChange={onChange}
                    required
                >
                    {
                        options.map(option => (
                            <option key={option.key} value={option.key}>{option.value}</option>
                        ))
                    }

                </select>
            </div>
        );
    }
);

export default Selection;
