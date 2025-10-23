import {
  FaStripe,
  FaGooglePay,
  FaApplePay,
  FaPhoneAlt,
  FaEnvelope,
  FaMapPin,
  FaWhatsapp,
} from 'react-icons/fa';
import { RiVisaLine, RiMastercardLine } from 'react-icons/ri';
import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import Container from './Container';

const icons = [
  <FaStripe />,
  <FaGooglePay />,
  <FaApplePay />,
  <RiVisaLine />,
  <RiMastercardLine />,
];

export default function Footer() {
  return (
    <footer className="py-5 bg-primary-900">
      <Container className="py-7.5 bg-transparent box-border font-outfit">
        <div className="grid grid-cols-6 md:flex justify-between gap-8 mb-10 text-white">
          <div className="col-span-6 md:w-[33%] flex flex-col gap-5">
            <img src="/logo-dark.png" className="w-40" />
            <p className="text-primary-300 text-md md:text-[16px] font-extralight leading-7">
              Emirates Limo provides premium chauffeured transfer services
              across the UAE, ensuring every journey is smooth, safe, and on
              time.
            </p>
            <div className="flex gap-2">
              <IconCard icon={<FaFacebook />} href="tel:971506045355" />
              <IconCard icon={<FaInstagram />} href="tel:971506045355" />
            </div>
          </div>
          <div className="col-span-3 md:w-fit">
            <p className="text-lg text-white font-light">Site Links</p>
            <div className="flex flex-col mt-4 text-white text-md md:text-lg font-extralight gap-2">
              <FooterLink>Home</FooterLink>
              <FooterLink>About</FooterLink>
              <FooterLink>Services</FooterLink>
              <FooterLink href="/fleet">Fleet</FooterLink>
            </div>
          </div>
          <div className="col-span-3 md:w-fit">
            <p className="text-lg text-white font-light">Services</p>
            <div className="flex flex-col mt-4 text-white text-md md:text-lg font-extralight gap-2">
              <FooterLink>Airport Transfer</FooterLink>
              <FooterLink>Chauffeur Service</FooterLink>
              <FooterLink>City-To-City Rides</FooterLink>
              <FooterLink>City Tours</FooterLink>
            </div>
          </div>
          <div className="col-span-6 md:w-fit">
            <p className="text-lg text-white font-light">Contact Us</p>
            <div className="flex flex-col mt-4 text-white text-md md:text-lg font-extralight gap-3">
              <IconCard icon={<FaPhoneAlt />} href="tel:971506045355">
                +971 50 604 5355
              </IconCard>
              <IconCard
                icon={<FaWhatsapp />}
                href={`https://wa.me/971506045355?text=${'Hi VisaWadi, I need assistance with a visa.'.split(' ').join('%20')}`}
              >
                WhatsApp Us
              </IconCard>
              <IconCard icon={<FaEnvelope />} href="mailto:info@visawadi.com">
                info@visawadi.com
              </IconCard>
              <IconCard
                icon={<FaMapPin />}
                href="https://maps.google.com?q=A Block, Abraj Al Mamzar"
              >
                A Block, Abraj Al Mamzar
              </IconCard>
            </div>
          </div>
        </div>
        <div className="w-full gap-3 md:gap-5 mx-auto mb-3.5 pb-3.5 flex items-center justify-center border-b-1 border-solid border-gray-200 ">
          {icons.map((icon, i) => (
            <div
              key={i}
              className="text-primary-200 text-[35px] md:text-[40px]"
            >
              {icon}
            </div>
          ))}
        </div>
        <div>
          <p className="text-center text-primary-300 font-light text-[14px] md:text-[16px]">
            © 2025 TRAVL Technologies. All Rights Reserved.
          </p>
          <div className="flex items-center justify-center gap-2.5 text-[14px] font-light text-white">
            <a
              href="/terms-and-conditions"
              className="text-primary-300 hover:text-primary-100"
            >
              Terms & Conditions
            </a>
            <span>|</span>
            <a
              href="/privacy-policy"
              className="text-primary-300 hover:text-primary-100"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ href = '#', children }) {
  return (
    <a
      href={href}
      className="cursor-pointer group text-[16px] text-primary-300 hover:text-primary-100"
    >
      {/* <span className="mr-4 font-bold duration-300 group-hover:text-primary-500">
        —
      </span> */}
      {children}
    </a>
  );
}

function IconCard({ icon, href, children, target }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 leading-6 group"
      target="_blank"
    >
      <span className="bg-white text-black w-[30px] h-[30px] rounded-full flex items-center justify-center text-sm duration-300 group-hover:bg-primary-200">
        {icon}
      </span>
      {children && <p className="text-[16px]">{children}</p>}
    </a>
  );
}
