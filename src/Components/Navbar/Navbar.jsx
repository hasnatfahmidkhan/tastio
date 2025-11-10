import { NavLink, Link } from "react-router";
import BtnPrimary from "../Buttons/BtnPrimary/BtnPrimary";
import BtnSecondary from "../Buttons/BtnSecondary/BtnSecondary";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, signoutFunc } = useAuth();

  const handleSignOut = async () => {
    try {
      signoutFunc().then(() => {
        toast.success("Sign Out Successfully!");
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-reviews"}>All Reviews</NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <Link to={"/add-review"}>Add Review</Link>
      </li>
      <li>
        <Link to={'/my-reviews'}>My Reviews</Link>
      </li>
      <li>
        <Link>My Favourite</Link>
      </li>
      <li>
        <button onClick={handleSignOut} className="text-red-600">
          Sign Out
        </button>
      </li>
    </>
  );
  return (
    <nav className={"py-1 bg-base-200 shadow-md"}>
      <div className="navbar md:w-11/12 2xl:w-7xl mx-auto md:px-4">
        <div className="navbar-start gap-2">
          {user && (
            <div className="dropdown dropdown-bottom dropdown-start md:hidden">
              <img
                src={user?.photoURL}
                tabIndex={0}
                role="button"
                className="w-12 h-12 rounded-full m-1 cursor-pointer"
              />

              <ul
                tabIndex="-1"
                className="dropdown-content menu menu-lg bg-base-100 rounded-md z-1 w-52 text-base-content font-semibold p-2 shadow-sm tracking-wide divide-y divide-base-300"
              >
                {userLinks}
              </ul>
            </div>
          )}
          <Link to="/">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-primary logo-font">
              Tastio
            </h2>
          </Link>
        </div>

        {/* desktop menu  */}
        <div className="navbar-center hidden lg:flex">
          <ul className="navlinks flex gap-9 font-medium text-base-content text-lg">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="dropdown dropdown-bottom dropdown-end">
                <img
                  src={user?.photoURL}
                  tabIndex={0}
                  role="button"
                  className="w-12 h-12 rounded-full m-1 cursor-pointer"
                />

                <ul
                  tabIndex="-1"
                  className="dropdown-content menu text-base bg-base-100 rounded-md z-1 w-52 text-base-content font-semibold divide-accent p-2 shadow-sm"
                >
                  {userLinks}
                </ul>
              </div>
            ) : (
              <>
                <BtnSecondary to={"/login"} className={"rounded-full"}>
                  Login
                </BtnSecondary>

                <BtnPrimary to={"/register"} className={"rounded-full"}>
                  Register
                </BtnPrimary>
              </>
            )}
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
              className="navlinks menu menu-lg dropdown-content bg-base-100 rounded-md z-1 mt-3 w-52 p-2 shadow divide-y divide-base-300 font-semibold"
            >
              {links}

              {!user && (
                <>
                  <li>
                    <NavLink to={"/login"}>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/register"}>Register</NavLink>
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
