import { forwardRef } from "react";
interface InputProps {
  hint: string;
  id?: string;
  name?: string;
}

const Input =  forwardRef<HTMLInputElement, InputProps>(
  ({ hint, id, name }, ref) => {
    return (
      <input
        type="text"
        name={name}

        id={id}
        ref={ref}
        placeholder={hint}
        className="w-full h-10 rounded px-4"
      />
    );
  }
);

export default Input;