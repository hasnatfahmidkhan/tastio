import Forbidden from "../../Components/Forbidden/Forbidden";
import Spinner from "../../Components/Spinner/Spinner";
import useRole from "../../hooks/useRole";

const SellerRoute = ({ children }) => {
  const [role, roleLoading] = useRole();
  if (roleLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh)]">
        <Spinner />
      </div>
    );
  }
  if (role !== "seller") {
    return <Forbidden />;
  }
  return children;
};

export default SellerRoute;
