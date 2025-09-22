import { Link } from 'react-router-dom';

export default function accentLink({
  children,
  className,
  size = 'medium',
  ...props
}) {
  let newClassName =
    className +
    ' inline-block text-center text-white no-underline rounded-sm capitalize bg-accent-500 hover:bg-accent-600 border border-solid border-accent-500 cursor-pointer duration-300 rounded-sm disabled:bg-accent-500 disabled:opacity-60 disabled:cursor-auto disabled:hover:bg-accent-500';

  if (size === 'large') {
    newClassName =
      newClassName +
      ` text-[15px] md:text-[18px] font-medium font-outfit py-3 px-5`;
  } else if (size === 'small') {
    newClassName =
      newClassName +
      ` text-[12px] md:text-[14px] font-light font-outfit py-2 px-4`;
  } else {
    newClassName =
      newClassName +
      ` text-[14px] md:text-[16px] font-regular font-outfit py-2.5 px-5`;
  }

  return (
    <Link className={newClassName} {...props}>
      {children}
    </Link>
  );
}
