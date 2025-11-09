import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import CardSkeleton from "../../Components/CardSkeleton/CardSkeleton";

const AllReviews = () => {
  const axiosInstance = useAxios();

  const getAllReviews = async () => {
    const res = await axiosInstance.get("/reviews");
    return res.status === 200 ? res.data : [];
  };
  const { data, isPending } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: getAllReviews,
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
      {isPending
        ? [...Array(data?.length)].map((_, i) => <CardSkeleton key={i} />)
        : data.map((review) => <ReviewCard key={review._id} review={review} />)}
    </div>
  );
};

export default AllReviews;
