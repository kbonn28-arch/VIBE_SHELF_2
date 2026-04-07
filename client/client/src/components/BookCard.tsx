import { Book } from '../types';
import { Star, Plus, Play, Check } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';

interface BookCardProps {
  book: Book;
  showActions?: boolean;
}

export function BookCard({ book, showActions = true }: BookCardProps) {
  const { addUserBook, userBooks } = useBooks();
  
  const userBook = userBooks.find(ub => ub.book_id === book.id);
  const isInLibrary = !!userBook;

  const handleAddToLibrary = async (status: 'want_to_read' | 'reading' | 'read') => {
    await addUserBook(book.id, status);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'want_to_read':
        return <Plus className="h-4 w-4" />;
      case 'reading':
        return <Play className="h-4 w-4" />;
      case 'read':
        return <Check className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'want_to_read':
        return 'bg-blue-100 text-blue-800';
      case 'reading':
        return 'bg-green-100 text-green-800';
      case 'read':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex space-x-4">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          {book.cover_url ? (
            <img
              src={book.cover_url}
              alt={book.title}
              className="w-20 h-28 object-cover rounded-md"
            />
          ) : (
            <div className="w-20 h-28 bg-gray-200 rounded-md flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="text-xs">No</div>
                <div className="text-xs">Cover</div>
              </div>
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">
                  {book.average_rating.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({book.rating_count.toLocaleString()} reviews)
              </span>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-1">
              {book.genre.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                >
                  {genre}
                </span>
              ))}
              {book.genre.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                  +{book.genre.length - 3}
                </span>
              )}
            </div>

            {/* Book Details */}
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {book.publication_year && (
                <span>{book.publication_year}</span>
              )}
              {book.page_count && (
                <span>{book.page_count} pages</span>
              )}
              <span>{book.language}</span>
            </div>

            {/* Description */}
            {book.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {book.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {isInLibrary ? (
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(userBook!.status)}`}>
                {getStatusIcon(userBook!.status)}
                <span>
                  {userBook!.status === 'want_to_read' && 'Want to Read'}
                  {userBook!.status === 'reading' && 'Currently Reading'}
                  {userBook!.status === 'read' && 'Read'}
                </span>
              </span>
              {userBook!.progress && userBook!.progress > 0 && userBook!.progress < 100 && (
                <span className="text-sm text-gray-500">
                  {userBook!.progress}% complete
                </span>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => handleAddToLibrary('want_to_read')}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Want to Read
              </button>
              <button
                onClick={() => handleAddToLibrary('reading')}
                className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                Start Reading
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
