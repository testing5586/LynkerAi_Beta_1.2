
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUploader({
  images,
  onImagesChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    if (images.length >= maxImages) {
      alert(`最多只能上传${maxImages}张图片`);
      return;
    }

    setIsUploading(true);
    try {
      const newImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        if (images.length + newImages.length >= maxImages) break;

        const file = files[i];
        if (!file.type.startsWith('image/')) {
          alert('只支持图片文件');
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          alert('图片大小不能超过5MB');
          continue;
        }

        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === Object.keys(files).length || images.length + newImages.length >= maxImages) {
              onImagesChange([...images, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Upload Area */}
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed transition-colors cursor-pointer ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-primary/30 hover:border-primary/50'
        } ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <label className="block p-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <SafeIcon
              name="Upload"
              className={`h-8 w-8 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`}
            />
            <div>
              <p className="font-semibold text-sm">
                {isDragging ? '释放鼠标上传' : '拖拽图片到此或点击选择'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                支持JPG、PNG、WebP格式，单张不超过5MB
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              disabled={isUploading || images.length >= maxImages}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading || images.length >= maxImages}
              onClick={(e) => {
                const input = (e.currentTarget.parentElement?.querySelector(
                  'input[type="file"]'
                ) as HTMLInputElement);
                input?.click();
              }}
            >
              {isUploading ? (
                <>
                  <SafeIcon name="Loader" className="h-4 w-4 mr-2 animate-spin" />
                  上传中...
                </>
              ) : (
                <>
                  <SafeIcon name="Plus" className="h-4 w-4 mr-2" />
                  选择图片
                </>
              )}
            </Button>
          </div>
        </label>
      </Card>

      {/* Counter */}
      <p className="text-xs text-muted-foreground">
        {images.length}/{maxImages} 图片
      </p>
    </div>
  );
}
