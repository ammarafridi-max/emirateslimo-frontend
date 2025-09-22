import {
  HiOutlineUsers,
  HiOutlineTicket,
  HiOutlineHome,
} from 'react-icons/hi2';
import { NavLink, useLocation } from 'react-router-dom';
import Container from './Container';

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HiOutlineHome,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Bookings',
    href: '/bookings',
    icon: HiOutlineTicket,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Zones',
    href: '/zones',
    icon: HiOutlineTicket,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Vehicles',
    href: '/vehicles',
    icon: HiOutlineUsers,
    accessTo: ['admin'],
  },
  {
    name: 'Pricing',
    href: '/pricing',
    icon: HiOutlineTicket,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Availability Rules',
    href: '/availability-rules',
    icon: HiOutlineTicket,
    accessTo: ['admin', 'agent'],
  },
];

function SidebarLink({ name, href, Icon, accessTo, action }) {
  const { pathname } = useLocation();
  const isActive = href && pathname.startsWith(href);

  return (
    <NavLink
      to={href}
      className={`font-light text-[16px] py-2 px-3 mb-1.25 rounded-sm duration-150 hover:text-accent-500 ${
        isActive ? 'bg-gray-100 text-black' : 'bg-transparent text-black'
      }`}
    >
      {name}
    </NavLink>
  );
}

export default function Navigation() {
  return (
    <Container>
      <div className="flex items-center justify-between gap-10 py-5">
        <div></div>
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
  );
}
