
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
}

interface MediaUploadPreviewProps {
  mediaItems: MediaItem[];
  onAddMedia: (media: MediaItem) => void;
  onRemoveMedia: (id: string) => void;
  canAddMore: boolean;
  maxCount: number;
}

export default function MediaUploadPreview({
  mediaItems,
  onAddMedia,
  onRemoveMedia,
  canAddMore,
  maxCount,
}: MediaUploadPreviewProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (isImage || isVideo) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          onAddMedia({
            id: `${Date.now()}-${Math.random()}`,
            type: isImage ? 'image' : 'video',
            url,
            name: file.name,
          });
        };
        reader.readAsDataURL(file);
      }
    });
  };

return (
    <Card className="glass-card rounded-2xl border-2 border-muted/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">媒体文件</CardTitle>
        <CardDescription className="text-base">
          支持图片和视频，最多{maxCount}个文件
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Upload Area */}
        {canAddMore && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors cursor-pointer ${
              dragActive
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground/30 hover:border-primary/50'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileInput}
              className="hidden"
            />

            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                <SafeIcon name="Upload" className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-bold text-base text-foreground">拖拽文件到此或点击上传</p>
                <p className="text-sm text-muted-foreground mt-1">
                  支持 JPG, PNG, GIF, MP4 等格式
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Media Grid */}
        {mediaItems.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-bold text-base text-foreground">已上传媒体 ({mediaItems.length}/{maxCount})</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  className="relative group rounded-2xl overflow-hidden bg-muted aspect-square transition-transform hover:scale-105"
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <Badge variant="secondary" className="bg-background/90 rounded-lg">
                      {item.type === 'image' ? (
                        <SafeIcon name="Image" className="h-4 w-4 mr-1" />
                      ) : (
                        <SafeIcon name="Video" className="h-4 w-4 mr-1" />
                      )}
                      {item.type === 'image' ? '图片' : '视频'}
                    </Badge>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                    onClick={() => onRemoveMedia(item.id)}
                  >
                    <SafeIcon name="X" className="h-4 w-4" />
                  </Button>

                  {/* Type Badge */}
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="text-xs rounded-lg">
                      {item.type === 'image' ? '图' : '视'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload More Button */}
        {canAddMore && mediaItems.length > 0 && (
          <Button
            variant="outline"
            className="w-full rounded-lg font-semibold text-base"
            onClick={() => fileInputRef.current?.click()}
          >
            <SafeIcon name="Plus" className="mr-2 h-4 w-4" />
            继续上传 ({mediaItems.length}/{maxCount})
          </Button>
        )}

        {!canAddMore && (
          <div className="p-4 rounded-2xl bg-accent/10 border-2 border-accent/30 text-base font-medium text-accent">
            <SafeIcon name="AlertCircle" className="inline mr-2 h-5 w-5" />
            已达到最大媒体数量限制
          </div>
        )}
      </CardContent>
    </Card>
  );
}
