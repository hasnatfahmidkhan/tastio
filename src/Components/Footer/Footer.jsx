import { CiLinkedin } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer class="w-full mt-10 py-14">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <div className="flex justify-center">
            <a className="text-4xl font-bold tracking-wide text-primary logo-font">
              Tastio
            </a>
          </div>
          <ul class="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 pt-8 pb-10 mb-10 border-b border-gray-200">
            <li>
              <a href="/" class="text-gray-800 hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#" class=" text-gray-800 hover:text-primary">
                All Reviews
              </a>
            </li>
            <li>
              <a href="#" class=" text-gray-800 hover:text-primary">
                Resources
              </a>
            </li>
            <li>
              <a href="#" class=" text-gray-800 hover:text-primary">
                Blogs
              </a>
            </li>
            <li>
              <a href="#" class=" text-gray-800 hover:text-primary">
                Support
              </a>
            </li>
          </ul>
          <div class="flex space-x-10 justify-center items-center mb-8">
            <a
              href="#"
              class="block  text-gray-900 transition-all duration-500 hover:text-primary"
            >
              <FaXTwitter size={28} />
            </a>
            <a
              href="#"
              class="block  text-gray-900 transition-all duration-500 hover:text-primary"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="#"
              class="block  text-gray-900 transition-all duration-500 hover:text-primary"
            >
              <CiLinkedin size={32} />
            </a>
            <a
              href="#"
              class="block  text-gray-900 transition-all duration-500 hover:text-primary"
            >
              <FaInstagram size={32} />
            </a>
          </div>
          <span class="text-lg text-gray-500 text-center block">
            ©<a href="https://pagedone.io/">Tastio</a>{" "}
            {new Date().getFullYear()}, All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
