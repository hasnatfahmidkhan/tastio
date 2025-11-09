import { Link } from "react-router";

const BtnSecondary = ({ children, to, className, onClick }) => {
  return (
    <Link
      onClick={onClick}
      to={`${to}`}
      className={`btn font-semibold px-7 text-secondary-content bg-secondary border border-primary hover:bg-(--color-secondary-hover) rounded-full ${className}`}
    >
      {children}
    </Link>
  );
};

export default BtnSecondary;
