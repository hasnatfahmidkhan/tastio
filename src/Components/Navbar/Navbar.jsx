import { NavLink, Link } from "react-router";
import BtnPrimary from "../Buttons/BtnPrimary/BtnPrimary";
import BtnSecondary from "../Buttons/BtnSecondary/BtnSecondary";
// import useAuth from "../../hooks/useAuth";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";

const Navbar = () => {
  //   const { user, signoutFunc } = useAuth();
  //   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  //   useEffect(() => {
  //     const html = document.querySelector("html");
  //     html.setAttribute("data-theme", theme);
  //     localStorage.setItem("theme", theme);
  //   }, [theme]);

  //   const handleTheme = (checked) => {
  //     setTheme(checked ? "dark" : "light");
  //   };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-products"}>All Reviews</NavLink>
      </li>
    </>
  );
  return (
    <nav className={"py-2 bg-base-200 shadow-md"}>
      <div className="navbar md:w-11/12 2xl:w-7xl mx-auto md:px-4">
        <div className="navbar-start">
          <Link to="/">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-primary logo-font">
              Tastio
            </h2>
          </Link>
        </div>

        {/* desktop menu  */}
        <div className="navbar-center hidden lg:flex">
          <ul className="navlinks flex gap-9 font-medium text-base-content">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="hidden lg:flex items-center gap-4">
            <>
              <BtnSecondary to={"/login"}>Login</BtnSecondary>

              <BtnPrimary to={"/register"}>Register</BtnPrimary>
            </>
          </div>

          {/* mobile menu  */}
          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 rotate-y-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="navlinks menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text divide-y divide-gray-300"
            >
              {links}

              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/register"}>Register</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
