
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SafeIcon from '@/components/common/SafeIcon';

interface AvatarUploaderProps {
  currentAvatar: string;
  onAvatarChange: (avatar: string) => void;
}

export default function AvatarUploader({ currentAvatar, onAvatarChange }: AvatarUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('文件大小不能超过5MB');
      return;
    }

    setIsUploading(true);
    try {
      // Simulate file upload
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onAvatarChange(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Avatar Preview */}
      <div className="relative">
        <Avatar className="h-32 w-32 ring-4 ring-accent/30">
          <AvatarImage src={currentAvatar} alt="Avatar" />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
            师
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-accent flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
          <SafeIcon name="Camera" className="w-5 h-5 text-accent-foreground" />
        </div>
      </div>

      {/* Upload Button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        variant="outline"
        className="w-full max-w-xs"
      >
        {isUploading ? (
          <>
            <SafeIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
            上传中...
          </>
        ) : (
          <>
            <SafeIcon name="Upload" className="w-4 h-4 mr-2" />
            上传头像
          </>
        )}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        支持 JPG、PNG 格式，文件大小不超过 5MB
      </p>
    </div>
  );
}
