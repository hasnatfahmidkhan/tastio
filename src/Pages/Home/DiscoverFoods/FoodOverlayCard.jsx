import { Star } from "lucide-react";
import { Link } from "react-router";

const FoodOverlayCard = ({ item }) => {
  return (
    <Link
      to={`/food-details/${item._id}`}
      className="group block relative rounded-2xl overflow-hidden h-80 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Background Image */}
      <img
        loading="lazy"
        src={item.image}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-colors duration-300" />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
        {/* Category */}
        <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {item.category}
        </span>

        {/* Rating */}
        <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
          <Star size={12} className="text-warning fill-warning" />
          {item.averageRating > 0 ? item.averageRating.toFixed(1) : "New"}
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-white font-bold text-xl leading-tight mb-1 drop-shadow-lg group-hover:translate-x-1 transition-transform duration-300">
          {item.name}
        </h3>

        {item.description && (
          <p className="text-white/70 text-sm line-clamp-2 mb-3">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-extrabold text-white drop-shadow-lg">
            ${item.price}
          </span>
          <span className="text-white/60 text-xs font-medium">
            By {item.restaurantName || "Tastio Seller"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FoodOverlayCard;
