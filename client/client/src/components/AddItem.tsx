import { useState } from 'react'
import { BookOpen, Film, Music, Save, X } from 'lucide-react'

interface MediaItem {
  title: string
  type: 'book' | 'movie' | 'music'
  author?: string
  artist?: string
  director?: string
  year?: number
  rating?: number
  status: 'unread' | 'reading' | 'read' | 'unwatched' | 'watching' | 'watched'
  notes?: string
}

export function AddItem() {
  const [formData, setFormData] = useState<MediaItem>({
    title: '',
    type: 'book',
    status: 'unread'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // TODO: Save to database/localStorage
    alert('Item added successfully!')
    setFormData({
      title: '',
      type: 'book',
      status: 'unread'
    })
  }

  const handleInputChange = (field: keyof MediaItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getStatusOptions = () => {
    switch (formData.type) {
      case 'book':
        return [
          { value: 'unread', label: 'To Read' },
          { value: 'reading', label: 'Currently Reading' },
          { value: 'read', label: 'Read' }
        ]
      case 'movie':
        return [
          { value: 'unwatched', label: 'To Watch' },
          { value: 'watching', label: 'Currently Watching' },
          { value: 'watched', label: 'Watched' }
        ]
      case 'music':
        return [
          { value: 'unwatched', label: 'To Listen' },
          { value: 'watching', label: 'Currently Listening' },
          { value: 'watched', label: 'Listened' }
        ]
      default:
        return []
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Media Type</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'book', icon: BookOpen, label: 'Book' },
                { value: 'movie', icon: Film, label: 'Movie' },
                { value: 'music', icon: Music, label: 'Music' }
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleInputChange('type', value)}
                  className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                    formData.type === value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter title..."
            />
          </div>

          {formData.type === 'book' && (
            <div>
              <label className="block text-sm font-medium mb-2">Author</label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter author name..."
              />
            </div>
          )}

          {formData.type === 'movie' && (
            <div>
              <label className="block text-sm font-medium mb-2">Director</label>
              <input
                type="text"
                value={formData.director || ''}
                onChange={(e) => handleInputChange('director', e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter director name..."
              />
            </div>
          )}

          {formData.type === 'music' && (
            <div>
              <label className="block text-sm font-medium mb-2">Artist</label>
              <input
                type="text"
                value={formData.artist || ''}
                onChange={(e) => handleInputChange('artist', e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter artist name..."
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <input
                type="number"
                value={formData.year || ''}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value) || undefined)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., 2023"
                min="1000"
                max={new Date().getFullYear()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <select
                value={formData.rating || ''}
                onChange={(e) => handleInputChange('rating', parseInt(e.target.value) || undefined)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">No rating</option>
                {[1, 2, 3, 4, 5].map(rating => (
                  <option key={rating} value={rating}>★ {rating}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {getStatusOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Add any notes about this item..."
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Item</span>
          </button>
        </div>
      </form>
    </div>
  )
}
