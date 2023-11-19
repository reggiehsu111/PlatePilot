import React from "react";

interface RestaurantResultsProps {
  Positive: string[] | null;
  Negative: string[] | null;
  Score: number | null;
}

const RestaurantResults: React.FC<RestaurantResultsProps> = ({
  Positive,
  Negative,
  Score,
}) => {
  return (
    <div>
      <div className="text-center">Score:{Score}</div>
      <div className="grid grid-cols-2 gap-4 h-96">
        <div className="overflow-y-auto">
          {!Positive && (
            <div className="text-center text-lg"> No Results Found</div>
          )}
          {Positive &&
            Positive.map((result) => (
              <div
                key={result}
                className="col-span-1 p-10 my-4 bg-green-100 rounded-lg"
              >
                {result}
              </div>
            ))}
        </div>
        <div className="overflow-y-auto">
          {!Negative && (
            <div className="text-center text-lg"> No Results Found</div>
          )}
          {Negative &&
            Negative.map((result) => (
              <div
                key={result}
                className="col-span-1 p-10 my-4 bg-red-100 rounded-lg"
              >
                {result}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantResults;
