import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Store, Quote, Calendar, Star, User } from "lucide-react";
import BackBtn from "../../Components/BackBtn/BackBtn";
import Spinner from "../../Components/Spinner/Spinner";
import Container from "../../Components/Container/Container";

const ReviewDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const getDetails = async () => {
    const res = await axiosSecure.get(`/reviews/${id}`);
    return res.status === 200 && res.data;
  };

  const { data, isPending } = useQuery({
    queryKey: ["reviews", id],
    queryFn: getDetails,
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  const {
    foodName,
    photo,
    restaurantName,
    location,
    reviewerName,
    reviewerEmail,
    reviewerPhoto, // Assuming this exists in your schema
    rating,
    postedAt,
    reviewText,
  } = data;

  // Star Rating Helper
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={20}
        className={i < rating ? "fill-warning text-warning" : "text-gray-300"}
      />
    ));
  };

  return (
    <Container>
      <title>{foodName} - Review Details</title>

      {/* Top Header with Back Button */}
      <div className="py-6">
        <BackBtn className={"justify-start"} />
      </div>

      <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-200">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side: Food Image */}
          <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[500px]">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={photo}
              alt={foodName}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Store size={18} className="text-primary" />
                  <span className="font-semibold">{restaurantName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <MapPin size={16} />
                  <span>{location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Details & Review */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Header Info */}
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-3xl md:text-4xl font-bold text-base-content leading-tight">
                  {foodName}
                </h2>
                <div className="flex flex-col items-center bg-base-200 p-3 rounded-xl min-w-[80px]">
                  <span className="text-3xl font-black text-primary">
                    {rating}
                  </span>
                  <div className="flex gap-0.5 mt-1">{renderStars(rating)}</div>
                </div>
              </div>

              {/* Reviewer Card */}
              <div className="flex items-center gap-4 mt-8 bg-base-200/50 p-4 rounded-xl border border-base-200">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {reviewerPhoto ? (
                      <img src={reviewerPhoto} alt={reviewerName} />
                    ) : (
                      <div className="bg-neutral text-neutral-content w-full h-full flex items-center justify-center">
                        <User size={24} />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg">{reviewerName}</h4>
                  <p className="text-sm text-gray-500">{reviewerEmail}</p>
                </div>
              </div>

              {/* The Review Text */}
              <div className="mt-8 relative">
                <Quote
                  className="absolute -top-3 -left-2 text-primary/20 rotate-180"
                  size={48}
                />
                <p className="relative z-10 text-lg text-gray-600 leading-relaxed italic pl-6">
                  "{reviewText}"
                </p>
              </div>
            </div>

            {/* Footer Date */}
            <div className="mt-8 pt-6 border-t border-base-200 flex items-center gap-2 text-gray-400 text-sm font-medium">
              <Calendar size={16} />
              <span>
                Reviewed on{" "}
                {new Date(postedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReviewDetails;
