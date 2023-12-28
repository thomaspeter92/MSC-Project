import React from "react";

type Props = {
  type: string;
  onChange: () => void;
  placeholder: string;
};

const TextInput = ({ type, onChange, placeholder }: Props) => {
  return (
    <input
      type={type}
      onChange={onChange}
      className="py-4 px-3 bg-rose-100 w-full rounded placeholder:text-rose-400"
      placeholder={placeholder}
    />
  );
};

export default TextInput;
