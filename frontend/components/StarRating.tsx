
import React, { useState } from 'react';

interface StarRatingProps {
  rating: number | null;
  onRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRating }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={ratingValue}
            className={`text-2xl transition-colors duration-200 ${
              ratingValue <= ((hover || rating) ?? 0) ? 'text-yellow-400' : 'text-gray-500'
            }`}
            onClick={() => onRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
   