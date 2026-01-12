import {
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share2,
  Globe,
} from "lucide-react";

export default function PostCard() {
  return (
    <div>
      <div className="w-full max-w-[680px] bg-[#242526] rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start gap-3 p-4">
          <img src="/profile.png" className="w-12 h-12 rounded-full" alt="" />
          <div className="flex-1">
            <h4 className="text-white font-semibold leading-none">
              Find Web Developer ( Bangladesh )
            </h4>
            <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
              Aminul Zisan · 22h <Globe size={14} />
            </p>
          </div>
          <MoreHorizontal className="text-gray-400" />
        </div>

        {/* Post text */}
        <div className="px-4 pb-4 text-gray-200 text-sm leading-relaxed">
          <p>
            I recently built Zeeploy <br />A platform that lets you deploy
            websites, backends, bots, or apps just by connecting your GitHub, no
            complicated setup. Exactly like render/railway.
          </p>
        </div>

        {/* Image */}
        <div className="w-full bg-black">
          <img
            src="/image.jpg" // put your Zeepoy UI image here
            alt=""
            className="w-full object-cover"
          />
        </div>

        {/* Reactions */}
        <div className="flex justify-between px-4 py-3 text-gray-400 text-sm border-b border-gray-700">
          <span>👍 ❤️ 😮 93</span>
          <span>33 comments · 7 shares</span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 text-gray-300">
          <button className="flex items-center justify-center gap-2 py-3 hover:bg-white/5">
            <ThumbsUp size={18} /> Like
          </button>
          <button className="flex items-center justify-center gap-2 py-3 hover:bg-white/5">
            <MessageCircle size={18} /> Comment
          </button>
          <button className="flex items-center justify-center gap-2 py-3 hover:bg-white/5">
            <Share2 size={18} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
