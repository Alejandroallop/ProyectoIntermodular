
import React from 'react';

const ReadOnlyStarRating: React.FC<{ rating: number | null }> = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={`text-xl ${index < (rating || 0) ? 'text-yellow-400' : 'text-gray-500'}`}>
            ★
          </span>
        ))}
      </div>
    );
};

export default ReadOnlyStarRating;
