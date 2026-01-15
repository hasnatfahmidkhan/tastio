import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, ArrowRight, Utensils, ChefHat } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import Container from "../../Components/Container/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllRestaurants = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: restaurants = [], isLoading } = useQuery({
    queryKey: ["all-restaurants-public", search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/restaurants?status=verified&search=${search}`
      );
      return res.data;
    },
  });

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* --- HERO HEADER --- */}
      <div className="relative bg-base-900 text-white py-20 mb-16">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop"
            alt="Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-base-100"></div>
        </div>

        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-1.5 rounded-full text-primary font-bold uppercase tracking-wider text-sm mb-6 animate-fade-in">
            <ChefHat size={18} /> Partner Restaurants
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Find the Best <span className="text-primary">Stalls</span> <br /> in
            Your City
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Explore curated lists of top restaurants, cafes, and street food
            stalls based on trends.
          </p>

          {/* Floating Search Bar */}
          <div className="max-w-3xl mx-auto bg-white p-2 rounded-full shadow-2xl flex items-center transform transition-transform focus-within:scale-105">
            <div className="pl-6 text-gray-400">
              <Search size={24} />
            </div>
            <input
              type="text"
              placeholder="Search by name, location, or cuisine..."
              className="flex-1 w-full bg-transparent p-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none rounded-r-full"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="hidden md:block btn btn-primary rounded-full px-8 text-lg h-14 min-h-0">
              Search
            </button>
          </div>
        </Container>
      </div>

      {/* --- CONTENT GRID --- */}
      <Container>
        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton h-80 rounded-2xl w-full"></div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && restaurants.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-base-200/50 rounded-3xl border border-dashed border-base-300">
            <div className="bg-base-100 p-6 rounded-full shadow-sm mb-4">
              <Utensils size={48} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-400">
              No restaurants match your search
            </h3>
            <p className="text-gray-500 mt-2">
              Try searching for 'Dhanmondi' or 'Burger'
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((res) => (
            <Link
              key={res._id}
              to={`/restaurant/${res._id}`}
              className="group h-full"
            >
              <div className="card bg-base-100 border border-base-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full overflow-hidden">
                {/* Image */}
                <figure className="h-64 relative overflow-hidden">
                  <img
                    src={res.restaurantImage}
                    alt={res.restaurantName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>

                  <div className="absolute bottom-5 left-5 text-white pr-4">
                    <h3 className="text-2xl font-bold mb-1 leading-tight group-hover:text-primary transition-colors">
                      {res.restaurantName}
                    </h3>
                    <p className="text-sm text-gray-300 flex items-center gap-1.5 font-medium">
                      <MapPin size={14} className="text-primary" />{" "}
                      {res.location}
                    </p>
                  </div>
                </figure>

                {/* Body */}
                <div className="card-body p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {res.cuisine?.slice(0, 3).map((c, i) => (
                      <span
                        key={i}
                        className="badge badge-ghost border-base-300 bg-base-200/50 text-xs font-semibold"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-base-200 flex justify-between items-center text-sm font-medium text-gray-500 group-hover:text-primary transition-colors">
                    <span>Visit Restaurant</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllRestaurants;
