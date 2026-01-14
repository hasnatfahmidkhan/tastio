import { createBrowserRouter } from "react-router";
import Root from "../../Layout/Root";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import AllReviews from "../../Pages/AllReviews/AllReviews";
import AddReview from "../../Pages/AddReview/AddReview";
import PrivateRoutes from "../privateroutes/PrivateRoutes";
import MyReviews from "../../Pages/MyReviews/MyReviews";
import EditReview from "../../Pages/EditReview/EditReview";
import MyFavourite from "../../Pages/MyFavourite/MyFavourite";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import ReviewDetails from "../../Pages/ReviewDetails/ReviewDetails";
import Leaderboard from "../../Pages/Leaderboard/Leaderboard";
import DashBoardLayout from "../../Layout/DashboardLayout";
import Feed from "../../Pages/Feed/Feed";
import BeASeller from "../../Pages/BeASeller/BeASeller";
import ManageApplications from "../../Pages/Dashboard/Admin/ManageApplications/ManageApplications";
import AddFood from "../../Pages/Dashboard/Seller/AddFood/AddFodd";
import MyFoods from "../../Pages/Dashboard/Seller/MyFoods/MyFoods";
import UpdateFood from "../../Pages/Dashboard/Seller/UpdateFood/UpdateFood";
import AllFoods from "../../Pages/AllFoods/AllFoods";
import FoodDetails from "../../Pages/FoodDetails/FoodDetails";

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
        path: "/food-details/:id",
        element: <FoodDetails />,
      },
      {
        path: "/review-details/:id",
        element: <ReviewDetails />,
      },
      { path: "/feed", Component: Feed },

      {
        path: "/my-favourite",
        element: (
          <PrivateRoutes>
            <MyFavourite />
          </PrivateRoutes>
        ),
      },
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
      // Admin route
      {
        path: "/dashboard/manage-applications",
        element: <ManageApplications />,
      },
      // Seller route
      { path: "/dashboard/add-food", element: <AddFood /> },
      { path: "/dashboard/my-foods", element: <MyFoods /> },
      { path: "/dashboard/update-food/:id", element: <UpdateFood /> },
      {
        path: "/dashboard/add-review",
        element: <AddReview />,
      },
      {
        path: "/dashboard/my-reviews",
        element: <MyReviews />,
      },
      {
        path: "/dashboard/my-reviews/edit/:id",
        element: <EditReview />,
      },
    ],
  },
]);
export default router;
