import { useState } from 'react';
import { HiOutlineXMark, HiOutlineBars3 } from 'react-icons/hi2';
import { links } from './Navigation';
import Container from './Container';

export default function MobileNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative block lg:hidden py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)] z-10">
      <Container className="flex justify-between items-center">
        <a href="/" className="w-35 h-auto flex items-center">
          <img
            src="/logo-light.webp"
            alt="Emirates Limo Logo"
            title="Emirates Limo Logo"
            className="w-full h-auto object-contain"
          />
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          title="Mobile Menu button"
          aria-label="Mobile Menu button"
        >
          {menuOpen ? <HiOutlineXMark className="text-3xl" /> : <HiOutlineBars3 className="text-3xl" />}
        </button>
      </Container>

      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 z-25" onClick={() => setMenuOpen(false)} />
          <div className="fixed inset-0 z-25 flex items-start m-10 justify-center" onClick={() => setMenuOpen(false)}>
            <div className="w-full h-fit bg-white shadow-md border border-gray-200 rounded-md z-25">
              {links.map((page, i) => (
                <a
                  key={i}
                  href={page.link}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-3 text-center text-base text-gray-800 hover:bg-gray-100 transition"
                >
                  {page.name}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
