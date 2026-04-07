import { DatabaseService } from '../models/database.js';

export const getMoods = async (req, res) => {
  try {
    const { success, data, error } = await DatabaseService.getMoods();
    
    if (!success) {
      return res.status(500).json({ error });
    }
    
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch moods' });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mood_id } = req.body;
    
    const { success, data, error } = await DatabaseService.generateRecommendations(userId, mood_id);
    
    if (!success) {
      return res.status(500).json({ error });
    }
    
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
};
