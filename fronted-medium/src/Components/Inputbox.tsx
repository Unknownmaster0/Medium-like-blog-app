import { ChangeEvent } from "react";

export const InputboxComponent = ({
  label,
  placeholder,
  forInput,
  type,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  forInput: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col justify-center items-start ">
      <label
        htmlFor={forInput}
        className="md:text-lg font-semibold md:font-bold"
      >
        {label}
      </label>
      <input
        type={type}
        name={forInput}
        value={value}
        placeholder={placeholder}
        className="w-52 md:w-72 rounded-md bg-[#f9fafb] px-3 md:h-10 outline outline-1 outline-zinc-300"
        onChange={onChange}
        required
      />
    </div>
  );
};
