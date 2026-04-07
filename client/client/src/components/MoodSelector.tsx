import { useMoods } from '../hooks/useMoods';

interface MoodSelectorProps {
  selectedMood?: string;
  onMoodSelect: (moodId: string) => void;
}

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  const { moods, loading, error } = useMoods();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load moods</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">How are you feeling?</h2>
      <p className="text-muted-foreground">
        Select your current mood to get personalized book recommendations
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedMood === mood.id
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
            style={{
              borderColor: selectedMood === mood.id ? mood.color : undefined,
            }}
          >
            <div className="text-3xl mb-2">{mood.icon}</div>
            <h3 className="font-semibold text-sm">{mood.name}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {mood.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
