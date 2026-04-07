import { useState, useEffect } from 'react';
import { Book, UserBook, BookFilter } from '../types';

const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    isbn: '978-0525559474',
    cover_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever.',
    genre: ['Fiction', 'Philosophy'],
    publication_year: 2020,
    page_count: 288,
    language: 'English',
    average_rating: 4.2,
    rating_count: 1250,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '978-0735211292',
    cover_url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop',
    description: 'Tiny changes, remarkable results. Learn how small habits make a big difference.',
    genre: ['Self-Help', 'Psychology'],
    publication_year: 2018,
    page_count: 320,
    language: 'English',
    average_rating: 4.5,
    rating_count: 3420,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    isbn: '978-0593135204',
    cover_url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=300&fit=crop',
    description: 'A lone astronaut must save humanity from an extinction-level threat.',
    genre: ['Science Fiction', 'Adventure'],
    publication_year: 2021,
    page_count: 496,
    language: 'English',
    average_rating: 4.7,
    rating_count: 2890,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const MOCK_USER_BOOKS: UserBook[] = [
  {
    id: '1',
    user_id: '1',
    book_id: '1',
    status: 'read',
    rating: 4,
    review: 'A thought-provoking exploration of choices and regrets.',
    progress: 100,
    started_at: '2024-01-15T10:00:00Z',
    finished_at: '2024-01-20T15:30:00Z',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    book: MOCK_BOOKS[0],
  },
  {
    id: '2',
    user_id: '1',
    book_id: '2',
    status: 'reading',
    rating: undefined,
    review: undefined,
    progress: 45,
    started_at: '2024-02-01T09:00:00Z',
    finished_at: undefined,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    book: MOCK_BOOKS[1],
  },
];

export function useBooks(filter?: BookFilter) {
  const [books, setBooks] = useState<Book[]>([]);
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredBooks = MOCK_BOOKS;
        let filteredUserBooks = MOCK_USER_BOOKS;
        
        if (filter) {
          if (filter.search) {
            const searchLower = filter.search.toLowerCase();
            filteredBooks = filteredBooks.filter(book => 
              book.title.toLowerCase().includes(searchLower) ||
              book.author.toLowerCase().includes(searchLower)
            );
          }
          
          if (filter.genre) {
            filteredBooks = filteredBooks.filter(book => 
              book.genre.includes(filter.genre!)
            );
          }
          
          if (filter.author) {
            filteredBooks = filteredBooks.filter(book => 
              book.author.toLowerCase().includes(filter.author!.toLowerCase())
            );
          }
          
          if (filter.rating) {
            filteredBooks = filteredBooks.filter(book => 
              book.average_rating >= filter.rating!
            );
          }
          
          if (filter.status) {
            filteredUserBooks = filteredUserBooks.filter(userBook => 
              userBook.status === filter.status
            );
          }
        }
        
        setBooks(filteredBooks);
        setUserBooks(filteredUserBooks);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [filter]);

  const addUserBook = async (bookId: string, status: UserBook['status']) => {
    try {
      const book = MOCK_BOOKS.find(b => b.id === bookId);
      if (!book) throw new Error('Book not found');
      
      const newUserBook: UserBook = {
        id: Date.now().toString(),
        user_id: '1',
        book_id: bookId,
        status,
        progress: status === 'read' ? 100 : 0,
        started_at: status !== 'want_to_read' ? new Date().toISOString() : undefined,
        finished_at: status === 'read' ? new Date().toISOString() : undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        book,
      };
      
      setUserBooks(prev => [...prev, newUserBook]);
    } catch (err) {
      setError('Failed to add book to library');
    }
  };

  const updateUserBook = async (userBookId: string, updates: Partial<UserBook>) => {
    try {
      setUserBooks(prev => 
        prev.map(ub => 
          ub.id === userBookId 
            ? { ...ub, ...updates, updated_at: new Date().toISOString() }
            : ub
        )
      );
    } catch (err) {
      setError('Failed to update book');
    }
  };

  return {
    books,
    userBooks,
    loading,
    error,
    addUserBook,
    updateUserBook,
  };
}
