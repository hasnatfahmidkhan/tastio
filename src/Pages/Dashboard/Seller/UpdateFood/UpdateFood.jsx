import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import {
  Utensils,
  DollarSign,
  Image as ImageIcon,
  FileText,
  ChefHat,
  Save,
} from "lucide-react";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [updateLoadign, setUpdateLoadign] = useState(false);

  // ১. নির্দিষ্ট খাবারের ডাটা লোড করা
  const { data: food, isLoading } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/menu/${id}`);
      return res.data;
    },
  });

  // ২. ডাটা লোড হওয়ার পর ফর্মে ডিফল্ট ভ্যালু সেট করা
  useEffect(() => {
    if (food) {
      reset({
        name: food.name,
        price: food.price,
        category: food.category,
        description: food.description,
      });
    }
  }, [food, reset]);

  const onSubmit = async (data) => {
    setUpdateLoadign(true);
    try {
      const imageUrl = food.image;

      const updatedItem = {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        description: data.description,
        image: imageUrl,
      };

      const res = await axiosSecure.patch(`/menu/${id}`, updatedItem);
      if (res.data.modifiedCount > 0) {
        toast.success(`${data.name} updated successfully! ✅`);
        navigate("/dashboard/my-foods");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add food. Please try again.");
    } finally {
      setUpdateLoadign(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-base-content mb-6 flex items-center gap-2">
        <EditIcon className="text-primary" /> Update Item
      </h1>

      <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Current Image Preview */}
            <div className="lg:col-span-1">
              <label className="label font-bold text-gray-500">
                Current Image
              </label>
              <div className="rounded-xl overflow-hidden border border-base-300 shadow-sm">
                <img
                  loading="lazy"
                  src={food.image}
                  alt="Food"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-warning">
                  Note: Image update feature coming soon
                </p>
              </div>
            </div>

            {/* Right Column: Input Fields */}
            <div className="lg:col-span-2 space-y-5">
              {/* Row 1: Name */}
              <div className="form-control">
                <label className="label font-semibold flex gap-2">
                  <Utensils size={16} /> Food Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="input input-bordered w-full focus:input-primary bg-base-200/30"
                />
              </div>

              {/* Row 2: Price & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label className="label font-semibold flex gap-2">
                    <DollarSign size={16} /> Price
                  </label>
                  <input
                    {...register("price", { required: true })}
                    type="number"
                    className="input input-bordered w-full focus:input-primary bg-base-200/30"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-semibold flex gap-2">
                    <ChefHat size={16} /> Category
                  </label>
                  <select
                    {...register("category", { required: true })}
                    className="select select-bordered w-full focus:select-primary bg-base-200/30"
                  >
                    <option disabled>Select Category</option>
                    <option>Biryani</option>
                    <option>Burger</option>
                    <option>Pizza</option>
                    <option>Chinese</option>
                    <option>Dessert</option>
                    <option>Others</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Description */}
              <div className="form-control">
                <label className="label font-semibold flex gap-2">
                  <FileText size={16} /> Description
                </label>
                <textarea
                  {...register("description")}
                  className="textarea textarea-bordered h-32 w-full focus:textarea-primary bg-base-200/30 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Footer: Action Buttons */}
          <div className="divider my-6"></div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-foods")}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary px-8 text-lg"
              disabled={updateLoadign}
            >
              {updateLoadign ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span>Saving...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save size={18} />
                  <span>Save Changes</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// আইকন কম্পোনেন্ট (যদি Lucide থেকে ইমপোর্ট না করো)
const EditIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

export default UpdateFood;
