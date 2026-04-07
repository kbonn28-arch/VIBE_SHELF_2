import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export class DatabaseService {
  static async testConnection() {
    try {
      const { data, error } = await supabase.from('profiles').select('count').single();
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      return { success: true, message: 'Database connection successful' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getProfiles() {
    try {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getBooks(filters = {}) {
    try {
      let query = supabase.from('books').select('*');
      
      if (filters.genre) {
        query = query.contains('genre', [filters.genre]);
      }
      
      if (filters.author) {
        query = query.ilike('author', `%${filters.author}%`);
      }
      
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,author.ilike.%${filters.search}%`);
      }
      
      if (filters.minRating) {
        query = query.gte('average_rating', filters.minRating);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getUserBooks(userId, filters = {}) {
    try {
      let query = supabase
        .from('user_books')
        .select(`
          *,
          books (*)
        `)
        .eq('user_id', userId);
      
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async createUserBook(userBookData) {
    try {
      const { data, error } = await supabase
        .from('user_books')
        .insert(userBookData)
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async updateUserBook(userBookId, updates) {
    try {
      const { data, error } = await supabase
        .from('user_books')
        .update(updates)
        .eq('id', userBookId)
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getMoods() {
    try {
      const { data, error } = await supabase.from('moods').select('*');
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async generateRecommendations(userId, moodId) {
    try {
      // Get books associated with the selected mood
      const { data: bookMoods, error: bookMoodsError } = await supabase
        .from('book_moods')
        .select(`
          *,
          books (*)
        `)
        .eq('mood_id', moodId)
        .order('confidence_score', { ascending: false });
      
      if (bookMoodsError) throw bookMoodsError;
      
      // Get user's existing books to filter them out
      const { data: userBooks } = await this.getUserBooks(userId);
      const userBookIds = userBooks?.map(ub => ub.book_id) || [];
      
      // Filter out books user already has and sort by confidence score
      const availableRecommendations = bookMoods
        ?.filter(bm => !userBookIds.includes(bm.book_id))
        ?.map(bm => ({
          user_id: userId,
          book_id: bm.book_id,
          mood_id: moodId,
          recommendation_score: bm.confidence_score,
          was_helpful: null,
          feedback: null,
          created_at: new Date().toISOString(),
          book: bm.books
        }))
        ?.slice(0, 5) || [];
      
      return { success: true, data: availableRecommendations };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
