import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Utensils,
  DollarSign,
  Image as ImageIcon,
  FileText,
  ChefHat,
  UploadCloud,
} from "lucide-react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { uploadImage } from "../../../../utils";
import { useState } from "react";
import Spinner from "../../../../Components/Spinner/Spinner";

const AddFood = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submitLoadign, setSubmitLoadign] = useState(false);

  // 1. Fetch Restaurant Info
  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["my-restaurant", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/restaurants/seller/${user.email}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setSubmitLoadign(true);

    try {
      const imageUrl = await uploadImage(data.image[0]);

      const foodItem = {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        description: data.description,
        image: imageUrl,
        restaurantId: restaurant._id,
        restaurantName: restaurant.restaurantName,
        location: restaurant.location,
        sellerEmail: user.email,
        addedAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/menu", foodItem);

      if (res.data.insertedId) {
        toast.success(`${data.name} added successfully! 🥘`);
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add food. Please try again.");
    } finally {
      setSubmitLoadign(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center h-[calc(100vh-150px)] items-center">
        <Spinner />
      </div>
    );

  if (!restaurant)
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
        <Utensils size={48} className="text-gray-300" />
        <h3 className="text-xl font-bold text-gray-500">No Restaurant Found</h3>
        <p>Please register your restaurant first.</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content flex items-center gap-2">
            <ChefHat className="text-primary size-8" />
            Add New Menu Item
          </h1>
          <p className="text-base-content/60 mt-1">
            Adding to{" "}
            <span className="font-bold text-primary">{restaurant.name}</span>
          </p>
        </div>
        {/* Optional: Restaurant Badge/Status */}
        <div className="badge badge-primary badge-outline gap-2 py-3 px-4">
          Restaurant Verified
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Image Upload Area */}
            <div className="lg:col-span-1">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <ImageIcon size={16} /> Food Image
                  </span>
                </div>
                <div className="border-2 border-dashed border-base-300 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors h-72 flex flex-col items-center justify-center cursor-pointer group relative">
                  <input
                    {...register("image", {
                      required: "Food image is required",
                      validate: {
                        size: (files) =>
                          files[0]?.size < 2 * 1024 * 1024 ||
                          "Image must be under 2MB",
                        type: (files) =>
                          ["image/jpeg", "image/png", "image/jpg"].includes(
                            files[0]?.type
                          ) || "Only JPG, PNG allowed",
                      },
                    })}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="group-hover:scale-110 transition-transform duration-300 flex flex-col items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-3 text-primary">
                      <UploadCloud size={32} />
                    </div>
                    <p className="text-sm font-medium text-base-content/70">
                      Click to upload image
                    </p>
                    <p className="text-xs text-base-content/40 mt-1">
                      SVG, PNG, JPG (Max 2MB)
                    </p>
                  </div>
                </div>
              </label>
              {errors.image && (
                <span className="text-error text-xs mt-1">
                  {errors.image.message}
                </span>
              )}
            </div>

            {/* Right Column: Input Fields */}
            <div className="lg:col-span-2 space-y-5">
              {/* Row 1: Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <Utensils size={16} /> Food Name
                  </span>
                </label>
                <input
                  {...register("name", {
                    required: "Food name is required",
                    minLength: { value: 3, message: "Minimum 3 characters" },
                  })}
                  type="text"
                  placeholder="e.g. Sultan's Special Kacchi"
                  className="input input-bordered w-full focus:input-primary transition-all bg-base-200/30 focus:bg-base-100"
                />
                {errors.name && (
                  <span className="text-error text-xs mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Row 2: Price & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <DollarSign size={16} /> Price (Tk)
                    </span>
                  </label>
                  <input
                    {...register("price", {
                      required: "Price is required",
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Enter a valid number",
                      },
                    })}
                    type="text"
                    placeholder="450"
                    className="input input-bordered w-full focus:input-primary bg-base-200/30 focus:bg-base-100"
                  />
                  {errors.price && (
                    <span className="text-error text-xs mt-1">
                      {errors.price.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <ChefHat size={16} /> Category
                    </span>
                  </label>
                  <select
                    {...register("category", {
                      required: "Please select a category",
                    })}
                    className="select select-bordered w-full focus:select-primary bg-base-200/30 focus:bg-base-100"
                  >
                    <option value={""} disabled selected>
                      Select Category
                    </option>
                    {restaurant.cuisine.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="Others">Others</option>
                  </select>
                  {errors.category && (
                    <span className="text-error text-xs mt-1">
                      {errors.category.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 3: Description */}
              <div className="form-control flex flex-col gap-2">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FileText size={16} /> Recipe / Description
                  </span>
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 characters",
                    },
                  })}
                  className="textarea textarea-bordered h-32 focus:textarea-primary bg-base-200/30 focus:bg-base-100 resize-none text-base w-full"
                  placeholder="Describe the ingredients, taste, and portion size..."
                ></textarea>
                {errors.description && (
                  <span className="text-error text-xs mt-1">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Footer: Action Buttons */}
          <div className="divider my-6"></div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-ghost hover:bg-base-200"
            >
              Clear Form
            </button>
            {
              <button
                type="submit"
                className="btn btn-primary px-8 text-lg shadow-lg hover:shadow-primary/30 transition-shadow"
              >
                {submitLoadign ? (
                  <span className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Loading...</span>
                  </span>
                ) : (
                  "Publish Item"
                )}
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
