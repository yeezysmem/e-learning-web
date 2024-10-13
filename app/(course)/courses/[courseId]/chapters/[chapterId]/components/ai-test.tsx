"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OpenAI } from 'openai';

const RecommendationGenerator = () => {
  const [recommendations, setRecommendations] = useState([]);

    // Function to fetch personalized recommendations from ChatGPT API
    const fetchRecommendations = async () => {
      try {
        const openai = new OpenAI({
            apiKey: "pk-ZEdsByaTwSOuLxLdcBZnxVglrGdQEiCKTUosWRHULGYsUCwJ",
            baseURL: "https://api.pawan.krd/gpt-3.5-unfiltered/v1",
            dangerouslyAllowBrowser: true,
          });
    
          const chatCompletion = await openai.chat.completions.create({
            messages: [
              {
                role: "user",
                content: `Generate personalized coding exercise recommendations for a student who is interested in web development and has completed JavaScript tutorials.`,
              },
            ],
            model: "gpt-3.5-turbo",
          });
    
          const response = chatCompletion.choices[0].message.content;
        setRecommendations(response);

      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };


  return (
    <div>
      <h1>Personalized Recommendations</h1>
        <button onClick={fetchRecommendations}>Generate Recommendations</button>
        <p>{recommendations}</p>
    </div>
  );
};

export default RecommendationGenerator;