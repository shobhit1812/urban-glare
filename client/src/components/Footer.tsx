import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <>
      <hr className="border-t border-black" />
      <footer className="p-5">
        <div className="flex flex-col md:flex-row justify-between items-start mx-auto max-w-screen-2xl px-6 md:px-16 lg:px-36 space-y-6 md:space-y-0">
          {/* About Us Section */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">About Us</h3>
            <p className="text-sm">
              {`Urban Glare is a modern e-commerce platform built with the MERN stack, designed for efficient, secure, and responsive online shopping experiences. Leveraging a range of cutting-edge technologies, urban glare offers seamless browsing, secure transactions, and an intuitive user interface tailored for both desktop and mobile users.`}
            </p>
          </div>

          {/* Follow Us Section */}
          <div className="flex-1 md:ml-16">
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Shobhit1812"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <FiGithub />
              </a>
              <a
                href="https://x.com/shobhitnautiya_"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://instagram.com/imshobhitnautiyal"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="flex-2">
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-sm">
              Email: contact@urban.glare <br />
              Phone: +123 456 7890
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
