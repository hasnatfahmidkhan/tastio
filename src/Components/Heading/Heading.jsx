import React from "react";

const Heading = ({ title = "", subtitle = "", className = "" }) => {
  return (
    <h2 className={`text-4xl md:text-5xl font-bold text-primary ${className}`}>
      {title} <span className="text-base-content">{subtitle}</span>
    </h2>
  );
};

export default Heading;
