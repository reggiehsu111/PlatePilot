import { FaStar, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  stars: number;
  outOf?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ stars, outOf = 5 }) => {
  const fullStars = Math.floor(stars);
  const partialStarPercentage = (stars % 1) * 100;
  const emptyStars = outOf - fullStars;

  return (
    
    <div className="flex text-3xl">
      {/* Full Stars */}
      {Array(fullStars).fill(0).map((_, index) => (
        <FaStar key={index} className="text-yellow-400" />
      ))}

      {/* Partial Star */}
      {partialStarPercentage > 0 && (
        <div
          className="text-yellow-400"
          style={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <FaRegStar className="absolute" />
          <FaStar
            className="absolute"
            style={{
              clipPath: `polygon(0 0, ${partialStarPercentage}% 0, ${partialStarPercentage}% 100%, 0 100%)`,
            }}
          />
        </div>
      )}

      {/* Empty Stars */}
      {Array(emptyStars).fill(0).map((_, index) => (
        
        <FaRegStar key={index} className="text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;
