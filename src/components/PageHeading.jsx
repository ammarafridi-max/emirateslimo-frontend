export default function PageHeading({ children, className }) {
  return <h1 className={`font-medium ${className}`}>{children}</h1>;
}
