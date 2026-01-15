import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import CardSkeleton from "../../../Components/CardSkeleton/CardSkeleton";

const TopRatedFoods = () => {
  const axiosPublic = useAxios();

  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["top-rated-foods"],
    queryFn: async () => {
      const res = await axiosPublic.get("/foods/top-rated");
      return res.data;
    },
  });
  console.log(foods);
  return (
    <section className="py-20">
      {/* Reusable Header */}
      <SectionHeader
        heading="Top Rated Foods"
        subHeading="The absolute best dishes curated by our community of food lovers."
        badge="Editor's Choice"
        icon={Star}
        badgeColor="text-warning"
        align="left"
      />

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? [...Array(8)].map((_, i) => <CardSkeleton key={i} />)
          : foods.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-base-200 group"
              >
                {/* Image Section */}
                <figure className="relative h-60 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Price Tag */}
                  <div className="absolute top-3 left-3 bg-base-100/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    ${item.price}
                  </div>
                  {/* Category Badge */}
                  <div className="absolute bottom-3 left-3 badge badge-primary font-medium">
                    {item.category}
                  </div>
                </figure>

                {/* Body Section */}
                <div className="card-body p-5">
                  <div className="flex justify-between items-start">
                    <h2 className="card-title text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                      {item.name}
                    </h2>
                    <div className="flex items-center gap-1 text-xs font-bold text-warning">
                      <Star size={14} fill="currentColor" />
                      <span>{item.averageRating || 5.0}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-2 mt-2">
                    {item.description}
                  </p>

                  <div className="divider my-2"></div>

                  <div className="card-actions justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-base-200 overflow-hidden">
                        {/* Ideally Restaurant Logo here */}
                        <StoreIcon size={14} className="m-1 text-gray-500" />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 truncate max-w-[100px]">
                        {item.restaurantName}
                      </span>
                    </div>

                    <Link
                      to={`/food-details/${item._id}`}
                      className="btn btn-sm btn-circle btn-primary text-white shadow-md group-hover:scale-110 transition-transform"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link to="/all-foods" className="btn btn-outline btn-wide rounded-full">
          View Full Menu
        </Link>
      </div>
    </section>
  );
};

// Simple Store Icon Component
const StoreIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
  </svg>
);

export default TopRatedFoods;
