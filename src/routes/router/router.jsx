import { createBrowserRouter } from "react-router";
import DashBoardLayout from "../../Layout/DashboardLayout";
import Root from "../../Layout/Root";
import AddReview from "../../Pages/AddReview/AddReview";
import AllFoods from "../../Pages/AllFoods/AllFoods";
import AllRestaurants from "../../Pages/AllRestaurants/AllRestaurants";
import AllReviews from "../../Pages/AllReviews/AllReviews";
import BeASeller from "../../Pages/BeASeller/BeASeller";
import Contact from "../../Pages/Contact/Contact";
import ManageApplications from "../../Pages/Dashboard/Admin/ManageApplications/ManageApplications";
import ManageCategories from "../../Pages/Dashboard/Admin/ManageCategories/ManageCategories";
import ManageRestaurants from "../../Pages/Dashboard/Admin/ManageRestaurants/ManageRestaurants";
import ManageReviews from "../../Pages/Dashboard/Admin/ManageReviews/ManageReviews";
import ManageUsers from "../../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Profile from "../../Pages/Dashboard/Profile/Profile";
import AddFood from "../../Pages/Dashboard/Seller/AddFood/AddFodd";
import MyFoods from "../../Pages/Dashboard/Seller/MyFoods/MyFoods";
import UpdateFood from "../../Pages/Dashboard/Seller/UpdateFood/UpdateFood";
import EditReview from "../../Pages/EditReview/EditReview";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Feed from "../../Pages/Feed/Feed";
import FoodDetails from "../../Pages/FoodDetails/FoodDetails";
import Home from "../../Pages/Home/Home";
import Leaderboard from "../../Pages/Leaderboard/Leaderboard";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import RestaurantDetails from "../../Pages/RestaurantDetails/RestaurantDetails";
import ReviewDetails from "../../Pages/ReviewDetails/ReviewDetails";
import Wishlist from "../../Pages/Wishlist/Wishlist";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoutes from "../privateroutes/PrivateRoutes";
import SellerRoute from "../SellerRoute/SellerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-reviews",
        Component: AllReviews,
      },
      {
        path: "/all-foods",
        Component: AllFoods,
      },
      {
        path: "/all-restaurants",
        Component: AllRestaurants,
      },
      {
        path: "/food-details/:id",
        element: <FoodDetails />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetails />,
      },
      {
        path: "/review-details/:id",
        element: <ReviewDetails />,
      },
      { path: "/feed", Component: Feed },
      { path: "/contact", Component: Contact },

      {
        path: "/be-partner",
        element: (
          <PrivateRoutes>
            <BeASeller />
          </PrivateRoutes>
        ),
      },
      {
        path: "/leaderboard",
        element: (
          <PrivateRoutes>
            <Leaderboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      // Admin route
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-reviews",
        element: (
          <AdminRoute>
            <ManageReviews />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-restaurants",
        element: (
          <AdminRoute>
            <ManageRestaurants />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-categories",
        element: (
          <AdminRoute>
            <ManageCategories />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-applications",
        element: (
          <AdminRoute>
            <ManageApplications />
          </AdminRoute>
        ),
      },
      // Seller route
      {
        path: "/dashboard/add-food",
        element: (
          <SellerRoute>
            <AddFood />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/my-foods",
        element: (
          <SellerRoute>
            <MyFoods />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/update-food/:id",
        element: (
          <SellerRoute>
            <UpdateFood />
          </SellerRoute>
        ),
      },

      // profile
      { path: "me", element: <Profile /> },
      {
        path: "/dashboard/add-review",
        element: <AddReview />,
      },
      {
        path: "/dashboard/my-reviews/edit/:id",
        element: <EditReview />,
      },
      {
        path: "/dashboard/wishlist",
        element: <Wishlist />,
      },
    ],
  },
]);
export default router;
