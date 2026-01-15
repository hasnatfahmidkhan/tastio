import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { MessageCircle, Heart, ArrowRight, Users } from "lucide-react";
import { Link } from "react-router";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";

const CommunityTeaser = () => {
  const axiosPublic = useAxios();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["latest-posts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/posts/latest");
      return res.data;
    },
  });

  if (isLoading) return null;

  return (
    <section className="py-20 container mx-auto px-4">
      {/* Header */}
      <SectionHeader
        heading="Community Moments"
        subHeading="See what foodies are eating right now. Join the conversation!"
        badge="Live Feed"
        icon={Users}
        align="center"
      />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {posts.map((post) => (
          <div
            key={post._id}
            className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-base-200"
          >
            {/* User Header */}
            <div className="flex items-center gap-3 p-4 pb-2">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                  <img loading="lazy" src={post.userPhoto} alt="user" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-sm">{post.userName}</h4>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
            </div>

            {/* Caption */}
            <div className="px-4 py-2">
              <p className="text-sm text-gray-600 line-clamp-2 italic">
                "{post.caption}"
              </p>
            </div>

            {/* Image (If exists) */}
            {post.image && (
              <figure className="h-56 w-full overflow-hidden">
                <img
                  loading="lazy"
                  src={post.image}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              </figure>
            )}

            {/* Footer Stats */}
            <div className="p-4 border-t border-base-200 flex justify-between items-center text-gray-500 text-sm">
              <div className="flex gap-4">
                <span className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Heart size={16} /> {post.likes?.length || 0}
                </span>
                <span className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <MessageCircle size={16} /> Comment
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Link to="/feed" className="btn btn-outline btn-wide rounded-full">
          View All Posts
        </Link>
      </div>
    </section>
  );
};

export default CommunityTeaser;
