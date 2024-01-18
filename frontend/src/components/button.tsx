import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Icons } from './icons';

const buttonStyles = cva(
  'font-medium capitalize block rounded-lg flex items-center justify-center gap-2',
  {
    variants: {
      intent: {
        primary: 'bg-rose-500 text-white',
        gray: 'bg-gray-200 text-gray-500',
        text: 'text-rose-400 p-0',
        dager: 'bg-red-500 text-white',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-3 py-2',
        lg: 'px-3 py-3',
      },
      rounded: {
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
);

type Props = {
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button' | undefined;
  icon?: keyof typeof Icons;
  onClick?: () => void;
  className?: string;
};

const Button = ({
  children,
  type,
  intent,
  size,
  rounded,
  icon,
  className,
  onClick,
}: Props & VariantProps<typeof buttonStyles>) => {
  const Icon = Icons[icon as keyof typeof Icons];

  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(buttonStyles({ intent, size, rounded }), className)}
    >
      {icon ? <Icon size={20} /> : null}
      {children}
    </button>
  );
};

export default Button;
