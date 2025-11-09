import { Link } from "react-router";

const BtnPrimary = ({ children, className, to, onClick }) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={`btn font-semibold px-7 py-4 text-primary-content bg-primary hover:bg-(--color-primary-hover) rounded-full ${className}`}
    >
      {children}
    </Link>
  );
};

export default BtnPrimary;
