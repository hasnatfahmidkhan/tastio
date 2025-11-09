import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const AddReview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleAddReview = (data) => {
    axiosSecure
      .post("/reviews", {
        ...data,
        postedAt: new Date().toISOString(),
        reviewerName: user?.displayName,
        reviewerEmail: user?.email,
      })
      .then(({ data }) => {
        if (data.insertedId) {
          toast.success("Review Added Succesfully");
          reset();
        }
      });
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)]">
      <div className="mb-3 space-y-1">
        <h3 className="text-4xl text-base-content font-bold">
          <span className="text-primary">Add</span> Review
        </h3>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-full gap-1.5 cursor-pointer hover:text-base-300 transition-colors duration-200 font-medium tracking-wide "
        >
          <FaArrowLeft />
          <span>Back To Reviews</span>
        </button>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 p-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100">
        <form onSubmit={handleSubmit(handleAddReview)}>
          <fieldset className="fieldset p-2 gap-4">
            <div>
              <label className="label text-sm">Food Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Food Name"
                {...register("foodName", {
                  required: "Food name is required",
                  minLength: {
                    value: 3,
                    message: "Food name at least 3 char",
                  },
                })}
              />
              {errors.foodName && (
                <p className="form-error-msg">{errors.foodName.message}</p>
              )}
            </div>
            <div>
              <label className="label text-sm">Food Image</label>
              <input
                type="text"
                className="form-input"
                placeholder="Food Image"
                {...register("photo", { required: "Food image is required" })}
              />
              {errors.photo && (
                <p className="form-error-msg">{errors.photo.message}</p>
              )}
            </div>
            <div>
              <label className="label text-sm">Restaurant Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Restaurant Name"
                {...register("restaurantName", {
                  required: "Restaurant name is required",
                  minLength: {
                    value: 5,
                    message: "Restaurant name at least 5 char",
                  },
                })}
              />
              {errors.restaurantName && (
                <p className="form-error-msg">
                  {errors.restaurantName.message}
                </p>
              )}
            </div>
            <div>
              <label className="label text-sm">Location</label>
              <input
                type="text"
                className="form-input"
                placeholder="Location"
                {...register("location", {
                  required: "Location is required",
                  minLength: {
                    value: 5,
                    message: "Location at least 5 char",
                  },
                })}
              />
              {errors.location && (
                <p className="form-error-msg">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="label text-sm">Rating</label>
              <input
                type="text"
                className="form-input"
                placeholder="Rating out of 5"
                {...register("rating", {
                  required: "Rating is requied",
                  pattern: {
                    value: /^(?:[0-4](?:\.[0-9])?|5(?:\.0)?)$/,
                    message: "Rating must be number and it's out of 5",
                  },
                })}
              />
              {errors.rating && (
                <p className="form-error-msg">{errors.rating.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="label text-sm">Review Text</label>
              <textarea
                rows={6}
                className="border border-gray-300 rounded-sm focus:border-primary focus:outline-none p-3 text-sm"
                placeholder="Review Text"
                {...register("reviewText", {
                  required: "Review Text is required",
                  minLength: {
                    value: 20,
                    message: "Review text at least 20 char",
                  },
                })}
              ></textarea>
              {errors.reviewText && (
                <p className="form-error-msg">{errors.reviewText.message}</p>
              )}
            </div>

            <button className="btn btn-primary mt-2">
              {isSubmitting ? "Adding Review..." : "Add Review"}
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default AddReview;
