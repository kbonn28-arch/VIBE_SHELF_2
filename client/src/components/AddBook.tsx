import { useState } from 'react'
import { Search, Plus, BookOpen } from 'lucide-react'
import { useBooks } from '../hooks/useBooks'
import { Book } from '../types'

export function AddBook() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [status, setStatus] = useState<'want_to_read' | 'reading' | 'read'>('want_to_read')
  const { books, loading, addUserBook } = useBooks({ search: searchTerm || undefined })

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book)
  }

  const handleAddBook = async () => {
    if (selectedBook) {
      await addUserBook(selectedBook.id, status)
      setSelectedBook(null)
      setStatus('want_to_read')
      setSearchTerm('')
    }
  }

  const handleManualAdd = () => {
    // In a real app, this would open a form to manually add book details
    alert('Manual book addition coming soon!')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Add Books to Your Library</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Search for books to add to your personal library, or add them manually.
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-card border rounded-lg p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search for books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {loading ? 'Searching...' : `Found ${books.length} books`}
            </p>
            <button
              onClick={handleManualAdd}
              className="flex items-center space-x-2 px-4 py-2 border border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Manually</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Book */}
      {selectedBook && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Selected Book</h3>
              <div className="flex items-start space-x-4">
                {selectedBook.cover_url ? (
                  <img
                    src={selectedBook.cover_url}
                    alt={selectedBook.title}
                    className="w-16 h-20 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-16 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-medium">{selectedBook.title}</h4>
                  <p className="text-sm text-gray-600">by {selectedBook.author}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-yellow-600">★ {selectedBook.average_rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({selectedBook.rating_count} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="want_to_read">Want to Read</option>
                <option value="reading">Currently Reading</option>
                <option value="read">Read</option>
              </select>
              
              <button
                onClick={handleAddBook}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Add to Library
              </button>
              
              <button
                onClick={() => setSelectedBook(null)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {books.length > 0 && !selectedBook && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <div className="grid gap-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleBookSelect(book)}
              >
                <div className="flex items-start space-x-4">
                  {book.cover_url ? (
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-12 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{book.title}</h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-yellow-600">★ {book.average_rating.toFixed(1)}</span>
                      <span className="text-sm text-gray-500">({book.rating_count} reviews)</span>
                      {book.publication_year && (
                        <span className="text-sm text-gray-500">{book.publication_year}</span>
                      )}
                      <div className="flex gap-1">
                        {book.genre.slice(0, 2).map((genre) => (
                          <span
                            key={genre}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && books.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or add the book manually.
          </p>
          <button
            onClick={handleManualAdd}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Add Book Manually
          </button>
        </div>
      )}
    </div>
  )
}
