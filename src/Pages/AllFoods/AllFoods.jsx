import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Search, Utensils } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import Container from "../../Components/Container/Container";

const AllFoods = () => {
  const axiosInstance = useAxios();
  const [searchParams, setSearchParams] = useSearchParams();

  // --- State Initialization ---
  const initialCategory = searchParams.get("category") || "All";
  const querySearch = searchParams.get("search");

  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(querySearch || "");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const limit = 9;
  const [priceRange] = useState([0, 10000]);

  // --- Fetch Categories ---
  const { data: categoryList = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/categories");
      return res.data;
    },
  });

  // --- Fetch Foods ---
  const { data, isLoading } = useQuery({
    queryKey: ["all-foods", search, category, sort, page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-foods`, {
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

  // --- Handlers ---
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setPage(1);
    setSearchParams((prev) => {
      prev.set("category", newCategory);
      return prev;
    });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* --- HERO HEADER --- */}
      <div className="relative bg-gray-900 text-white py-20 mb-16">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070&auto=format&fit=crop"
            alt="Food Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/30 via-black/10 to-transparent"></div>
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            {/* Left Text */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-1.5 rounded-full text-primary font-bold uppercase tracking-wider text-sm mb-4 animate-fade-in">
                <Utensils size={18} /> Discover Menu
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                Explore <span className="text-primary">Authentic</span> <br />{" "}
                Local Dishes
              </h1>
              <p className="text-gray-300 text-lg max-w-lg">
                From spicy street food to premium dining, find exactly what you
                are craving today.
              </p>
            </div>

            {/* Right Search Box (Floating) */}
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-2xl text-base-content">
              <label className="label font-bold text-gray-500 uppercase text-xs tracking-wider">
                Search for food
              </label>
              <div className="relative mb-4">
                <Search
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="e.g. Biryani, Burger..."
                  className="input input-bordered w-full pl-12 h-12 rounded-lg bg-base-200 transition-colors"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label font-bold text-gray-500 uppercase text-xs tracking-wider">
                    Category
                  </label>
                  <select
                    className="select select-bordered w-full rounded-lg bg-base-200 focus:bg-white"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    <option value="All">All Items</option>
                    {categoryList.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label font-bold text-gray-500 uppercase text-xs tracking-wider">
                    Sort By
                  </label>
                  <select
                    className="select select-bordered w-full rounded-lg bg-base-200 focus:bg-white"
                    value={sort}
                    onChange={handleSortChange}
                  >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low</option>
                    <option value="price-desc">Price: High</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* --- CONTENT GRID --- */}
      <Container>
        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton h-80 rounded-2xl w-full"></div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && foods.length === 0 && (
          <div className="text-center py-20 bg-base-200/50 rounded-3xl border border-dashed border-base-300">
            <h3 className="text-2xl font-bold text-gray-400">
              No food found! 😢
            </h3>
            <p className="text-gray-500 mt-2">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* Food Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-base-200 group"
            >
              <figure className="relative h-60 overflow-hidden">
                <img 
                  loading="lazy"
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 badge badge-primary font-bold shadow-md">
                  ${item.price}
                </div>
                <div className="absolute bottom-3 left-3 badge badge-neutral text-xs font-medium">
                  {item.category}
                </div>
              </figure>
              <div className="card-body p-6">
                <h2 className="card-title text-xl font-bold justify-between">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-2 mt-1 mb-4">
                  {item.description}
                </p>

                <div className="card-actions justify-between items-center pt-4 border-t border-base-200">
                  <span className="text-xs font-semibold text-gray-400 truncate max-w-[120px]">
                    {item.restaurantName || "Tastio Seller"}
                  </span>
                  <Link
                    to={`/food-details/${item._id}`}
                    className="btn btn-sm btn-outline btn-primary px-6 rounded-full group-hover:btn-active"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {!isLoading && foods.length > 0 && (
          <div className="flex justify-center mt-16 gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="btn btn-outline rounded-full px-6"
            >
              Prev
            </button>
            <div className="join">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`join-item btn ${
                      page === pageNum ? "btn-primary text-white" : "btn-ghost"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="btn btn-outline rounded-full px-6"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllFoods;
