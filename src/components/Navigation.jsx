import { NavLink, useLocation } from 'react-router-dom';
import Container from './Container';

export const links = [
  {
    name: 'Airport Transfer',
    href: '/dubai-airport-transfer',
  },
  {
    name: 'Chauffeur Service',
    href: '/chauffeur-service',
  },
  {
    name: 'City Tours',
    href: '/city-tours',
  },
];

function SidebarLink({ name, href, Icon, accessTo, action }) {
  const { pathname } = useLocation();
  const isActive = href && pathname.startsWith(href);

  return (
    <NavLink
      to={href}
      className={`font-light text-[16px] py-2 px-3 mb-1.25 rounded-sm duration-150 hover:text-primary-900 ${
        isActive ? 'text-black' : 'text-primary-400'
      }`}
    >
      {name}
    </NavLink>
  );
}

export default function Navigation() {
  return (
    <nav className="shadow-md shadow-primary-200">
      <Container>
        <div className="hidden lg:flex items-center justify-between gap-10 py-7">
          <div>
            <img src="/logo-light.png" className="w-45 object-contain" />
          </div>
          <div>
            {links.map((link, i) => (
              <SidebarLink
                key={i}
                name={link.name}
                href={link.href}
                Icon={link.icon}
                accessTo={link.accessTo}
                action={link.action}
              />
            ))}
          </div>
        </div>
      </Container>
    </nav>
  );
}
