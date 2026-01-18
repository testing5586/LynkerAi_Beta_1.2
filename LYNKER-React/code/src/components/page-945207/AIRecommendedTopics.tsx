
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import type { AIRecommendedTopicModel } from '@/data/social_feed';

interface AIRecommendedTopicsProps {
  topics: AIRecommendedTopicModel[];
  selectedTopic?: string | null;
  onTopicSelect: (topic: AIRecommendedTopicModel) => void;
}

export default function AIRecommendedTopics({
  topics,
  selectedTopic,
  onTopicSelect,
}: AIRecommendedTopicsProps) {
  return (
    <div>
      <h3 className="font-semibold mb-3 flex items-center space-x-2">
        <SafeIcon name="Lightbulb" className="h-5 w-5 text-accent" />
        <span>AI推荐话题</span>
      </h3>
      <div className="space-y-2">
        {topics.map((topic) => (
          <button
            key={topic.topicId}
            onClick={() => onTopicSelect(topic)}
            className={`w-full p-3 rounded-lg border transition-all text-left text-sm ${
              selectedTopic === topic.suggestedQuery
                ? 'bg-primary/10 border-primary'
                : 'bg-muted/30 border-muted hover:border-primary/50'
            }`}
          >
            <p className="font-medium mb-1">{topic.title}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{topic.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
