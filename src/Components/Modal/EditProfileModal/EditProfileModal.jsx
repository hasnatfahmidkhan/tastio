import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import { Camera, Save, X } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { uploadImage } from "../../../utils";

const EditProfileModal = ({ isOpen, onClose, refetch }) => {
  const { user, updateProfileFunc } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.displayName || "",
    },
  });

  const onSubmit = async (data) => {
    setUploading(true);
    const toastId = toast.loading("Updating profile...");

    try {
      let photoURL = user?.photoURL;
      if (data.image && data.image[0]) {
        photoURL = await uploadImage(data.image[0]);
      }
      // 2. Update Firebase Auth Profile
      await updateProfileFunc(data.name, photoURL);

      // 3. Update MongoDB User Document
      // Assuming you have a PATCH /users/:email route
      const updateData = {
        name: data.name,
        photo: photoURL,
      };

      // Note: Ensure your backend has a route like: app.patch('/users/:email', ...)
      // If you use ID, change this to `/users/${user.uid}` or similar.
      await axiosSecure.patch(`/users/${user?.email}`, updateData);

      toast.success("Profile updated successfully!", { id: toastId });
      refetch(); // Refetch profile data on parent page
      onClose(); // Close Modal
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-base-100 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-base-200 flex justify-between items-center bg-base-200/50">
          <h3 className="text-lg font-bold">Edit Profile</h3>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost hover:bg-base-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="avatar">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.photoURL}
                    alt="Current Profile"
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Camera Icon Overlay */}
              <label className="absolute bottom-0 right-0 bg-base-100 p-2 rounded-full shadow-md border border-base-200 cursor-pointer hover:bg-primary hover:text-white transition-colors">
                <Camera size={18} />
                <input
                  {...register("image")}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">Click icon to change photo</p>
          </div>

          {/* Name Input */}
          <div className="form-control">
            <label className="label font-semibold">Full Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input input-bordered w-full focus:input-primary"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              disabled={uploading}
              className="btn btn-primary w-full text-lg"
            >
              {uploading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <Save size={18} /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
