import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    let stars = [];
    //added this if statement so it will render 0 stars on the gamecard
    if (rating === 0) {
      for (let i = 0; i < maxStars; i++) {
        stars.push(<FaRegStar key={i} />);
      }
    } else {
      for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={i} />);
      }
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
      for (let i = fullStars + 1; i < maxStars; i++) {
        stars.push(<FaRegStar key={i} />);
      }
    } else {
      for (let i = fullStars; i < maxStars; i++) {
        stars.push(<FaRegStar key={i} />);
      }
    }

    return stars;
  };

  return <div className="flex items-center">{renderStars()}</div>;
};

export default StarRating;
