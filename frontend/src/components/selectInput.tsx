import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import { Icons } from './icons';
import { cn } from '../lib/utils';

type Props = {
  options: { name: string; value: string }[];
  label: string;
  defaultValue?: any;
  name: string;
  onChange: (val: { name: string; value: string }) => void;
  error?: string;
};

const SelectInput = ({
  options,
  label,
  defaultValue,
  name,
  onChange,
  error,
}: Props) => {
  const [selected, setSelected] = useState<{ name: string; value: string }>();
  const Icon = Icons['upDown'];
  const ErrorIcon = Icons['alertCircle'];

  const handleChange = (val: { name: string; value: string }) => {
    onChange(val);
    setSelected(val);
  };
  return (
    <div className="w-full">
      {label ? (
        <p className="text-rose-500 text-sm font-semibold block mb-2">
          {label}
        </p>
      ) : null}
      <Listbox defaultValue={defaultValue} onChange={handleChange} name={name}>
        <div
          className={cn(
            'relative w-full rounded',
            error ? 'border border-red-500' : ''
          )}
        >
          <Listbox.Button className="bg-rose-100 p-4 rounded w-full flex justify-between text-rose-500 capitalize">
            {selected?.name || defaultValue}
            <Icon className="text-rose-300 ml-auto" />
          </Listbox.Button>
          <Listbox.Options className="absolute top-[95%] left-0 w-full z-10 rounded-b overflow-hidden">
            {options?.map((d) => (
              <Listbox.Option
                value={d}
                key={d.value}
                className={
                  'bg-rose-100 p-3 text-rose-500 capitalize hover:bg-rose-200 cursor-pointer focus:border-1 border-black'
                }
              >
                {d.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      {error ? (
        <p className="text-sm font-semibold text-red-500 flex items-center gap-1 mt-1">
          <ErrorIcon size={15} />
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default SelectInput;
