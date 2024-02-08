import { cva } from 'class-variance-authority';
import { Icons } from './icons';
import { cn } from '../lib/utils';

type Props = {
  onChange: (event: React.ChangeEvent) => void;
  placeholder?: string;
  icon?: keyof typeof Icons;
  error?: string | undefined;
  value: string;
  name: string;
  label?: string;
};

const TextArea = ({
  onChange,
  placeholder,
  icon,
  error,
  value,
  name,
  label,
}: Props) => {
  const Icon = Icons[icon as keyof typeof Icons];
  const ErrorIcon = Icons['alertCircle'];
  return (
    <div className="w-full">
      {label ? (
        <label className="text-rose-400 text-sm font-semibold block mb-1">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {icon ? (
          <Icon
            size={20}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-rose-400"
          />
        ) : null}
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className={cn(
            'bg-rose-100 py-3 px-3 w-full resize-none focus:outline-rose-500',
            icon ? 'pl-9' : '',
            error ? 'border border-red-500 bg-red-100' : ''
          )}
          placeholder={placeholder}
        />
      </div>
      {error ? (
        <p className="text-sm font-semibold text-red-500 flex items-center gap-1 mt-1">
          <ErrorIcon size={15} />
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default TextArea;
