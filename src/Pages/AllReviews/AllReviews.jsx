import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Search, Star, Filter, MessageCircle, ThumbsUp } from "lucide-react";
import useAxios from "../../hooks/useAxios";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import CardSkeleton from "../../Components/CardSkeleton/CardSkeleton";
import Container from "../../Components/Container/Container";
import noData from "../../assets/No-Data.json";
import Lottie from "lottie-react";

const AllReviews = () => {
  const axiosInstance = useAxios();

  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading } = useQuery({
    queryKey: ["all-reviews", search, rating, sort, page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-reviews`, {
        params: { search, rating, sort, page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const reviews = data?.result || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  useEffect(() => {
    setPage(1);
  }, [search, rating, sort]);

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* --- HERO HEADER --- */}
      <div className="relative bg-gray-900 text-white py-24 mb-12">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
            alt="Reviews Banner"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/30 via-black/10 to-transparent"></div>
        </div>

        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-white font-bold uppercase tracking-wider text-sm mb-6 animate-fade-in">
            <MessageCircle size={18} /> Community Feedback
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Read Honest Reviews <br /> from{" "}
            <span className="text-primary">Real Foodies</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Discover hidden gems, avoid bad meals, and join the conversation
            with thousands of other food lovers.
          </p>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 md:gap-16 text-center">
            <div>
              <h3 className="text-3xl font-bold">{data?.total || "0"}+</h3>
              <p className="text-sm opacity-70">Reviews</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">4.8</h3>
              <p className="text-sm opacity-70">Avg Rating</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">100%</h3>
              <p className="text-sm opacity-70">Authentic</p>
            </div>
          </div>
        </Container>
      </div>

      {/* --- MAIN CONTENT --- */}
      <Container className={"mt-32"}>
        {/* --- Filter Bar --- */}
        <div className="bg-base-100 p-4 md:p-6 rounded-2xl shadow-lg border border-base-200 -mt-20 relative z-20 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search food or comments..."
              className="input input-bordered w-full pl-12 h-12 focus:input-primary rounded-full bg-base-200/50 focus:bg-base-100 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select
                className="select select-bordered w-full pl-10 rounded-full h-12"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="All">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
              </select>
              <Star
                className="absolute left-3.5 top-3.5 text-warning"
                size={18}
              />
            </div>

            <div className="relative flex-1 md:flex-none">
              <select
                className="select select-bordered w-full pl-10 rounded-full h-12"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
              <Filter
                className="absolute left-3.5 top-3.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* --- Grid Content --- */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-20">
              <Lottie animationData={noData} loop={true} className="w-64" />
              <p className="text-xl font-bold text-gray-400 mt-4">
                No reviews found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}
        </div>

        {/* --- Pagination --- */}
        {!isLoading && reviews.length > 0 && (
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

export default AllReviews;
