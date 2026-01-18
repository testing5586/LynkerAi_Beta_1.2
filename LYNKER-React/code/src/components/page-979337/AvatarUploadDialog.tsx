'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import SafeIcon from '@/components/common/SafeIcon';
import { Input } from '@/components/ui/input';

interface AvatarUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAvatarChange: (avatarUrl: string) => void;
  currentAvatar?: string;
}

export default function AvatarUploadDialog({
  open,
  onOpenChange,
  onAvatarChange,
  currentAvatar,
}: AvatarUploadDialogProps) {
  const [preview, setPreview] = useState<string | undefined>(currentAvatar);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
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
      processFile(file);
    } else {
      alert('请选择图片文件');
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('只支持图片文件');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (preview) {
      onAvatarChange(preview);
      onOpenChange(false);
      setPreview(currentAvatar);
    }
  };

  const handleCancel = () => {
    setPreview(currentAvatar);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <SafeIcon name="Upload" className="h-5 w-5" />
            <span>上传头像</span>
          </DialogTitle>
          <DialogDescription>
            选择或拖拽图片来更新您的头像
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview */}
          {preview && (
            <div className="flex justify-center">
              <Avatar className="h-32 w-32 ring-2 ring-primary">
                <AvatarImage src={preview} alt="Avatar preview" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  预览
                </AvatarFallback>
              </Avatar>
            </div>
          )}

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
                <SafeIcon
                  name="Upload"
                  className={`h-6 w-6 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`}
                />
              </div>
              <div>
                <p className="font-medium">
                  {isDragging ? '释放鼠标上传' : '拖拽图片到此处'}
                </p>
                <p className="text-sm text-muted-foreground">或点击下方按钮选择文件</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="avatar-input"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('avatar-input')?.click()}
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

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleConfirm}
              disabled={!preview || preview === currentAvatar}
              className="flex-1 bg-mystical-gradient hover:opacity-90"
            >
              <SafeIcon name="Check" className="h-4 w-4 mr-2" />
              确认上传
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              <SafeIcon name="X" className="h-4 w-4 mr-2" />
              取消
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}