
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface NoteActionsProps {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onSaveToKnowledge: () => void;
  onReturn: () => void;
}

export default function NoteActions({
  isEditing,
  isSaving,
  onEdit,
  onSave,
  onSaveToKnowledge,
  onReturn,
}: NoteActionsProps) {
  return (
    <Card className="glass-card sticky top-24">
      <CardHeader>
        <CardTitle className="text-base">笔记操作</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isEditing ? (
          <>
            <Button
              className="w-full bg-mystical-gradient hover:opacity-90"
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <SafeIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                <>
                  <SafeIcon name="Save" className="mr-2 h-4 w-4" />
                  保存编辑
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={onEdit}
              disabled={isSaving}
            >
              <SafeIcon name="X" className="mr-2 h-4 w-4" />
              取消编辑
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              className="w-full"
              onClick={onEdit}
            >
              <SafeIcon name="Edit" className="mr-2 h-4 w-4" />
              编辑笔记
            </Button>
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={onSaveToKnowledge}
            >
              <SafeIcon name="BookOpen" className="mr-2 h-4 w-4" />
              保存到知识库
            </Button>
          </>
        )}

        <div className="pt-2 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={onReturn}
          >
            <SafeIcon name="ArrowLeft" className="mr-2 h-4 w-4" />
            返回
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
