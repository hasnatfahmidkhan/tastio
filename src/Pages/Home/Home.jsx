import Banner from "../../Components/Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import CardSkeleton from "../../Components/CardSkeleton/CardSkeleton";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";
import Faq from "../../Components/Faq/Faq";
import Container from "../../Components/Container/Container";

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

      <Container className="mt-14 md:mt-20">
        <div className="text-center space-y-2 md:space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Top Rated <span className="text-base-content">Reviews</span>
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-base-content">
            Discover what food lovers are raving about
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
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

        {/* Top Reviewer Section  */}
        <div className="mt-20">
          <h2 className="text-4xl text-center md:text-5xl font-bold text-base-content">
            <span className="text-primary">Our Top</span> Reviewers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 place-items-center gap-5 mt-5">
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
                      <h3 className="text-accent">{reviewerEmail}</h3>
                      <p className="text-base-content font-medium">{name}</p>
                      <p className="text-accent">
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
