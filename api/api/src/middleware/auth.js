import { DatabaseService } from '../models/database.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }
    
    const token = authHeader.substring(7);
    
    // In a real app, you'd verify the JWT token
    // For now, we'll use a mock user ID
    if (token === 'mock-token') {
      req.user = {
        id: '1',
        email: 'user@example.com',
        name: 'Book Lover',
      };
      return next();
    }
    
    // For Supabase auth, you would do something like:
    // const { data: { user }, error } = await supabase.auth.getUser(token);
    // if (error || !user) {
    //   return res.status(401).json({ error: 'Invalid token' });
    // }
    // req.user = user;
    
    res.status(401).json({ error: 'Invalid token' });
  } catch (error) {
    res.status(500).json({ error: 'Authentication error' });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      if (token === 'mock-token') {
        req.user = {
          id: '1',
          email: 'user@example.com',
          name: 'Book Lover',
        };
      }
    }
    
    next();
  } catch (error) {
    next();
  }
};
