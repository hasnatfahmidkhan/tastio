import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const ReviewSection = ({ foodId, foodTitle, photo }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (!user) return toast.error("Please login first!");

    const review = {
      menuId: foodId,
      foodName: foodTitle,
      photo: photo,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      reviewerPhoto: user.photoURL,
      rating: parseInt(data.rating),
      reviewText: data.comment,
      postedAt: new Date().toISOString(),
    };

    const res = await axiosSecure.post("/reviews", review);
    if (res.data.insertedId) {
      toast.success("Review Added!");
      reset();
      // TODO: Refetch reviews here
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Reviews & Ratings</h3>

      {/* Review Form */}
      {user ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-200 p-6 rounded-xl mb-10"
        >
          <h4 className="font-bold mb-4">Write a Review</h4>
          <div className="form-control mb-4 flex flex-col">
            <label className="label">Rating</label>
            <select
              {...register("rating")}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
              <option value="4">⭐⭐⭐⭐ (Good)</option>
              <option value="3">⭐⭐⭐ (Average)</option>
              <option value="2">⭐⭐ (Bad)</option>
              <option value="1">⭐ (Terrible)</option>
            </select>
          </div>
          <div className="form-control mb-4">
            <textarea
              {...register("comment")}
              className="textarea textarea-bordered h-24"
              placeholder="Share your experience..."
            ></textarea>
          </div>
          <button className="btn btn-primary">Post Review</button>
        </form>
      ) : (
        <div className="alert alert-warning">
          Please Login to write a review.
        </div>
      )}

      {/* Display Reviews Logic can be added here later */}
    </div>
  );
};
export default ReviewSection;
