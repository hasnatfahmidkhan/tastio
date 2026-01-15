import { MoreHorizontal, MessageCircle, Share2, Heart } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function PostCard({ post, toggleLike }) {
  const { user } = useAuth();
  return (
    <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img loading="lazy" src={post.userPhoto} alt="user" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm">{post.userName}</h4>
            <p className="text-xs text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <button className="btn btn-ghost btn-circle btn-sm">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="text-base-content/90 whitespace-pre-wrap">
          {post.caption}
        </p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="mt-2 bg-base-200">
          <img
            loading="lazy"
            src={post.image}
            alt="food"
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4 flex items-center justify-between border-t border-base-200 mt-2">
        <div className="flex gap-4">
          <button
            onClick={() => toggleLike(post._id)}
            className={`flex items-center gap-2 btn btn-ghost btn-sm ${
              post.likes?.includes(user?.email)
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            <Heart
              size={20}
              className={
                post.likes?.includes(user?.email) ? "fill-current" : ""
              }
            />
            <span>{post.likes?.length || 0}</span>
          </button>
          <button className="flex items-center gap-2 btn btn-ghost btn-sm text-gray-500">
            <MessageCircle size={20} />
            <span>Comment</span>
          </button>
        </div>
        <button className="btn btn-ghost btn-circle btn-sm text-gray-500">
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
}
