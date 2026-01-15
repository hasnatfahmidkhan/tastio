import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";
import { uploadImage } from "../../../../utils";

const ManageCategories = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const [uploading, setUploading] = useState(false);

  // --- 1. Fetch Categories ---
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    },
  });

  // --- 2. Add Category Mutation ---
  const { mutateAsync: addCategory } = useMutation({
    mutationFn: async (data) => await axiosSecure.post("/categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("Category Added Successfully!");
      reset();
      setUploading(false);
    },
    onError: () => {
      toast.error("Failed to add category");
      setUploading(false);
    },
  });

  // --- 3. Delete Mutation ---
  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/categories/${id}`);
          queryClient.invalidateQueries(["categories"]);
          Swal.fire("Deleted!", "Category has been deleted.", "success");
        } catch (err) {
          toast.error("Failed to delete");
        }
      }
    });
  };

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      // Image Upload to ImgBB

      const imageUrl = await uploadImage(data.image[0]);

      await addCategory({
        name: data.name,
        image: imageUrl,
      });
    } catch (error) {
      toast.error("Image upload failed");
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Manage Categories</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- ADD FORM SECTION --- */}
        <div className="lg:col-span-1 bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Plus className="bg-primary text-white rounded-full p-1 w-6 h-6" />{" "}
            Add New Category
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label font-semibold">Category Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="e.g. Sushi"
                className="input input-bordered w-full focus:input-primary"
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">Cover Image</label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input file-input-bordered w-full file-input-primary"
              />
            </div>
            <button
              disabled={uploading}
              className="btn btn-primary w-full mt-4 text-lg"
            >
              {uploading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Add Category"
              )}
            </button>
          </form>
        </div>

        {/* --- LIST SECTION --- */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-10 bg-base-100 rounded-2xl border border-dashed border-base-300">
              <p className="text-gray-400">No categories found. Add one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="relative group bg-base-100 border border-base-200 p-6 rounded-xl flex flex-col items-center hover:shadow-lg transition-all hover:border-primary/30"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-full p-1 border-2 border-base-200 mb-3 group-hover:border-primary transition-colors">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {/* Text */}
                  <h4 className="font-bold text-lg text-center">{cat.name}</h4>
                  <span className="text-xs font-semibold bg-base-200 px-2 py-1 rounded-full mt-2 text-gray-500">
                    {cat.count || 0} Foods
                  </span>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(cat._id, cat.name)}
                    className="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost text-error opacity-0 group-hover:opacity-100 transition-all hover:bg-error/10"
                    title="Delete Category"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
