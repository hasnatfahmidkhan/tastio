import {
  BarChart2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Edit3,
  FileCheck,
  Heart,
  Home,
  LogOut,
  Menu,
  MessageSquareText,
  SquarePen,
  Store,
  Tags,
  User,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, Outlet } from "react-router";
import ScrollOnTop from "../Components/ScrollOnTop/ScrollOnTop";
import Spinner from "../Components/Spinner/Spinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashBoardLayout = () => {
  const { user, signoutFunc } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [role, roleLoading] = useRole();

  if (roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  const userMenu = [
    // --- Admin Routes ---
    {
      path: "/dashboard", // analytics
      label: "Admin Home",
      icon: BarChart2,
      role: ["admin"],
    },
    {
      path: "/dashboard/manage-users",
      label: "Manage Users",
      icon: Users,
      role: ["admin"],
    },
    {
      path: "/dashboard/manage-applications",
      label: "Manage Applications",
      icon: ClipboardList,
      role: ["admin"],
    },
    {
      path: "/dashboard/manage-restaurants", // Update Route
      label: "All Restaurants",
      icon: Store,
      role: ["admin"],
    },
    {
      path: "/dashboard/manage-categories", // Update Route
      label: "Manage Categories",
      icon: Tags,
      role: ["admin"],
    },
    {
      path: "/dashboard/manage-reviews", // Moderation
      label: "Manage Reviews",
      icon: FileCheck,
      role: ["admin"], // or moderator
    },

    // --- Seller Routes ---
    {
      path: "/dashboard",
      label: "Seller Home",
      icon: Store,
      role: ["seller"],
    },
    {
      path: "/dashboard/my-foods",
      label: "My Foods",
      icon: UtensilsCrossed,
      role: ["seller"],
    },
    {
      path: "/dashboard/add-food",
      label: "Add Food",
      icon: Edit3,
      role: ["seller"],
    },
    {
      path: "/dashboard",
      label: "My Reviews",
      icon: MessageSquareText,
      role: ["user"],
    },
    {
      path: "/feed", // Community Post
      label: "Create Post",
      icon: SquarePen,
      role: ["user"],
    },
    {
      path: "/dashboard/wishlist",
      label: "Wishlist",
      icon: Heart,
      role: ["user"],
    },

    // --- Common / Shared ---
    {
      path: "/dashboard/me",
      label: "My Profile",
      icon: User,
      role: ["user", "seller", "admin"], // Everyone can see
    },
  ];

  const handleLogout = () => {
    signoutFunc().then(() => {});
    toast.success("Sign out successfully.");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
        {/* Navbar */}
        <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-30 px-3 md:px-10 py-6">
          {/* Mobile Menu Toggle */}
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-ghost btn-circle lg:hidden"
          >
            <Menu className="size-5" />
          </label>

          {/* Logo */}
          <div className="flex-1">
            <Link to="/" className="text-xl font-bold text-primary">
              Tastio
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 ">
            {/* User Avatar Dropdown - Using ProfileIcon */}
            <div className="dropdown dropdown-end">
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
                {/* Arrow that rotates on group focus */}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 group-focus:rotate-180 text-base-content`}
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-50 w-60 p-2 shadow-lg mt-4"
              >
                {/* User Info Header */}
                <li className="px-4 py-2 pointer-events-none">
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">
                      {user?.displayName || "User"}
                    </span>
                    <span className="text-xs text-gray-500 truncate w-full">
                      {user?.email}
                    </span>
                  </div>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <Link to="/dashboard/me">
                    <User className="size-4" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <Home className="size-4" />
                    Home
                  </Link>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button onClick={handleLogout} className="text-error">
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <ScrollOnTop />
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="bg-base-100 min-h-screen w-72 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-base-200">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="text-primary-content size-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary">Tastio</h1>
                <p className="text-xs text-gray-500 capitalize">
                  {role} Dashboard
                </p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-base-200">
            <div className="flex items-center gap-3">
              {/* User Avatar */}
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                  {imageError ? (
                    <div className="w-full h-full bg-primary flex items-center justify-center text-primary-content text-2xl font-bold">
                      {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  ) : (
                    <img
                      src={user?.photoURL || "/profile.png"}
                      alt={user?.displayName || "User"}
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">
                  {user?.displayName || "User"}
                </h3>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {userMenu.map((link, index) => (
                <li key={index}>
                  {link.role?.map(
                    (r, index) =>
                      r.includes(role) && (
                        <NavLink
                          key={index}
                          end
                          to={link.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-primary text-primary-content shadow-md"
                                : "hover:bg-base-200"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <link.icon className="size-5" />
                              <span className="flex-1">{link.label}</span>
                              {isActive && <ChevronRight className="size-4" />}
                            </>
                          )}
                        </NavLink>
                      ),
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-base-200">
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error btn-block gap-2"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashBoardLayout;
