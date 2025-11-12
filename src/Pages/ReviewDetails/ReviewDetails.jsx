import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import BackBtn from "../../Components/BackBtn/BackBtn";
import Spinner from "../../Components/Spinner/Spinner";

const ReviewDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const getDeatils = async () => {
    const res = await axiosSecure.get(`/reviews/${id}`);
    return res.status === 200 && res.data;
  };

  const { data, isPending } = useQuery({
    queryKey: ["reviews", id],
    queryFn: getDeatils,
  });
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  const {
    _id,
    foodName,
    photo,
    restaurantName,
    location,
    reviewerName,
    reviewerEmail,
    rating,
    postedAt,
    reviewText,
  } = data;

  return (
    <section>
      <title>Review Details</title>
      <div className="flex flex-col md:flex-row items-center gap-y-4 md:gap-6 xl:gap-8">
        <div className="w-full md:w-1/2">
          <img
            className="rounded-xl h-60 md:h-96 xl:h-[400px] object-cover w-full"
            loading="lazy"
            src={photo}
            alt={foodName}
          />
        </div>
        <div className="w-full md:w-1/2">
          <BackBtn className={"justify-start"} />
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold">
            {foodName}
          </h2>
          <div className="bg-secondary p-4 rounded-xl space-y-1 tracking-wide font-medium my-2">
            <p>Restuarant Name: {restaurantName}</p>
            <p>Location: {location}</p>
          </div>
          <div className="bg-secondary p-4 rounded-xl space-y-1 tracking-wide font-medium my-5">
            <p>Reviewer Name: {reviewerName}</p>
            <p>Reviewer Email: {reviewerEmail}</p>
          </div>
          <div className="bg-secondary p-4 rounded-xl space-y-1 tracking-wide font-medium md:my-5">
            <p className="flex items-center gap-1">
              Rating:{" "}
              <span className="flex items-center gap-0.5">
                {rating} <FaStar color="#facc15" />
              </span>
            </p>
            <p>Posted At: {new Date(postedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <div className="bg-secondary p-4 rounded-xl space-y-1 tracking-wide font-medium my-5 leading-relaxed">
        <span className="font-semibold">Reviewer Say's: </span>
        {reviewText}
      </div>
    </section>
  );
};

export default ReviewDetails;
