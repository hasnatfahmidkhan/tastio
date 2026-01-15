import PropTypes from "prop-types";

const SectionHeader = ({
  heading,
  subHeading,
  badge,
  icon: Icon, // Rename prop to capital 'Icon' to use as component
  align = "left",
  badgeColor = "text-primary", // Default color
  children, // This will be the "See All" button or any right-side content
}) => {
  // Alignment classes
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col md:flex-row gap-4 mb-10 ${
        isCenter ? "" : "items-end"
      }`}
    >
      {/* --- Text Content --- */}
      <div
        className={`flex flex-col flex-1 ${
          isCenter ? "items-center" : "items-start"
        }`}
      >
        {/* Badge (Optional) */}
        {badge && (
          <div
            className={`flex items-center gap-2 font-bold uppercase tracking-wider mb-2 text-sm animate-pulse ${badgeColor}`}
          >
            {Icon && <Icon size={18} />}
            {badge}
          </div>
        )}

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-base-content leading-tight">
          {heading}
        </h2>

        {/* SubHeading */}
        {subHeading && (
          <p
            className={`text-gray-500 mt-2 text-base ${
              isCenter ? "max-w-2xl" : "max-w-lg"
            }`}
          >
            {subHeading}
          </p>
        )}
      </div>

      {/* --- Right Side Content (Buttons) --- */}
      {/* Only render if children exist and alignment is NOT center */}
      {!isCenter && children && <div className="mb-1 shrink-0">{children}</div>}
    </div>
  );
};

// PropTypes for validation (Optional but good)
SectionHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
  badge: PropTypes.string,
  icon: PropTypes.elementType,
  align: PropTypes.oneOf(["left", "center"]),
  badgeColor: PropTypes.string,
  children: PropTypes.node,
};

export default SectionHeader;
