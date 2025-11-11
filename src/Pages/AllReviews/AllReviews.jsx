import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import CardSkeleton from "../../Components/CardSkeleton/CardSkeleton";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import { useState } from "react";

const AllReviews = () => {
  const axiosInstance = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm();
  const searchValue = watch("search");
  const getAllReviews = async () => {
    const url = searchTerm ? `/search?search=${searchTerm}` : "/reviews";
    const res = await axiosInstance.get(url);
    return res.status === 200 ? res.data : [];
  };

  const { data: reviews, isPending } = useQuery({
    queryKey: ["all-reviews", searchTerm],
    queryFn: getAllReviews,
  });

  const handleSearch = async ({ search }) => {
    const trimmed = search.trim();
    setSearchTerm(trimmed);
  };

  if (searchTerm && searchValue === "") {
    setSearchTerm("");
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-3 w-full ">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center">
          All <span className="text-base-content">Reviews</span>
        </h2>

        <form onSubmit={handleSubmit(handleSearch)} class="max-w-sm w-full">
          <div className="flex items-center gap-2">
            <label className="input focus-within:outline-none focus-within:border-primary">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                {...register("search")}
                type="search"
                required
                placeholder="Search"
              />
            </label>
            <button
              disabled={isSubmitting}
              type="submit"
              class="btn btn-primary"
            >
              {isSubmitting ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
        {isPending
          ? [...Array(reviews?.length || 9)].map((_, i) => (
              <CardSkeleton key={i} />
            ))
          : reviews?.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
      </div>
    </section>
  );
};

export default AllReviews;
