import React from "react";
import { Prisma } from "@prisma/client";

interface Review {
  id: int;
  text: string;
}

interface RestaurantReviewsProps {
  reviews: Review[];
}

const RestaurantReviews: React.FC<RestaurantReviewsProps> = ({ reviews }) => {
  console.log(reviews);
  const reviewArray = reviews as Prisma.JsonArray;
  return (
    <div>
      {reviewArray.map((review) => {
        <div>{review.text}</div>;
      })}
    </div>
  );
};

export default RestaurantReviews;
