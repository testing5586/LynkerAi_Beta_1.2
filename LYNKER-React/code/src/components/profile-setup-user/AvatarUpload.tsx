
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SafeIcon from '@/components/common/SafeIcon';

interface AvatarUploadProps {
  currentAvatar: string;
  onAvatarChange: (newAvatar: string) => void;
}

export default function AvatarUpload({ currentAvatar, onAvatarChange }: AvatarUploadProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('文件大小不能超过5MB');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate file upload
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onAvatarChange(result);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
      setIsLoading(false);
    }
  };

  const presetAvatars = [
    'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
    'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/963c676d-a0bd-4c96-8765-da3e8065bb4f.png',
    'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/5fedf8e9-75c6-4317-b57b-d4974bf91e50.png',
    'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/5fe76cea-4a84-4721-8d91-042889716f46.png',
  ];

  return (
    <div className="space-y-6">
      {/* Current Avatar */}
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-32 w-32 ring-4 ring-primary/30">
          <AvatarImage src={currentAvatar} alt="Current avatar" />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
            用户
          </AvatarFallback>
        </Avatar>
        <p className="text-sm text-muted-foreground">当前头像预览</p>
      </div>

      {/* Upload Button */}
      <div className="flex flex-col gap-3">
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <Button
            asChild
            variant="outline"
            className="w-full"
            disabled={isLoading}
          >
            <span>
              {isLoading ? (
                <>
                  <SafeIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  上传中...
                </>
              ) : (
                <>
                  <SafeIcon name="Upload" className="mr-2 h-4 w-4" />
                  上传新头像
                </>
              )}
            </span>
          </Button>
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isLoading}
          className="hidden"
        />
        <p className="text-xs text-muted-foreground text-center">
          支持 JPG、PNG、GIF 格式，最大 5MB
        </p>
      </div>

      {/* Preset Avatars */}
      <div className="space-y-3">
        <p className="text-sm font-medium">或选择预设头像</p>
        <div className="grid grid-cols-4 gap-3">
          {presetAvatars.map((avatar, index) => (
            <button
              key={index}
              onClick={() => onAvatarChange(avatar)}
              className={`relative rounded-lg overflow-hidden ring-2 transition-all ${
                currentAvatar === avatar
                  ? 'ring-primary ring-offset-2'
                  : 'ring-border hover:ring-primary/50'
              }`}
            >
              <img
                src={avatar}
                alt={`Preset ${index + 1}`}
                className="w-full h-20 object-cover"
              />
              {currentAvatar === avatar && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <SafeIcon name="Check" className="h-5 w-5 text-primary" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
