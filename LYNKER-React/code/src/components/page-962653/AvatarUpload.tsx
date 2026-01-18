
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SafeIcon from '@/components/common/SafeIcon';

interface AvatarUploadProps {
  currentAvatar: string;
}

export default function AvatarUpload({ currentAvatar }: AvatarUploadProps) {
  const [preview, setPreview] = useState(currentAvatar);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Avatar Preview */}
      <div className="flex items-center space-x-6">
        <Avatar className="h-24 w-24 ring-2 ring-primary">
          <AvatarImage src={preview} alt="User avatar" />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
            用户
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <p className="text-sm font-medium">当前头像</p>
          <p className="text-xs text-muted-foreground">
            推荐使用正方形图片，最小尺寸 200x200px
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-muted-foreground/30 hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <SafeIcon name="Upload" className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">拖拽图片到此处</p>
            <p className="text-sm text-muted-foreground">或点击下方按钮选择文件</p>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="avatar-upload"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('avatar-upload')?.click()}
            >
              <SafeIcon name="FileUp" className="mr-2 h-4 w-4" />
              选择文件
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            支持 JPG, PNG, GIF 格式，最大 5MB
          </p>
        </div>
      </div>

      {/* Preview */}
      {preview !== currentAvatar && (
        <div className="space-y-3">
          <p className="text-sm font-medium">预览</p>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 ring-2 ring-accent">
              <AvatarImage src={preview} alt="Preview" />
              <AvatarFallback className="bg-accent text-accent-foreground">
                预览
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreview(currentAvatar)}
              >
                <SafeIcon name="X" className="mr-1 h-4 w-4" />
                取消
              </Button>
              <Button size="sm" className="bg-mystical-gradient hover:opacity-90">
                <SafeIcon name="Check" className="mr-1 h-4 w-4" />
                确认
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
