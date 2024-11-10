import React, { useState } from 'react';
import axios from 'axios';

// Define the types for the props
interface RatingProps {
  courseId: string | number; // The courseId can be a string or a number depending on how it's used
}

const Rating = ({ courseId }: RatingProps) => {
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRating(parseInt(e.target.value));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/rate-course', {
        courseId,
        rating,
      });
    } catch (error) {
      // Handle error (optional)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rating">
      <select value={rating} onChange={handleRatingChange} disabled={isSubmitting}>
        <option value={0}>Select Rating</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <button onClick={handleSubmit} disabled={rating === 0 || isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Rating'}
      </button>
    </div>
  );
};

export default Rating;
