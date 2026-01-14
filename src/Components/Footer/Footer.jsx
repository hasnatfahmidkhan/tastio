import { Link } from "react-router";
import { CiLinkedin } from "react-icons/ci";
import { FaFacebook, FaGithub, FaXTwitter } from "react-icons/fa6";
import { UtensilsCrossed } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* 1. Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <UtensilsCrossed className="text-primary size-8" />
              <span className="text-3xl font-bold tracking-wide text-primary logo-font">
                Tastio
              </span>
            </Link>
            <p className="text-base-content/70 text-sm leading-relaxed">
              Discover authentic Bangladeshi dishes, share your honest reviews,
              and join the biggest community of food lovers.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a
                target="_blank"
                href="https://linkedin.com/in/hasnatfahmid"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-300"
              >
                <CiLinkedin size={28} />
              </a>
              <a
                target="_blank"
                href="https://github.com/hasnatfahmidkhan"
                className="hover:text-primary transition-colors duration-300"
              >
                <FaGithub size={24} />
              </a>
              <a
                target="_blank"
                href="https://www.facebook.com/hasnatfahmidkhan"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-300"
              >
                <FaFacebook size={24} />
              </a>

              <a
                target="_blank"
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                <FaXTwitter size={24} />
              </a>
            </div>
          </div>

          {/* 2. Discover Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-base-content">
              Discover
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/all-foods"
                  className="text-base-content/70 hover:text-primary hover:pl-2 transition-all"
                >
                  All Foods
                </Link>
              </li>
              <li>
                <Link
                  to="/all-reviews"
                  className="text-base-content/70 hover:text-primary hover:pl-2 transition-all"
                >
                  Community Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  className="text-base-content/70 hover:text-primary hover:pl-2 transition-all"
                >
                  Top Reviewers
                </Link>
              </li>
              <li>
                <Link
                  to="/feed"
                  className="text-base-content/70 hover:text-primary hover:pl-2 transition-all"
                >
                  Foodie Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. For Business */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-base-content">
              For Business
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/be-partner"
                  className="text-base-content/70 hover:text-primary hover:pl-2 transition-all"
                >
                  Add Your Restaurant
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-base-content/70 hover:text-primary hover:pl-2 transition-all"
                >
                  Business Login
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary hover:pl-2 transition-all"
                >
                  Pricing & Plans
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary hover:pl-2 transition-all"
                >
                  Seller Support
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Contact / Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-base-content">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary hover:pl-2 transition-all"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary hover:pl-2 transition-all"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary hover:pl-2 transition-all"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary hover:pl-2 transition-all"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-base-content/60">
          <p>© {new Date().getFullYear()} Tastio. All rights reserved.</p>
          <p>
            Designed & Built by{" "}
            <a
              href="https://linkedin.com/in/hasnatfahmid"
              className="text-primary hover:underline"
            >
              Hasnat Fahmid
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
