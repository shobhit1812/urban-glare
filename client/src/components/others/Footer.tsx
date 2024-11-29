import { FiGithub } from "react-icons/fi";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { Mail, Phone } from "lucide-react";

const SocialLink = ({
  href,
  icon: Icon,
  ariaLabel,
}: {
  href: string;
  icon: React.ElementType;
  ariaLabel: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="text-2xl text-gray-700 hover:text-black transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
  >
    <Icon />
  </a>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800 uppercase tracking-wider">
    {children}
  </h3>
);

const ContactInfo = () => (
  <div className="space-y-3 text-gray-600">
    <div className="flex items-center space-x-3">
      <Mail className="text-gray-500" size={20} />
      <span>contact@urban.glare</span>
    </div>
    <div className="flex items-center space-x-3">
      <Phone className="text-gray-500" size={20} />
      <span>+123 456 7890</span>
    </div>
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <SectionTitle>About Urban Glare</SectionTitle>
          <p className="text-gray-600 leading-relaxed">
            Urban Glare is a cutting-edge e-commerce platform built with the
            MERN stack. We deliver seamless, secure, and responsive online
            shopping experiences that adapt perfectly to both desktop and mobile
            users.
          </p>
        </div>

        <div>
          <SectionTitle>Connect With Us</SectionTitle>
          <div className="flex space-x-6">
            <SocialLink
              href="https://github.com/Shobhit1812"
              icon={FiGithub}
              ariaLabel="GitHub Profile"
            />
            <SocialLink
              href="https://x.com/shobhitnautiya_"
              icon={FaXTwitter}
              ariaLabel="Twitter Profile"
            />
            <SocialLink
              href="https://instagram.com/imshobhitnautiyal"
              icon={FaInstagram}
              ariaLabel="Instagram Profile"
            />
          </div>
        </div>

        <div>
          <SectionTitle>Contact Information</SectionTitle>
          <ContactInfo />
        </div>
      </div>

      <div className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Urban Glare. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
