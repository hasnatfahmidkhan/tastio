import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Store,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, signoutFunc } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current route

  // --- State ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // --- Logic: Check if current page has a Hero Banner ---
  // List all routes that have a dark hero image at the top
  const pagesWithHero = ["/", "/all-foods", "/all-restaurants", "/all-reviews"];

  // Logic: Use white text ONLY if we are on a Hero page AND not scrolled yet.
  const isHeroPage = pagesWithHero.includes(location.pathname);
  const useWhiteText = isHeroPage && !isScrolled;

  // --- Theme Logic ---
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // --- Scroll Logic ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Handlers ---
  const handleSignOut = async () => {
    try {
      await signoutFunc();
      toast.success("Sign Out Successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Foods", path: "/all-foods" },
    { name: "Restaurants", path: "/all-restaurants" },
    { name: "Reviews", path: "/all-reviews" },
    ...(user
      ? [
          { name: "Leaderboard", path: "/leaderboard" },
          { name: "Feed", path: "/feed" },
        ]
      : []),
    { name: "Contact", path: "/contact" },
  ];

  // Helper class for text color
  const textColorClass = useWhiteText ? "text-white/90" : "text-base-content";
  const hoverClass = useWhiteText ? "hover:text-white" : "hover:text-primary";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-base-100/80 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 flex justify-between items-center">
        {/* 1. Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <UtensilsCrossed size={24} />
          </div>
          <h2
            className={`text-2xl font-bold tracking-wide logo-font text-primary`}
          >
            Tastio
          </h2>
        </Link>

        {/* 2. Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-medium text-sm uppercase tracking-wide transition-colors ${
                  isActive ? "text-primary" : `${textColorClass} ${hoverClass}`
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* 3. Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`btn btn-circle btn-sm btn-ghost transition-transform hover:rotate-12 ${textColorClass}`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* User Dropdown or Login */}
          {user ? (
            <div className="dropdown dropdown-end group">
              {/* Trigger */}
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 cursor-pointer p-1 pr-2 rounded-full border border-transparent hover:border-base-content/20 transition-all"
              >
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      loading="lazy"
                      src={user?.photoURL || "/profile.png"}
                      onError={(e) => {
                        e.currentTarget.src = "/profile.png";
                      }}
                      alt="User"
                    />
                  </div>
                </div>
                {/* Arrow Color Logic Applied Here */}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 group-focus:rotate-180 ${textColorClass}`}
                />
              </div>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-xl w-60 z-1 mt-4 border border-base-200"
              >
                <li className="menu-title px-4 py-2 text-base-content">
                  Hello, {user.displayName?.split(" ")[0]}
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="py-3 font-medium text-base-content"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className="py-3 font-medium text-base-content"
                  >
                    <User size={18} /> Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/be-partner"
                    className="py-3 font-medium text-base-content"
                  >
                    <Store size={18} /> Be a Partner
                  </NavLink>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-error font-bold hover:bg-error/10"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link
                to="/login"
                className={`btn btn-ghost btn-sm ${textColorClass}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm rounded-full px-6 border-none shadow-lg"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="dropdown dropdown-end lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-ghost btn-circle ${textColorClass}`}
            >
              <Menu size={24} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 border border-base-200"
            >
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className="text-base-content">
                    {link.name}
                  </NavLink>
                </li>
              ))}
              {!user && (
                <>
                  <div className="divider my-1"></div>
                  <li>
                    <Link to="/login" className="text-base-content">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-base-content">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
