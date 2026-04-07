import { Link, useLocation } from 'react-router-dom'
import { cn } from '../lib/utils'
import { BookOpen, Home, Plus, Sparkles } from 'lucide-react'
import { UserProfile } from './UserProfile'

export function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/recommendations', label: 'Discover', icon: Sparkles },
    { path: '/library', label: 'Library', icon: BookOpen },
    { path: '/add', label: 'Add Book', icon: Plus },
  ]

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            VibeShelf
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
            
            <UserProfile />
          </div>
        </div>
      </div>
    </nav>
  )
}
