import Banner from "../../Components/Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import CardSkeleton from "../../Components/CardSkeleton/CardSkeleton";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";
import Faq from "../../Components/Faq/Faq";

const Home = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const getTopReviews = async () => {
    const res = await axiosInstance.get("/latest-reviews");
    return res.status === 200 ? res.data : [];
  };

  const { data, isPending } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: getTopReviews,
  });

  const getTopReviewers = async () => {
    const res = await axiosInstance.get("/topReviewes");
    return res.status === 200 ? res.data : [];
  };

  const { data: topReviewers } = useQuery({
    queryKey: ["topReviewes"],
    queryFn: getTopReviewers,
  });

  console.log(topReviewers);

  return (
    <section>
      <Banner />

      <div className="mt-14 md:mt-20">
        <div className="text-center space-y-2 md:space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Top Rated <span className="text-base-content">Reviews</span>
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-base-content">
            Discover what food lovers are raving about
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
          {isPending
            ? [...Array(data?.length || 6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))
            : data.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
        </div>

        <div className="mt-20 text-center">
          <button
            onClick={() => navigate("/all-reviews")}
            className="btn btn-primary w-44 text-base py-5 rounded-full"
          >
            Show All
          </button>
        </div>

        <div></div>

        <Faq />
      </div>
    </section>
  );
};

export default Home;
