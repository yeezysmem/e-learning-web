// Rating.js
import React, { useState } from 'react';
import axios from 'axios';

const Rating = ({ courseId }) => {
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/rate-course', {
        courseId,
        rating,
      });
      console.log('Rating submitted successfully:', response.data);
      // Update course rating state here if needed
    } catch (error) {
      console.error('Error submitting rating:', error);
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
