import React from "react";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";


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
    <div className="h-96">
      {reviews.map((review) => (
        <div className="p-10 my-4 bg-indigo-100 rounded-lg" key={review.id}>
          {review.text}
        </div>
      ))}
    </div>
  );
};

export default RestaurantReviews;
