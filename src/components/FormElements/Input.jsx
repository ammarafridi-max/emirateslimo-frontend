import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { className = '', label = 'Label', optional, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-light text-[14px]">
        {label}{' '}
        {optional ? <span className="text-primary-400">(optional)</span> : ''}
      </label>
      <input
        ref={ref}
        className={`w-full bg-transparent text-[14px] font-light px-3 md:px-3 py-2 rounded-md border border-gray-300 focus:border-primary-900 outline-0 ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
