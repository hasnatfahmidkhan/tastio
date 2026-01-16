import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  ImagePlus,
  Send,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { uploadImage } from "../../utils";
import PostCard from "../../Components/PostCard/PostCard";

const Feed = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const [uploading, setUploading] = useState(false);

  // 1. Fetch All Posts
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/posts");
      return res.data;
    },
  });

  // 2. Post Mutation
  const { mutateAsync: createPost } = useMutation({
    mutationFn: async (newPost) => {
      return await axiosSecure.post("/posts", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post shared successfully! 🎉");
      reset();
      setUploading(false);
    },
  });

  // 3. Like Mutation
  const { mutateAsync: toggleLike } = useMutation({
    mutationFn: async (postId) => {
      return await axiosSecure.patch(`/posts/like/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      // Image Upload to ImgBB
      const imageUrl = await uploadImage(data.image[0]);

      const postData = {
        userEmail: user.email,
        userName: user.displayName,
        userPhoto: user.photoURL,
        caption: data.caption,
        image: imageUrl,
        likes: [], // Array of emails who liked
        date: new Date().toISOString(),
      };

      await createPost(postData);
    } catch (error) {
      toast.error("Failed to post");
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 mt-20">
      {/* --- CREATE POST SECTION --- */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 mb-8">
        <div className="flex gap-4">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full">
              <img loading="lazy" src={user?.photoURL} alt="user" />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
            <textarea
              {...register("caption", { required: true })}
              className="textarea textarea-ghost w-full text-lg resize-none focus:bg-base-200/50 min-h-[100px]"
              placeholder={`What did you eat today, ${
                user?.displayName?.split(" ")[0]
              }? 🍔`}
            ></textarea>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-200">
              <label className="btn btn-ghost btn-sm gap-2 text-primary hover:bg-primary/10">
                <ImagePlus size={20} />
                <span className="hidden sm:inline">Add Photo</span>
                <input
                  {...register("image")}
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>

              <button
                disabled={uploading}
                className="btn btn-primary btn-sm px-6 rounded-full"
              >
                {uploading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <Send size={16} /> Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* --- FEED SECTION --- */}
      <div className="space-y-6">
        {isLoading ? (
          // Skeleton Loading
          [1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-4 w-full">
              <div className="skeleton h-64 w-full rounded-2xl"></div>
            </div>
          ))
        ) : posts.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No posts yet. Be the first to share!
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} toggleLike={toggleLike} />
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
