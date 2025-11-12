const Container = ({ className, children }) => {
  return (
    <div className={`${className} max-w-7xl mx-auto px-4 py-8 md:py-10`}>
      {children}
    </div>
  );
};

export default Container;
