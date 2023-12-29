import React from "react";

type Props = {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
};

const Button = ({ children, type }: Props) => {
  return (
    <button
      type={type}
      className="rounded-full bg-rose-500 text-white font-bold capitalize px-3 py-3 w-40 block m-auto"
    >
      {children}
    </button>
  );
};

export default Button;
