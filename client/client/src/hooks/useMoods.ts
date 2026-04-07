import { useState, useEffect } from 'react';
import { Mood, Recommendation } from '../types';

const MOCK_MOODS: Mood[] = [
  {
    id: '1',
    name: 'Adventurous',
    description: 'Ready for excitement and new experiences',
    icon: '🚀',
    color: '#FF6B6B',
  },
  {
    id: '2',
    name: 'Cozy',
    description: 'Comforting and warm stories',
    icon: '☕',
    color: '#4ECDC4',
  },
  {
    id: '3',
    name: 'Thoughtful',
    description: 'Deep and philosophical content',
    icon: '🤔',
    color: '#45B7D1',
  },
  {
    id: '4',
    name: 'Inspired',
    description: 'Motivating and uplifting stories',
    icon: '✨',
    color: '#96CEB4',
  },
  {
    id: '5',
    name: 'Relaxed',
    description: 'Easy-going and stress-free reading',
    icon: '🌊',
    color: '#FFEAA7',
  },
  {
    id: '6',
    name: 'Curious',
    description: 'Learning and discovery focused',
    icon: '🔍',
    color: '#DDA0DD',
  },
];

export function useMoods() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setMoods(MOCK_MOODS);
      } catch (err) {
        setError('Failed to fetch moods');
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  return {
    moods,
    loading,
    error,
  };
}

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecommendations = async (moodId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mood = MOCK_MOODS.find(m => m.id === moodId);
      if (!mood) throw new Error('Mood not found');
      
      // Mock recommendations based on mood
      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          user_id: '1',
          book_id: '1',
          mood_id: moodId,
          score: 0.9,
          reason: `Perfect for your ${mood.name.toLowerCase()} mood - this book offers exactly what you're looking for!`,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: '1',
          book_id: '2',
          mood_id: moodId,
          score: 0.8,
          reason: `Great match for ${mood.name.toLowerCase()} readers - highly rated and well-loved.`,
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          user_id: '1',
          book_id: '3',
          mood_id: moodId,
          score: 0.85,
          reason: `This ${mood.name.toLowerCase()} choice will keep you engaged and entertained.`,
          created_at: new Date().toISOString(),
        },
      ];
      
      setRecommendations(mockRecommendations);
    } catch (err) {
      setError('Failed to generate recommendations');
    } finally {
      setLoading(false);
    }
  };

  const clearRecommendations = () => {
    setRecommendations([]);
  };

  return {
    recommendations,
    loading,
    error,
    generateRecommendations,
    clearRecommendations,
  };
}
