import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface BackgroundImageSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (imageUrl: string) => void;
}

const DEFAULT_BACKGROUNDS = [
  {
    id: 'bg-1',
    name: '神秘紫色',
    url: 'https://images.unsplash.com/photo-1763652387629-83cb1f068b0e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=M3w3MjkzNDZ8MHwxfHNlYXJjaHwyfHxBJTIwbXlzdGljYWwlMjBwcm9nbm9zaXMlMjBzZXJ2aWNlJTIwc3R1ZGlvJTIwYmFja2dyb3VuZCUyMGltYWdlJTIwZm9yJTIwbWFzdGVyJTIwcHJvZmlsZSUyQyUyMGZlYXR1cmluZyUyMGRlZXAlMjBwdXJwbGUlMjBhbmQlMjB2aW9sZXQlMjBncmFkaWVudCUyMHdpdGglMjBteXN0aWNhbCUyMGVuZXJneSUyQyUyMHN1aXRhYmxlJTIwZm9yJTIwdHJhZGl0aW9uYWwlMjBDaGluZXNlJTIwZm9ydHVuZSUyMHRlbGxpbmclMjB3b3Jrc3BhY2UlMkMlMjBlbGVnYW50JTIwYW5kJTIwbXlzdGVyaW91cyUyMGFlc3RoZXRpYy58ZW58MHx8fHwxNzY1MzUyNzc1fDA&ixlib=rb-4.1.0&q=80&w=1920&h=1080',
  },
  {
    id: 'bg-2',
    name: '金色光晕',
    url: 'https://images.unsplash.com/photo-1734562520377-357b990aa9ab?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=M3w3MjkzNDZ8MHwxfHNlYXJjaHwxfHxBJTIwZ29sZGVuJTIwZ2xvdyUyMGJhY2tncm91bmQlMjBpbWFnZSUyMGZvciUyMHByb2dub3NpcyUyMHN0dWRpbyUyQyUyMGZlYXR1cmluZyUyMHdhcm0lMjBnb2xkZW4lMjBsaWdodCUyMGFuZCUyMHRyYWRpdGlvbmFsJTIwQXNpYW4lMjBteXN0aWNhbCUyMGVsZW1lbnRzJTJDJTIwc3VpdGFibGUlMjBmb3IlMjBmb3J0dW5lJTIwdGVsbGluZyUyMG1hc3RlciUyMHdvcmtzcGFjZSUyMHdpdGglMjBlbGVnYW50JTIwZ29sZCUyMHRvbmVzJTIwYW5kJTIwc3Bpcml0dWFsJTIwYW1iaWFuY2UufGVufDB8fHx8MTc2NTM1Mjc3NXww&ixlib=rb-4.1.0&q=80&w=1920&h=1080',
  },
  {
    id: 'bg-3',
    name: '深蓝星空',
    url: 'https://images.unsplash.com/photo-1746424919585-b3808a2bea0c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=M3w3MjkzNDZ8MHwxfHNlYXJjaHwxfHxBJTIwZGVlcCUyMGJsdWUlMjBzdGFycnklMjBuaWdodCUyMHNreSUyMGJhY2tncm91bmQlMjBpbWFnZSUyMGZvciUyMHByb2dub3NpcyUyMHNlcnZpY2UlMjBzdHVkaW8lMkMlMjBmZWF0dXJpbmclMjBzdGFycyUyQyUyMGNvc21pYyUyMGVsZW1lbnRzJTJDJTIwYW5kJTIwbXlzdGljYWwlMjBhdG1vc3BoZXJlJTJDJTIwc3VpdGFibGUlMjBmb3IlMjBmb3J0dW5lJTIwdGVsbGluZyUyMG1hc3RlciUyMHByb2ZpbGUlMjB3aXRoJTIwY2VsZXN0aWFsJTIwdGhlbWUlMjBhbmQlMjBzcGlyaXR1YWwlMjBlbmVyZ3kufGVufDB8fHx8MTc2NTM1Mjc3NXww&ixlib=rb-4.1.0&q=80&w=1920&h=1080',
  },
  {
    id: 'bg-4',
    name: '翡翠绿意',
    url: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/10/558f7426-8209-4ba1-be1c-6134cbdd8502.png',
  },
  {
    id: 'bg-5',
    name: '玫瑰红晕',
    url: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/10/a554902c-140b-4cd9-9705-9a0df1e91c3e.png',
  },
  {
    id: 'bg-6',
    name: '月光银辉',
    url: 'https://images.unsplash.com/photo-1752010037673-f29bfa497dfa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=M3w3MjkzNDZ8MHwxfHNlYXJjaHwzfHxBJTIwbW9vbmxpZ2h0JTIwc2lsdmVyJTIwYmFja2dyb3VuZCUyMGltYWdlJTIwZm9yJTIwcHJvZ25vc2lzJTIwc3R1ZGlvJTJDJTIwZmVhdHVyaW5nJTIwc2lsdmVyeS1ibHVlJTIwbW9vbmxpdCUyMHRvbmVzJTIwd2l0aCUyMG15c3RpY2FsJTIwbW9vbiUyMGVsZW1lbnRzJTIwYW5kJTIwY29zbWljJTIwZW5lcmd5JTJDJTIwc3VpdGFibGUlMjBmb3IlMjBmb3J0dW5lJTIwdGVsbGluZyUyMG1hc3RlciUyMHdvcmtzcGFjZSUyMHdpdGglMjBzZXJlbmUlMjBhbmQlMjBzcGlyaXR1YWwlMjBhdG1vc3BoZXJlLnxlbnwwfHx8fDE3NjUzNTI3NzV8MA&ixlib=rb-4.1.0&q=80&w=1920&h=1080',
  },
];

export default function BackgroundImageSelector({
  open,
  onOpenChange,
  onSelect,
}: BackgroundImageSelectorProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onSelect(dataUrl);
        onOpenChange(false);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>选择背景图</DialogTitle>
          <DialogDescription>
            选择默认背景模板或上传自定义图片
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Default Backgrounds Grid */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">默认背景模板</h3>
            <div className="grid grid-cols-3 gap-3">
              {DEFAULT_BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => {
                    onSelect(bg.url);
                    onOpenChange(false);
                  }}
                  className="group relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all"
                >
                  <img
                    src={bg.url}
                    alt={bg.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {bg.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Upload */}
          <div className="space-y-2 border-t pt-4">
            <h3 className="text-sm font-medium">上传自定义背景</h3>
            <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
              <SafeIcon name="Upload" className="h-5 w-5" />
              <span className="text-sm text-muted-foreground">
                {uploading ? '上传中...' : '点击或拖拽图片上传'}
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}