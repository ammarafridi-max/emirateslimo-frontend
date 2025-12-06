import { NavLink } from 'react-router-dom';
import Container from './Container';
import Currency from './Currency';

export const links = [
  {
    name: 'Airport Transfer',
    href: '/dubai-airport-transfer',
    subpages: [
      { name: 'Dubai Airport Transfer', href: 'dubai-airport-transfer' },
      { name: 'Abu Dhabi Airport Transfer', href: 'abu-dhabi-airport-transfer' },
    ],
  },
  {
    name: 'Chauffeur Service',
    href: '/chauffeur-service',
    // subpages: [
    //   { name: 'Dubai Chauffeur Service', href: 'dubai-chauffeur-transfer' },
    //   { name: 'Abu Dhabi Chauffeur Service', href: 'abu-dhabi-airport-transfer' },
    // ],
  },
  { name: 'City Tours', href: '/city-tours' },
];

function SidebarLink({ name, href, subpages }) {
  return (
    <div className="relative group">
      <NavLink
        to={href}
        className={({ isActive }) =>
          `relative font-light tracking-normal px-3 py-3 text-[16px] transition-colors duration-200 rounded-md
       ${isActive ? 'bg-primary-100' : 'text-black/70 hover:text-black/90'}`
        }
      >
        {name}
      </NavLink>

      {subpages && (
        <div className="absolute w-60 flex flex-col top-9 left-0 bg-white z-100 rounded-lg shadow-[0px_0px_8px_rgba(0,0,0,0.2)] overflow-hidden p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {subpages.map((page, i) => (
            <a key={i} href={page.href} className="px-3 py-2 hover:bg-gray-200 rounded-md text-sm font-light">
              {page.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navigation() {
  return (
    <nav className={`hidden lg:block w-full transition-all duration-500 bg-transparent shadow-lg shadow-gray-200`}>
      <Container>
        <div className="flex items-center justify-between py-6">
          <div className="w-50">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo-light.webp" alt="Emirates Limo" className="w-full object-contain" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            {links.map((link, i) => (
              <SidebarLink key={i} name={link.name} href={link.href} subpages={link.subpages} />
            ))}
            <Currency />
          </div>
        </div>
      </Container>
    </nav>
  );
}
