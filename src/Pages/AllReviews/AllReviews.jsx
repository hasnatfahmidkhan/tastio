import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Search, Star, Filter } from "lucide-react";
import useAxios from "../../hooks/useAxios"; // Or useAxiosSecure if needed
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import CardSkeleton from "../../Components/CardSkeleton/CardSkeleton";
import Container from "../../Components/Container/Container";
import noData from "../../assets/No-Data.json";
import Lottie from "lottie-react";

const AllReviews = () => {
  const axiosInstance = useAxios();

  // --- State Management ---
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const limit = 8; // Items per page

  // --- Data Fetching ---
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-reviews", search, rating, sort, page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-reviews`, {
        params: {
          search,
          rating,
          sort,
          page,
          limit,
        },
      });

      return res.data;
    },
    keepPreviousData: true, // Prevents flickering during pagination
  });

  const reviews = data?.result || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, rating, sort]);

  return (
    <Container>
      <title>All Reviews | Tastio</title>

      <div className="py-8 space-y-8">
        {/* --- Header Section --- */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Community <span className="text-base-content">Reviews</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            See what others are saying about the best food in town.
          </p>
        </div>

        {/* --- Filter & Search Bar --- */}
        <div className="bg-base-200 p-6 rounded-2xl shadow-sm border border-base-300">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-1/3">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search food or comments..."
                className="input input-bordered w-full pl-10 focus:input-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter Group */}
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              {/* Rating Filter */}
              <div className="relative">
                <select
                  className="select select-bordered w-full md:w-auto pl-9"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="All">All Ratings</option>
                  <option value="5">5 Stars Only</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
                <Star
                  className="absolute left-3 top-3 text-warning"
                  size={18}
                />
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  className="select select-bordered w-full md:w-auto pl-9"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="rating-asc">Lowest Rated</option>
                </select>
                <Filter
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Content Section --- */}
        <div className="min-h-[400px]">
          {isLoading ? (
            // Loading Skeletons
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            // No Data Found
            <div className="flex flex-col justify-center items-center mt-10">
              <Lottie animationData={noData} loop={true} className="w-64" />
              <p className="text-xl font-bold text-gray-400 mt-4">
                No reviews found matching your criteria.
              </p>
            </div>
          ) : (
            // Reviews Grid
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}
        </div>

        {/* --- Pagination --- */}
        {!isLoading && reviews.length > 0 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="btn btn-outline"
            >
              Prev
            </button>

            {/* Simple Pagination Logic */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`btn ${
                    page === pageNum ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {pageNum}
                </button>
              )
            )}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="btn btn-outline"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllReviews;
