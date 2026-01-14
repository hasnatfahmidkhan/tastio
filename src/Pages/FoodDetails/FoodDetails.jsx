import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../Components/Container/Container";
import Spinner from "../../Components/Spinner/Spinner";
import ReviewSection from "./ReviewSection";

const FoodDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: food, isLoading } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => (await axiosSecure.get(`/menu/${id}`)).data,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Spinner />
      </div>
    );

  return (
    <Container>
      {/* Food Info Card */}
      <div className="card lg:card-side bg-base-100 shadow-xl mb-10 border border-base-200">
        <figure className="lg:w-1/2 h-96">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-4xl mb-2">{food.name}</h2>
          <p className="text-xl font-bold text-primary">${food.price}</p>
          <p className="py-4 text-gray-500">{food.description}</p>

          <div className="flex items-center gap-4 mt-auto">
            <div className="badge badge-outline p-4">
              By: {food.restaurantName || "Unknown"}
            </div>
            <div className="badge badge-secondary p-4">{food.category}</div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <ReviewSection
        restaurantName={food.restaurantName}
        photo={food.image}
        foodId={id}
        foodTitle={food.name}
      />
    </Container>
  );
};
export default FoodDetails;
