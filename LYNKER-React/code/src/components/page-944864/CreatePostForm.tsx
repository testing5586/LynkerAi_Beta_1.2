import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import UserAvatar from '@/components/common/UserAvatar';
import MediaUploadPreview from '@/components/page-944864/MediaUploadPreview';
import PostPreview from '@/components/page-944864/PostPreview';
import TemplateSelector from '@/components/page-944864/TemplateSelector';
import TagInput from '@/components/page-944864/TagInput';
import { MOCK_USER_ALIASES } from '@/data/base-mock';
import { PUBLISH_TEMPLATES } from '@/components/page-944864/PublishTemplate';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
}

const MAX_CONTENT_LENGTH = 5000;
const MAX_MEDIA_COUNT = 9;
const CURRENT_USER = {
  name: MOCK_USER_ALIASES[0],
  avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/3c9e49f2-e0e3-43dd-944f-70f660fd19c9.png',
  country: 'CN',
  region: '广东深圳',
};

export default function CreatePostForm() {
  const [content, setContent] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('mysterious');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showTemplates, setShowTemplates] = useState(true);

  const contentLength = content.length;
  const contentPercentage = (contentLength / MAX_CONTENT_LENGTH) * 100;
  const canAddMedia = mediaItems.length < MAX_MEDIA_COUNT;
  const currentTemplate = PUBLISH_TEMPLATES.find(t => t.id === selectedTemplate);

  const handleAddMedia = (newMedia: MediaItem) => {
    if (!canAddMedia) {
      setError(`最多只能上传${MAX_MEDIA_COUNT}个媒体文件`);
      return;
    }
    setMediaItems([...mediaItems, newMedia]);
    setError('');
  };

  const handleRemoveMedia = (id: string) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
  };

  const handlePublish = async () => {
    if (!content.trim()) {
      setError('请输入动态内容');
      return;
    }

    if (contentLength > MAX_CONTENT_LENGTH) {
      setError(`内容超过${MAX_CONTENT_LENGTH}字符限制`);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In real app, would send to backend
      console.log('Publishing post:', { content, mediaItems, selectedTemplate, selectedTags });
      
      // Redirect to social feed
      window.location.href = './page-944865.html';
    }, 1000);
  };

  const handleCancel = () => {
    if (content.trim() || mediaItems.length > 0) {
      if (confirm('确定要放弃发布吗？您的内容将不会被保存。')) {
        window.location.href = './page-944865.html';
      }
    } else {
      window.location.href = './page-944865.html';
    }
  };

return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">发布新动态</h1>
          <p className="text-base text-muted-foreground mt-2 leading-relaxed">分享您的想法、图片或视频到灵友圈</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          className="h-10 w-10 rounded-lg"
        >
          <SafeIcon name="X" className="h-5 w-5" />
        </Button>
      </div>

      {/* User Info Card */}
      <Card className="glass-card rounded-2xl border-2 border-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <UserAvatar user={CURRENT_USER} size="large" showHoverCard={false} />
            <div>
              <h3 className="font-bold text-lg text-foreground">{CURRENT_USER.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {CURRENT_USER.region} • 中国
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Templates */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
          </div>
        </div>

        {/* Right Column - Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="rounded-2xl border-2">
              <SafeIcon name="AlertCircle" className="h-4 w-4" />
              <AlertDescription className="text-base font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {/* Content Editor */}
          <Card className="glass-card rounded-2xl border-2 border-muted/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">动态内容</CardTitle>
              <CardDescription className="text-base">
                最多{MAX_CONTENT_LENGTH}个字符
              </CardDescription>
            </CardHeader>
<CardContent className="space-y-5">
              <Textarea
                placeholder="分享您的想法、感受或命理见解...（支持@提及朋友）"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setError('');
                }}
                className="min-h-[220px] resize-none rounded-xl text-base leading-relaxed"
                maxLength={MAX_CONTENT_LENGTH}
              />

              {/* Character Count */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className={contentLength > MAX_CONTENT_LENGTH * 0.9 ? 'text-accent' : 'text-muted-foreground'}>
                    {contentLength} / {MAX_CONTENT_LENGTH}
                  </span>
                  <span className="text-muted-foreground">
                    {contentPercentage.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      contentPercentage > 90 ? 'bg-accent' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min(contentPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <TagInput
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />

          {/* Media Upload */}
          <MediaUploadPreview
            mediaItems={mediaItems}
            onAddMedia={handleAddMedia}
            onRemoveMedia={handleRemoveMedia}
            canAddMore={canAddMedia}
            maxCount={MAX_MEDIA_COUNT}
          />

          {/* Preview Section */}
          {(content.trim() || mediaItems.length > 0) && (
            <Card className="glass-card border-2 border-accent/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground flex items-center space-x-2">
                  <SafeIcon name="Eye" className="h-6 w-6" />
                  <span>预览</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PostPreview
                  user={CURRENT_USER}
                  content={content}
                  mediaItems={mediaItems}
                  template={currentTemplate}
                  tags={selectedTags}
                />
              </CardContent>
            </Card>
          )}

{/* Action Buttons */}
          <div className="flex items-center justify-between gap-4 sticky bottom-0 bg-background/80 backdrop-blur-sm p-6 -mx-6 rounded-t-2xl border-t-2 border-muted/50">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="rounded-lg font-semibold text-base"
            >
              <SafeIcon name="X" className="mr-2 h-4 w-4" />
              取消
            </Button>

            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-muted rounded-lg text-sm font-semibold py-2 px-3">
                <SafeIcon name="Image" className="mr-2 h-4 w-4" />
                {mediaItems.length}/{MAX_MEDIA_COUNT}
              </Badge>

              <Badge variant="secondary" className="bg-muted rounded-lg text-sm font-semibold py-2 px-3">
                <SafeIcon name="Tag" className="mr-2 h-4 w-4" />
                {selectedTags.length}个标签
              </Badge>

              <Button
                onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                variant="outline"
                disabled={!content.trim() && mediaItems.length === 0}
                className="rounded-lg font-semibold text-base"
              >
                <SafeIcon name="Eye" className="mr-2 h-4 w-4" />
                预览
              </Button>

              <Button
                onClick={handlePublish}
                disabled={isSubmitting || (!content.trim() && mediaItems.length === 0)}
                className="bg-mystical-gradient hover:opacity-90 min-w-[140px] rounded-lg font-semibold text-base"
              >
                {isSubmitting ? (
                  <>
                    <SafeIcon name="Loader" className="mr-2 h-4 w-4 animate-spin" />
                    发布中...
                  </>
                ) : (
                  <>
                    <SafeIcon name="Send" className="mr-2 h-4 w-4" />
                    发布动态
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}