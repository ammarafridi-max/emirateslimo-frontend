export default function Label({ children, className, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className={`font-light text-[14px] ${className}`}>
      {children}
    </label>
  );
}
