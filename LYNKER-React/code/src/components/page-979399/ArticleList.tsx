
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import SafeIcon from '@/components/common/SafeIcon';

interface Article {
  id: string;
  title: string;
  content: string;
  source: string;
  url?: string;
  createdAt: string;
  tags: string[];
}

interface ArticleListProps {
  articles: Article[];
  onDelete: (id: string) => void;
  selectedAI: string;
}

export default function ArticleList({ articles, onDelete, selectedAI }: ArticleListProps) {
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'url-import':
        return 'Download';
      case 'manual':
        return 'FileText';
      case 'forum':
        return 'MessageSquare';
      case 'friend':
        return 'Users';
      default:
        return 'BookOpen';
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'url-import':
        return '导入';
      case 'manual':
        return '笔记';
      case 'forum':
        return '论坛';
      case 'friend':
        return '灵友分享';
      default:
        return '文章';
    }
  };

  return (
    <div className="grid gap-4">
      {articles.map((article) => (
        <Card key={article.id} className="glass-card hover:shadow-card transition-all">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <SafeIcon name={getSourceIcon(article.source)} className="w-4 h-4 text-accent" />
                  <Badge variant="secondary" className="text-xs">
                    {getSourceLabel(article.source)}
                  </Badge>
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                  {new Date(article.createdAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <a href={`./ai-chat-interface.html?article=${article.id}`}>
                    <SafeIcon name="MessageCircle" className="w-4 h-4" />
                  </a>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <SafeIcon name="Trash2" className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass-card">
                    <AlertDialogHeader>
                      <AlertDialogTitle>删除文章</AlertDialogTitle>
                      <AlertDialogDescription>
                        确定要删除这篇文章吗？此操作无法撤销。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="bg-muted/50 p-3 rounded-lg max-h-24 overflow-y-auto">
                      <p className="text-sm font-medium">{article.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {article.content}
                      </p>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(article.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        删除
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 line-clamp-3 mb-3">
              {article.content}
            </p>
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <SafeIcon name="ExternalLink" className="w-3 h-3" />
                查看原文
              </a>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
