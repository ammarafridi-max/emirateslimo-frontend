import { Link } from 'react-router-dom';

export default function PrimaryLink({
  children,
  className = '',
  disabled = false,
  to,
  size = 'medium',
  onClick,
  ...props
}) {
  let newClassName =
    className +
    ` inline-block text-center text-white no-underline rounded-lg capitalize duration-300 ${disabled ? 'bg-accent-500/50 cursor-auto' : 'bg-accent-500 hover:bg-accent-600 border border-solid border-accent-500 cursor-pointer'}`;

  if (size === 'large') {
    newClassName +=
      ' text-[15px] lg:text-[18px] font-medium font-outfit py-3 px-5';
  } else if (size === 'small') {
    newClassName +=
      ' text-[12px] lg:text-[14px] font-light font-outfit py-2 px-4';
  } else {
    newClassName +=
      ' text-[14px] lg:text-[16px] font-regular font-outfit py-2.5 px-5';
  }

  if (disabled) {
    return (
      <span className={newClassName} aria-disabled="true" {...props}>
        {children}
      </span>
    );
  }

  return (
    <Link className={newClassName} to={to} {...props}>
      {children}
    </Link>
  );
}
