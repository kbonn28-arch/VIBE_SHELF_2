import { Link } from 'react-router-dom'
import { BookOpen, Plus, Sparkles, TrendingUp } from 'lucide-react'
import { useBooks } from '../hooks/useBooks'
import { BookCard } from './BookCard'

export function Home() {
  const { userBooks } = useBooks()

  const recentBooks = userBooks
    .filter(ub => ub.status === 'reading' || ub.status === 'read')
    .slice(0, 3)

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to VibeShelf</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your personal library for organizing books and getting mood-based recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/recommendations"
          className="group p-6 border rounded-lg hover:shadow-md transition-all hover:border-primary bg-gradient-to-br from-purple-50 to-blue-50"
        >
          <Sparkles className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Get Recommendations</h3>
          <p className="text-muted-foreground">
            Discover your next book based on your current mood.
          </p>
        </Link>

        <Link
          to="/library"
          className="group p-6 border rounded-lg hover:shadow-md transition-all hover:border-primary"
        >
          <BookOpen className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">My Library</h3>
          <p className="text-muted-foreground">
            Browse and manage your personal book collection.
          </p>
        </Link>

        <Link
          to="/add"
          className="group p-6 border rounded-lg hover:shadow-md transition-all hover:border-primary"
        >
          <Plus className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Add Books</h3>
          <p className="text-muted-foreground">
            Add new books to your personal library.
          </p>
        </Link>

        <div className="p-6 border rounded-lg">
          <TrendingUp className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Reading Stats</h3>
          <p className="text-muted-foreground">
            Track your reading progress and habits.
          </p>
        </div>
      </div>

      {recentBooks.length > 0 && (
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Reading</h2>
          <div className="space-y-4">
            {recentBooks.map((userBook) => (
              userBook.book && (
                <div key={userBook.id} className="scale-95">
                  <BookCard book={userBook.book} showActions={false} />
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {userBooks.length === 0 && (
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">
                New to VibeShelf? Start by adding books to your library or get personalized recommendations!
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
