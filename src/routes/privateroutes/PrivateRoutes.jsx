import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../Components/Spinner/Spinner";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={location.pathname} />;
};

export default PrivateRoutes;
