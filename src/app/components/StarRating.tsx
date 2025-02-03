import React from "react";

const StarRating = ({ rating }: { rating: number }) => {
  const maxStars = 5;

  return (
    <div className="flex text-yellow-400">
      {[...Array(maxStars)].map((_, index) => (
        <span key={index}>{index < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
};

export default StarRating;
