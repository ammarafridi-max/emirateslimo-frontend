export default function PrimaryButtonOutline({
  children,
  className = '',
  size = 'medium',
  selected = false,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center text-center font-outfit font-medium rounded-lg capitalize border border-solid cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-400 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses =
    size === 'large'
      ? 'text-[15px] lg:text-[18px] py-3 px-6'
      : size === 'small'
        ? 'text-[13px] lg:text-[14px] py-2 px-4'
        : 'text-[14px] lg:text-[15px] py-2.5 px-5';

  const colorClasses = selected
    ? 'bg-accent-500 text-white border-accent-500 hover:cursor-default'
    : 'bg-transparent text-accent-500 border-accent-500 hover:bg-accent-600 hover:text-white hover:border-accent-600 active:scale-[0.98]';

  return (
    <button className={`${base} ${sizeClasses} ${colorClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
