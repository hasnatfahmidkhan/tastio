import Banner from "../../Components/Banner/Banner";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";

const Home = () => {
  const axiosInstance = useAxios();

  const getTopReviews = async () => {
    const res = await axiosInstance.get("/latest-reviews");
    return res.status === 200 ? res.data : [];
  };
  const { data, isPending, error } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: getTopReviews,
  });

  console.log(data);

  return (
    <section>
      <Banner />

      <div className="mt-14 md:mt-20">
        <div className="text-center space-y-2 md:space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Top Rated <span className="text-base-content">Reviews</span>
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-base-content">
            Discover what local food lovers are raving about
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
          {isPending
            ? ""
            : data.map((review) => (
               <ReviewCard key={review._id} review={review}/>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
