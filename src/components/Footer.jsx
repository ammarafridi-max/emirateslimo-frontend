import {
  FaStripe,
  FaGooglePay,
  FaApplePay,
  FaCcVisa,
  FaCcMastercard,
  FaPhoneAlt,
  FaEnvelope,
  FaMapPin,
  FaWhatsapp,
} from 'react-icons/fa';
import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="py-5 bg-primary-800">
      <Container className="py-7.5 bg-transparent box-border font-outfit">
        <div className="grid grid-cols-6 md:flex justify-between gap-8 mb-10 text-white">
          <div className="col-span-6 md:w-[33%] flex flex-col gap-5">
            <img src="/logo-dark.png" className="w-[150px]" />
            <p className="text-white text-md md:text-[16px] font-extralight leading-6">
              VisaWadi provides reliable and hassle-free visa services,
              specializing in Schengen, UK, US, and other international visas.
              We make the process simple, transparent, and stress-free so you
              can focus on your travel plans.
            </p>
            <div className="flex gap-2">
              <IconCard icon={<FaFacebook />} href="tel:971506045355" />
              <IconCard icon={<FaInstagram />} href="tel:971506045355" />
            </div>
          </div>
          <div className="col-span-3 md:w-fit">
            <p className="text-xl text-white">Site Links</p>
            <div className="flex flex-col mt-4 text-white text-md md:text-lg font-extralight gap-2">
              <FooterLink>Home</FooterLink>
              <FooterLink>About</FooterLink>
              <FooterLink>Services</FooterLink>
              <FooterLink>Benefits</FooterLink>
            </div>
          </div>
          <div className="col-span-3 md:w-fit">
            <p className="text-xl text-white">Visas</p>
            <div className="flex flex-col mt-4 text-white text-md md:text-lg font-extralight gap-2">
              <FooterLink>Schengen Visa</FooterLink>
              <FooterLink>US Visa (B1/B2)</FooterLink>
              <FooterLink>UK Tourist Visa</FooterLink>
              <FooterLink>Canada Visa</FooterLink>
              <FooterLink>Australia Visa</FooterLink>
            </div>
          </div>
          <div className="col-span-6 md:w-fit">
            <p className="text-xl text-white">Contact Us</p>
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
            <div key={i} className="text-white text-[35px] md:text-[40px]">
              {icon}
            </div>
          ))}
        </div>
        <div>
          <div className="text-center text-white font-light text-[14px] md:text-[16px]">
            © 2025 TRAVL Technologies. All Rights Reserved.
          </div>
          <div className="flex items-center justify-center gap-2.5 text-[14px] font-bold text-white">
            <a href="/terms-and-conditions" className="color-white">
              Terms & Conditions
            </a>
            <span>|</span>
            <a href="/privacy-policy" className="color-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

const icons = [
  <FaStripe />,
  <FaGooglePay />,
  <FaApplePay />,
  <FaCcVisa />,
  <FaCcMastercard />,
];

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
      <span className="bg-primary-500 w-[30px] h-[30px] rounded-full flex items-center justify-center text-sm duration-300 group-hover:bg-primary-600">
        {icon}
      </span>
      {children && <p className="text-[16px]">{children}</p>}
    </a>
  );
}
