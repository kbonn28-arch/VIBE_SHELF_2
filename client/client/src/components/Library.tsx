import { useState } from 'react'
import { Search, BookOpen } from 'lucide-react'
import { useBooks } from '../hooks/useBooks'
import { BookCard } from './BookCard'
import { BookFilter } from '../types'

export function Library() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<BookFilter['status']>()
  const { userBooks, loading } = useBooks({
    search: searchTerm || undefined,
    status: statusFilter,
  })

  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-3xl font-bold">My Library</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <select
            value={statusFilter || ''}
            onChange={(e) => setStatusFilter(e.target.value as BookFilter['status'] || undefined)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Status</option>
            <option value="want_to_read">Want to Read</option>
            <option value="reading">Currently Reading</option>
            <option value="read">Read</option>
            <option value="abandoned">Abandoned</option>
          </select>
        </div>
      </div>

      {userBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your library is empty</h3>
          <p className="text-muted-foreground mb-4">
            Start building your collection by adding your first book.
          </p>
          <a
            href="/add"
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Add Your First Book
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {userBooks.map((userBook) => (
            userBook.book && (
              <BookCard key={userBook.id} book={userBook.book} />
            )
          ))}
        </div>
      )}
    </div>
  )
}
