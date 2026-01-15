import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import { MapPin, Phone, Star, Utensils, CheckCircle } from "lucide-react";
import Container from "../../Components/Container/Container";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";

const RestaurantDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/restaurants/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const { restaurant, menu } = data;

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* --- 1. Hero Banner --- */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={
            restaurant.restaurantImage ||
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000"
          }
          alt={restaurant.restaurantName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-linear-to-t from-black/80 to-transparent">
          <Container>
            <div className="flex flex-col md:flex-row items-end gap-6">
              {/* Logo (Optional) */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-lg p-2 -mb-10 md:-mb-16 z-10 flex items-center justify-center">
                {/* If you have logo, put here. Else first letter */}
                <span className="text-4xl font-bold text-primary">
                  {restaurant.restaurantName.charAt(0)}
                </span>
              </div>

              <div className="text-white flex-1">
                <h1 className="text-3xl md:text-5xl font-bold mb-2 flex items-center gap-2">
                  {restaurant.restaurantName}
                  <CheckCircle className="text-blue-400 fill-white" size={24} />
                </h1>
                <p className="opacity-90 flex items-center gap-2 text-sm md:text-base">
                  <MapPin size={16} /> {restaurant.location}
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* --- 2. Info Bar --- */}
      <div className="border-b border-base-200 bg-base-100 shadow-sm sticky top-0 z-20">
        <Container className={'px-0'}>
          <div className="flex flex-wrap gap-6 py-4 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <Utensils size={16} className="text-primary" />
              <span>{restaurant.cuisine?.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-primary" />
              <span>{restaurant.phone || "No Contact Info"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-warning fill-warning" />
              <span>{restaurant.averageRating} ({restaurant.totalReviews} Reviews)</span> {/* Static for now */}
            </div>
          </div>
        </Container>
      </div>

      {/* --- 3. Menu Section --- */}
      <Container className="mt-16">
        <SectionHeader
          heading={`Menu of ${restaurant.restaurantName}`}
          subHeading={`Explore ${menu.length} delicious items available here.`}
          badge="Menu Card"
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menu.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-base-200 rounded-xl">
              <p className="text-gray-500 text-lg">
                No items added to the menu yet.
              </p>
            </div>
          ) : (
            menu.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-md hover:shadow-xl border border-base-200 transition-all"
              >
                <figure className="h-48 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 badge badge-secondary font-bold shadow-sm">
                    ${item.price}
                  </div>
                </figure>
                <div className="card-body p-5">
                  <h3 className="card-title text-base font-bold">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="card-actions justify-end mt-3">
                    <Link
                      to={`/food-details/${item._id}`}
                      className="btn btn-sm btn-primary w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default RestaurantDetails;
