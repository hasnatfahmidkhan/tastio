import useRole from "../../hooks/useRole";
import AdminHome from "./Admin/AdminHome/AdminHome";
import SellerHome from "./Seller/SellerHome/SellerHome";
import Spinner from "../../Components/Spinner/Spinner";
import MyReviews from "../MyReviews/MyReviews";

const Dashboard = () => {
  const [role, roleLoading] = useRole();
  if (roleLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spinner />
      </div>
    );
  }

  if (role === "admin") {
    return <AdminHome />;
  }

  if (role === "seller") {
    return <SellerHome />;
  }
  if (role === "user") {
    return <MyReviews />;
  }
};

export default Dashboard;
