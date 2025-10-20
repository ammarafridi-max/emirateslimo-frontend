export default function SectionTitle({
  textAlign = 'left',
  children,
  subtitle,
  className = '',
  type = 'primary', // primary = light bg sections, secondary = dark bg sections
}) {
  const isCenter = textAlign === 'center';

  // Subtitle (small label above title)
  let pClassName = `
    w-fit 
    text-[11px] md:text-[13px] 
    tracking-widest 
    font-medium font-outfit 
    uppercase 
    py-1.5 px-4 
    rounded-md 
    mb-2 md:mb-1
    ${isCenter ? 'mx-auto text-center' : 'text-left'}
  `;

  // Main title
  let h2ClassName = `
    text-[28px] md:text-[32px] 
    font-light font-outfit 
    leading-snug 
    capitalize 
    ${isCenter ? 'text-center' : 'text-left'}
  `;

  // Theming for primary / secondary sections
  if (type === 'secondary') {
    pClassName += ' bg-accent-500/30 text-accent-400';
    h2ClassName += ' text-white';
  } else {
    pClassName += ' bg-accent-500/10 text-accent-600';
    h2ClassName += ' text-primary-900';
  }

  return (
    <div className={`mb-10 md:mb-10 ${className}`}>
      {subtitle && <p className={pClassName}>{subtitle}</p>}
      <h2 className={h2ClassName}>{children}</h2>

      {/* Accent underline */}
      <div
        className={`mt-4 flex ${isCenter ? 'justify-center' : 'justify-start'}`}
      >
        <span className="inline-block h-[2px] w-16 bg-accent-500 rounded-full"></span>
      </div>
    </div>
  );
}
