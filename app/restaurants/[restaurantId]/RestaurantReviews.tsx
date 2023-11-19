import React from "react";
import { Prisma } from "@prisma/client";

interface Review {
  id: number;
  text: string;
  restaurantId: string;
}

interface RestaurantReviewsProps {
  reviews: Review[] | null;
}

const RestaurantReviews: React.FC<RestaurantReviewsProps> = ({ reviews }) => {
  console.log(reviews);
  if (!reviews || reviews.length === 0) {
    return <div>No reviews available.</div>;
  }

  return (
    <div>
      {reviews.map((review) => (
        <div key={`${review.restaurantId}-${review.id}`}>{review.text}</div>
      ))}
    </div>
  );
};

export default RestaurantReviews;
