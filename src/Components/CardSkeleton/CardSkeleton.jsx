const CardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="skeleton h-52 md:h-60 w-full"></div>
      <div className="skeleton h-4 w-60"></div>
      <div className="skeleton h-4 w-40"></div>
      <div className="skeleton h-4 w-52"></div>
      <div className="skeleton h-4 w-52"></div>
      <div className="skeleton h-10 w-full"></div>
    </div>
  );
};

export default CardSkeleton;
