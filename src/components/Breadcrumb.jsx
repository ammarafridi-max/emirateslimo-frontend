import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ paths = [] }) {
  return (
    <div className="hidden lg:flex items-center gap-2 text-[13px] lg:text-[14.5px] font-light text-primary-500 mb-4 lg:mb-6">
      {paths.map((path, index) => (
        <div key={index} className="flex items-center">
          {index !== 0 && <ChevronRight size={15} className="text-primary-300" />}
          {index === paths.length - 1 ? (
            <span className="text-primary-900 font-normal">{path.label}</span>
          ) : (
            <Link to={path.href} className="text-primary-400 hover:text-accent-500 transition-colors duration-200">
              {path.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
