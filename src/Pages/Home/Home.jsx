import Banner from "../../Components/Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import CardSkeleton from "../../Components/CardSkeleton/CardSkeleton";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";
import Faq from "../../Components/Faq/Faq";
import Container from "../../Components/Container/Container";
import Heading from "../../Components/Heading/Heading";
import CategorySection from "./CategorySection/CategorySection";

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
    const res = await axiosInstance.get(`leaderboard?limit=${3}`);
    return res.status === 200 ? res.data : [];
  };

  const { data: topReviewers } = useQuery({
    queryKey: ["topReviewes"],
    queryFn: getTopReviewers,
  });
  // console.log(topReviewers);

  return (
    <section>
      <Banner />

      <Container className="mt-14">
        <div className="text-center space-y-2 md:space-y-3">
          <Heading title="Top Rated" subtitle="Reviews" />
          <p className="text-2xl md:text-3xl font-semibold text-base-content">
            Discover what food lovers are raving about
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
          {isPending
            ? [...Array(data?.length || 8)].map((_, i) => (
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
        <CategorySection />

        {/* Top Reviewer Section  */}
        <div className="mt-20">
          <Heading title="Our Top" subtitle="Reviewers" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-5 mt-5">
            {topReviewers?.map((topReviewer, i) => {
              const { photo, name, reviewerEmail, totalReviews } = topReviewer;

              return (
                <div key={i} className="bg-secondary p-4 rounded-xl w-full">
                  <div className="flex flex-col items-center">
                    <figure className="w-20 h-20 rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={photo}
                        alt=""
                      />
                    </figure>
                    <div className="text-center mt-4 text-lg">
                      <h3 className="text-accent dark:text-accent-content">
                        {reviewerEmail}
                      </h3>
                      <p className="text-accent dark:text-accent-content font-medium">
                        {name}
                      </p>
                      <p className="text-accent dark:text-accent-content">
                        Total Reviews: {totalReviews}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Faq />
      </Container>
    </section>
  );
};

export default Home;
