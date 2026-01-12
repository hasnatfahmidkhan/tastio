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
        path: "/review-details/:id",
        element: (
          <PrivateRoutes>
            <ReviewDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-review",
        element: (
          <PrivateRoutes>
            <AddReview />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-reviews",
        element: (
          <PrivateRoutes>
            <MyReviews />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-reviews/edit/:id",
        element: (
          <PrivateRoutes>
            <EditReview />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-favourite",
        element: (
          <PrivateRoutes>
            <MyFavourite />
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
]);
export default router;
