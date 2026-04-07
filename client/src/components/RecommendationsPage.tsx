import { useState } from 'react';
import { MoodSelector } from './MoodSelector';
import { Recommendations } from './Recommendations';
import { ArrowLeft, Sparkles } from 'lucide-react';

export function RecommendationsPage() {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleBack = () => {
    setSelectedMood('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        {selectedMood && (
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to moods</span>
          </button>
        )}
      </div>

      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Book Recommendations</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get personalized book suggestions based on your current mood and reading preferences
        </p>
      </div>

      {!selectedMood ? (
        <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />
      ) : (
        <Recommendations 
          key={refreshKey} 
          moodId={selectedMood} 
          onRefresh={handleRefresh} 
        />
      )}
    </div>
  );
}
