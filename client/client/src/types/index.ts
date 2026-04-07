export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  cover_url?: string;
  description?: string;
  genre: string[];
  publication_year?: number;
  page_count?: number;
  language: string;
  average_rating: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
}

export interface UserBook {
  id: string;
  user_id: string;
  book_id: string;
  status: 'want_to_read' | 'reading' | 'read' | 'abandoned';
  rating?: number;
  review?: string;
  progress?: number;
  started_at?: string;
  finished_at?: string;
  created_at: string;
  updated_at: string;
  book?: Book;
}

export interface Mood {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Recommendation {
  id: string;
  user_id: string;
  book_id: string;
  mood_id: string;
  score: number;
  reason: string;
  created_at: string;
  book?: Book;
  mood?: Mood;
}

export interface Review {
  id: string;
  user_id: string;
  book_id: string;
  rating: number;
  review_text: string;
  created_at: string;
  updated_at: string;
  user?: User;
  book?: Book;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface BookFilter {
  genre?: string;
  author?: string;
  rating?: number;
  status?: UserBook['status'];
  mood?: string;
  search?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}
