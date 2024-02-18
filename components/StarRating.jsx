import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    let stars = [];

    for (let i = 0; i < maxStars; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} />);
      } else if (hasHalfStar && i === fullStars) {
        stars.push(<FaStarHalfAlt key="half" />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }

    return stars;
  };

  return <div className="flex items-center">{renderStars()}</div>;
};

export default StarRating;
