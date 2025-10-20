import { NavLink, useLocation } from 'react-router-dom';
import Container from './Container';
import { motion } from 'framer-motion';

export const links = [
  { name: 'Airport Transfer', href: '/dubai-airport-transfer' },
  { name: 'Chauffeur Service', href: '/chauffeur-service' },
  { name: 'City Tours', href: '/city-tours' },
];

function SidebarLink({ name, href }) {
  const { pathname } = useLocation();
  const isActive = href && pathname.startsWith(href);

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `relative font-light tracking-wide px-3 py-1 text-[16px] transition-colors duration-200
         ${isActive ? 'text-primary-600' : 'text-black/50 hover:text-black/90'}`
      }
    >
      {name}
      {/* Underline indicator */}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute left-1/2 -bottom-0.5 h-[1.5px] w-4/5 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-700"
        />
      )}
    </NavLink>
  );
}

export default function Navigation() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <nav
      className={`hidden md:block relative top-0 left-0 w-full z-50 transition-all duration-500 ${
        isHome
          ? 'bg-transparent backdrop-blur-sm'
          : 'bg-[#0b0b0b]/95 backdrop-blur-lg shadow-[0_1px_10px_rgba(0,0,0,0.2)]'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img
              src="/logo-light.png"
              alt="Emirates Limo"
              className="w-40 object-contain"
            />
          </a>

          {/* Links */}
          <div className="hidden lg:flex items-center gap-4">
            {links.map((link, i) => (
              <SidebarLink key={i} name={link.name} href={link.href} />
            ))}
          </div>

          {/* CTA button */}
          <motion.a
            href="/#book"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="hidden lg:inline-block bg-gradient-to-br from-primary-600 to-primary-800 text-white text-[15px] px-5 py-2.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Book Now
          </motion.a>
        </div>
      </Container>
    </nav>
  );
}
