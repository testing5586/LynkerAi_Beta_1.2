import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SafeIcon from '@/components/common/SafeIcon';
import TagInput from '@/components/create-post/TagInput';
import ImageUploader from '@/components/create-post/ImageUploader';

interface PostData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  images: string[];
  isArticle: boolean;
}

interface CreatePostFormProps {
  postData: PostData;
  onPostDataChange: (data: PostData) => void;
  isPro: boolean;
}

const categories = [
  { value: 'general', label: '综合讨论' },
  { value: 'bazi', label: '八字命理' },
  { value: 'ziwei', label: '紫微斗数' },
  { value: 'astrology', label: '占星学' },
  { value: 'experience', label: '经验分享' },
  { value: 'question', label: '问题求助' },
  { value: 'research', label: '研究探讨' },
];

export default function CreatePostForm({
  postData,
  onPostDataChange,
  isPro,
}: CreatePostFormProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPostDataChange({
      ...postData,
      title: e.target.value,
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onPostDataChange({
      ...postData,
      content: e.target.value,
    });
  };

  const handleCategoryChange = (value: string) => {
    onPostDataChange({
      ...postData,
      category: value,
    });
  };

  const handleTagsChange = (tags: string[]) => {
    onPostDataChange({
      ...postData,
      tags,
    });
  };

  const handleImagesChange = (images: string[]) => {
    onPostDataChange({
      ...postData,
      images,
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = postData.images.filter((_, i) => i !== index);
    onPostDataChange({
      ...postData,
      images: newImages,
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">标题 *</label>
        <Input
          placeholder="输入帖子标题（最多100字）"
          value={postData.title}
          onChange={handleTitleChange}
          maxLength={100}
          className="bg-background/50 border-primary/20"
        />
        <p className="text-xs text-muted-foreground">
          {postData.title.length}/100
        </p>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">分类 *</label>
        <Select value={postData.category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="bg-background/50 border-primary/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">内容 *</label>
        <Textarea
          placeholder="输入帖子内容（支持Markdown格式）&#10;&#10;提示：&#10;# 标题&#10;**粗体** *斜体*&#10;- 列表项&#10;&gt; 引用&#10;`代码`"
          value={postData.content}
          onChange={handleContentChange}
          rows={12}
          className="bg-background/50 border-primary/20 font-mono text-sm resize-none"
        />
        <p className="text-xs text-muted-foreground">
          {postData.content.length} 字符
        </p>
      </div>

      {/* Images */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">图片（可选）</label>
        <ImageUploader
          images={postData.images}
          onImagesChange={handleImagesChange}
          maxImages={5}
        />
        {postData.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
            {postData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`上传的图片 ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-primary/20"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                >
                  <SafeIcon name="X" className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">标签（可选）</label>
        <TagInput
          tags={postData.tags}
          onTagsChange={handleTagsChange}
          maxTags={5}
        />
        <p className="text-xs text-muted-foreground">
          最多添加5个标签，便于其他用户发现您的内容
        </p>
      </div>

      {/* Pro Options */}
      {isPro && (
        <Card className="bg-accent/10 border-accent/30 p-4">
          <div className="flex items-start space-x-3">
            <SafeIcon name="Crown" className="h-5 w-5 text-accent mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-2">Pro命理师选项</h4>
              <p className="text-sm text-muted-foreground mb-3">
                作为Pro命理师，您可以发布专业文章，获得更高的曝光度和信任度。
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isArticle"
                  checked={postData.isArticle}
                  onChange={(e) =>
                    onPostDataChange({
                      ...postData,
                      isArticle: e.target.checked,
                    })
                  }
                  className="rounded border-primary/20"
                />
                <label htmlFor="isArticle" className="text-sm cursor-pointer">
                  发布为专业文章（获得更高曝光）
                </label>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Content Tips */}
      <Card className="bg-primary/5 border-primary/20 p-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center space-x-2">
            <SafeIcon name="Info" className="h-4 w-4" />
            <span>Markdown格式支持</span>
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <p className="font-mono bg-background/50 p-1 rounded mb-1">
                # 标题
              </p>
              <p className="font-mono bg-background/50 p-1 rounded mb-1">
                **粗体**
              </p>
            </div>
            <div>
              <p className="font-mono bg-background/50 p-1 rounded mb-1">
                - 列表
              </p>
              <p className="font-mono bg-background/50 p-1 rounded mb-1">
                &gt; 引用
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}