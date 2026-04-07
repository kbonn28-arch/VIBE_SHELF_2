import React from 'react';
import { useRecommendations } from '../hooks/useMoods';
import { useBooks } from '../hooks/useBooks';
import { BookCard } from './BookCard';
import { Loader2, RefreshCw, BookOpen } from 'lucide-react';

interface RecommendationsProps {
  moodId: string;
  onRefresh: () => void;
}

export function Recommendations({ moodId, onRefresh }: RecommendationsProps) {
  const { recommendations, loading, error, generateRecommendations } = useRecommendations();
  const { books } = useBooks();

  React.useEffect(() => {
    if (moodId) {
      generateRecommendations(moodId);
    }
  }, [moodId, generateRecommendations]);

  const recommendationBooks = recommendations.map(rec => {
    const book = books.find(b => b.id === rec.book_id);
    return { ...rec, book };
  }).filter(rec => rec.book);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Generating personalized recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Failed to generate recommendations</p>
        <button
          onClick={() => generateRecommendations(moodId)}
          className="text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (recommendationBooks.length === 0) {
    return (
      <div className="text-center py-8">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-muted-foreground">No recommendations available yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Recommended for You</h2>
          <p className="text-muted-foreground">
            Based on your current mood, here are some books you might enjoy
          </p>
        </div>
        <button
          onClick={() => {
            generateRecommendations(moodId);
            onRefresh();
          }}
          className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid gap-6">
        {recommendationBooks.map((recommendation) => (
          <div key={recommendation.id} className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Why we recommend this:
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    {recommendation.reason}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-blue-600">Match score:</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-20 h-2 bg-blue-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${recommendation.score * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-blue-600">
                        {Math.round(recommendation.score * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {recommendation.book && <BookCard book={recommendation.book} />}
          </div>
        ))}
      </div>
    </div>
  );
}
