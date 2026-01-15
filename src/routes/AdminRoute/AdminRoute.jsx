import Spinner from "../../Components/Spinner/Spinner";
import useRole from "../../hooks/useRole";
import Forbidden from "../../Components/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const [role, roleLoading] = useRole();
  if (roleLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh)]">
        <Spinner />
      </div>
    );
  }
  if (role !== "admin") {
    return <Forbidden />;
  }
  return children;
};

export default AdminRoute;
