import React from "react";
import { Prisma } from "@prisma/client";

interface RestaurantResultsProps {
  Positive: string[];
  Negative: string[];
  Score: number;
}

const RestaurantResults: React.FC<RestaurantResultsProps> = ({ results }) => {
  console.log(results);
  if (!results) {
    return <div>No results available.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 h-96">
      <div className="overflow-y-auto">
        {results.Positive.map((result) => (
          <div className="col-span-1 p-10 my-4 bg-green-100 rounded-lg">
            {result}
          </div>
        ))}
      </div>
      <div className="overflow-y-auto">
        {results.Negative.map((result) => (
          <div className="col-span-1 p-10 my-4 bg-red-100 rounded-lg">
            {result}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantResults;
