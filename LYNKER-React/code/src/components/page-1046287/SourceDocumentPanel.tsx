
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import SafeIcon from '@/components/common/SafeIcon';

interface Document {
  id: string;
  title: string;
  type: 'markdown' | 'video' | 'article';
  category: string;
  content: string;
  createdAt: string;
  tags: string[];
}

interface SourceDocumentPanelProps {
  document: Document;
  isClient: boolean;
}

export default function SourceDocumentPanel({
  document,
  isClient,
}: SourceDocumentPanelProps) {
  const renderContent = () => {
    if (document.type === 'video') {
      return (
        <div className="space-y-4">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <SafeIcon name="Video" className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">视频内容</p>
              <p className="text-xs text-muted-foreground mt-1">{document.content}</p>
            </div>
          </div>
        </div>
      );
    }

    if (document.type === 'markdown') {
      return (
        <div className="prose prose-invert max-w-none text-sm space-y-3">
          {document.content.split('\n').map((line, idx) => {
            if (line.startsWith('# ')) {
              return (
                <h1 key={idx} className="text-lg font-bold text-foreground">
                  {line.replace('# ', '')}
                </h1>
              );
            }
            if (line.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-base font-semibold text-foreground mt-3">
                  {line.replace('## ', '')}
                </h2>
              );
            }
            if (line.startsWith('- ')) {
              return (
                <li key={idx} className="ml-4 text-muted-foreground">
                  {line.replace('- ', '')}
                </li>
              );
            }
            if (line.trim()) {
              return (
                <p key={idx} className="text-muted-foreground leading-relaxed">
                  {line}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }

    return (
      <div className="text-muted-foreground">
        <p>{document.content}</p>
      </div>
    );
  };

  return (
    <Card className="flex-1 overflow-hidden flex flex-col bg-card/50 backdrop-blur-sm border-muted-foreground/20">
      {/* Header */}
      <div className="border-b p-4 bg-muted/20">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <SafeIcon
                name={
                  document.type === 'video'
                    ? 'Video'
                    : document.type === 'article'
                    ? 'FileText'
                    : 'FileJson'
                }
                className="h-5 w-5 text-accent"
              />
              <h2 className="text-lg font-semibold">{document.title}</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              创建于 {document.createdAt}
            </p>
          </div>
          <Badge variant="outline" className="ml-2">
            {document.type === 'video' ? '视频' : document.type === 'article' ? '文章' : 'Markdown'}
          </Badge>
        </div>

        {/* Tags */}
        {document.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {document.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {renderContent()}
        </div>
      </ScrollArea>
    </Card>
  );
}
