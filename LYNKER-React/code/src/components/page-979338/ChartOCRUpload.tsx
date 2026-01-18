
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';

interface ChartOCRUploadProps {
  agentName: string;
}

export default function ChartOCRUpload({ agentName }: ChartOCRUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate OCR processing
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block">导入排盘图片（OCR识别）</label>

      {uploadedImage ? (
        <Card className="p-3 bg-muted/50 border-primary/30">
          <div className="space-y-2">
            <img
              src={uploadedImage}
              alt="Uploaded chart"
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setUploadedImage(null)}
              >
                <SafeIcon name="X" className="h-4 w-4 mr-1" />
                清除
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                disabled
              >
                <SafeIcon name="CheckCircle" className="h-4 w-4 mr-1" />
                已识别
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/20">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
          />
          <div className="text-center">
            {isUploading ? (
              <>
                <SafeIcon name="Loader" className="h-6 w-6 mx-auto mb-2 text-primary animate-spin" />
                <p className="text-sm font-medium">识别中...</p>
              </>
            ) : (
              <>
                <SafeIcon name="Upload" className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">点击上传排盘图片</p>
                <p className="text-xs text-muted-foreground">支持 JPG, PNG, GIF</p>
              </>
            )}
          </div>
        </label>
      )}

      <p className="text-xs text-muted-foreground">
        支持八字、紫微、占星等各门派排盘图片，系统将自动识别时辰信息。
      </p>
    </div>
  );
}
