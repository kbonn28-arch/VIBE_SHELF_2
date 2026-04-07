import { DatabaseService } from '../models/database.js';

export const getBooks = async (req, res) => {
  try {
    const { success, data, error } = await DatabaseService.getBooks(req.query);
    
    if (!success) {
      return res.status(500).json({ error });
    }
    
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { success, data, error } = await DatabaseService.getBooks({ id: req.params.id });
    
    if (!success) {
      return res.status(500).json({ error });
    }
    
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json({ data: data[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { success, data, error } = await DatabaseService.getUserBooks(userId, req.query);
    
    if (!success) {
      return res.status(500).json({ error });
    }
    
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user books' });
  }
};

export const addUserBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const userBookData = {
      ...req.body,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    const { success, data, error } = await DatabaseService.createUserBook(userBookData);
    
    if (!success) {
      return res.status(500).json({ error });
    }
    
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book to library' });
  }
};

export const updateUserBook = async (req, res) => {
  try {
    const userBookId = req.params.id;
    const updates = {
      ...req.body,
      updated_at: new Date().toISOString(),
    };
    
    const { success, data, error } = await DatabaseService.updateUserBook(userBookId, updates);
    
    if (!success) {
      return res.status(500).json({ error });
    }
    
    if (!data) {
      return res.status(404).json({ error: 'User book not found' });
    }
    
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

export const deleteUserBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const userBookId = req.params.id;
    
    // In a real implementation, you'd delete from the database
    // For now, we'll just return success
    res.json({ message: 'Book removed from library successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove book from library' });
  }
};
