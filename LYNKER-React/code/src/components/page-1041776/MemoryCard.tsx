
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface Memory {
  id: string;
  category: string;
  content: string;
  source: string;
  createdAt: string;
  verificationStatus: 'high' | 'low' | 'controversial' | 'none';
  tags: string[];
}

interface MemoryCardProps {
  memory: Memory;
  onDelete: () => void;
}

export default function MemoryCard({ memory, onDelete }: MemoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { icon: string; color: string; label: string }> = {
      high: { icon: 'CheckCircle', color: 'bg-green-500/20 text-green-400', label: '高应验' },
      low: { icon: 'XCircle', color: 'bg-red-500/20 text-red-400', label: '低应验' },
      controversial: { icon: 'AlertCircle', color: 'bg-yellow-500/20 text-yellow-400', label: '高争议' },
      none: { icon: 'Circle', color: 'bg-muted text-muted-foreground', label: '未评估' },
    };
    return configs[status] || configs.none;
  };

  const statusConfig = getStatusConfig(memory.verificationStatus);

  return (
    <Card
      className="glass-card hover:shadow-card transition-all duration-300 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
<CardHeader className="pb-1.5 pt-3 px-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-0.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge variant="outline" className="text-xs py-0.5 px-2">
                  {memory.category}
                </Badge>
                <Badge variant="secondary" className={`text-xs py-0.5 px-2 ${statusConfig.color}`}>
                  <SafeIcon name={statusConfig.icon} className="h-3 w-3 mr-0.5" />
                  {statusConfig.label}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {memory.source} • {memory.createdAt}
              </p>
            </div>
            {isHovered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 h-5 w-5 p-0 flex-shrink-0 -mt-1"
              >
                <SafeIcon name="Trash2" className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-1.5 pb-2 px-3 pt-0">
          {/* Content */}
          <p className="text-xs leading-relaxed text-foreground/90 line-clamp-2">
            {memory.content}
          </p>

          {/* Tags & ID */}
          {memory.tags.length > 0 && (
            <div className="flex flex-wrap gap-0.5">
              {memory.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 transition-colors py-0 px-1.5"
                >
                  #{tag}
                </Badge>
              ))}
              <span className="text-xs text-muted-foreground ml-auto self-center">ID: {memory.id}</span>
            </div>
          )}
          
          {memory.tags.length === 0 && (
            <span className="text-xs text-muted-foreground">ID: {memory.id}</span>
          )}
        </CardContent>
    </Card>
  );
}
