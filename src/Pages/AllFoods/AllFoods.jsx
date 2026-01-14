import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, Star } from "lucide-react";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import Heading from "../../Components/Heading/Heading";

const AllFoods = () => {
  // State Management for Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const limit = 9; // Per page items

  const axiosInstance = useAxios();
  // Fetch Data with Filters
  const { data, isLoading } = useQuery({
    queryKey: ["all-foods", search, category, sort, page, priceRange],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-foods`, {
        // at backend these all are get by query
        params: {
          search,
          category,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sort,
          page,
          limit,
        },
      });
      return res.data;
    },
  });

  const foods = data?.result || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  // Reset Page on Filter Change
  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Heading className="mb-8" title="Explore" subtitle="All Foods" />

      {/* --- Filter & Search Section --- */}
      <div className="bg-base-200 p-6 rounded-2xl mb-10 shadow-sm border border-base-300">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for food..."
              className="input input-bordered w-full pl-10 focus:input-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter Group */}
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            {/* Category Filter */}
            <div className="relative">
              <select
                className="select select-bordered w-full md:w-auto pl-9"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Biryani">Biryani</option>
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Dessert">Dessert</option>
              </select>
              <Star className="absolute left-3 top-3 text-warning" size={18} />
            </div>
            {/* Sort Option */}
            <div className="relative">
              <select
                className="select select-bordered w-full md:w-auto pl-9"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <Filter
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Loading State --- */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton h-80 w-full rounded-2xl"></div>
          ))}
        </div>
      )}

      {/* --- Products Grid --- */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {foods.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-base-200"
            >
              <figure className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 badge badge-primary font-bold shadow-md">
                  ${item.price}
                </div>
              </figure>
              <div className="card-body">
                <h2 className="card-title justify-between">
                  {item.name}
                  <div className="badge badge-outline text-xs">
                    {item.category}
                  </div>
                </h2>
                <p className="text-gray-500 line-clamp-2 text-sm">
                  {item.description}
                </p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-xs text-gray-400 font-semibold">
                    By {item.restaurantName || "Tastio Seller"}
                  </span>
                  <Link
                    to={`/food-details/${item._id}`}
                    className="btn btn-primary btn-sm px-6"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- No Data Found --- */}
      {!isLoading && foods.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-gray-400">
            No food found! 😢
          </h3>
          <p>Try changing your filters.</p>
        </div>
      )}

      {/* --- Pagination --- */}
      <div className="flex justify-center mt-12 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="btn btn-outline"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`btn ${page === pageNum ? "btn-primary" : "btn-ghost"}`}
          >
            {pageNum}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="btn btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllFoods;
