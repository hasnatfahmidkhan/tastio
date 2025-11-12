const CardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="skeleton h-52 bg-gray-300 md:h-60 w-full"></div>
      <div className="skeleton h-4 w-60 bg-gray-300"></div>
      <div className="skeleton h-4 w-40 bg-gray-300"></div>
      <div className="skeleton h-4 w-52 bg-gray-300"></div>
      <div className="skeleton h-4 w-52 bg-gray-300"></div>
      <div className="skeleton h-10 w-full bg-gray-300"></div>
    </div>
  );
};

export default CardSkeleton;
