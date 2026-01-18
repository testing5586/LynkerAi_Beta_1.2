
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeIcon from '@/components/common/SafeIcon';
import CreatePostForm from '@/components/create-post/CreatePostForm';
import PostPreview from '@/components/create-post/PostPreview';

interface PostData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  images: string[];
  isArticle: boolean;
}

const initialPostData: PostData = {
  title: '',
  content: '',
  category: 'general',
  tags: [],
  images: [],
  isArticle: false,
};

export default function CreatePostContent() {
  const [postData, setPostData] = useState<PostData>(initialPostData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');

  // Mock user data
  const user = {
    name: '灵客用户',
    isPro: false,
    avatar: 'https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/12/f3559455-67d0-4e45-b60a-909f00bc66b3.png',
  };

  const handleSubmit = async () => {
    if (!postData.title.trim() || !postData.content.trim()) {
      alert('请填写标题和内容');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Redirect to moderation queue
      window.location.href = './post-moderation-queue.html';
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (postData.title || postData.content) {
      if (confirm('确定要放弃编辑吗？')) {
        window.location.href = './forum-homepage.html';
      }
    } else {
      window.location.href = './forum-homepage.html';
    }
  };

  return (
    <div className="container max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.href = './forum-homepage.html'}
          >
            <SafeIcon name="ArrowLeft" className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gradient-mystical">发布新帖</h1>
            <p className="text-muted-foreground mt-1">
              {user.isPro ? '分享您的命理见解和研究成果' : '分享您的命理经历和感悟'}
            </p>
          </div>
        </div>
      </div>

      {/* User Info Card */}
      <Card className="glass-card mb-6 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{user.name}</h3>
                {user.isPro && (
                  <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                    <SafeIcon name="Crown" className="h-3 w-3" />
                    <span>Pro命理师</span>
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {user.isPro ? '您的文章将在审核后发布' : '您的帖子将在审核后发布'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Editor */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle>编辑内容</CardTitle>
          <CardDescription>
            支持Markdown格式，可添加图片和标签
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="edit" className="flex items-center space-x-2">
                <SafeIcon name="Edit" className="h-4 w-4" />
                <span>编辑</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center space-x-2">
                <SafeIcon name="Eye" className="h-4 w-4" />
                <span>预览</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="space-y-6">
              <CreatePostForm
                postData={postData}
                onPostDataChange={setPostData}
                isPro={user.isPro}
              />
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              <PostPreview
                postData={postData}
                userName={user.name}
                userAvatar={user.avatar}
                isPro={user.isPro}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-8 gap-4">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          <SafeIcon name="X" className="mr-2 h-4 w-4" />
          取消
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setPostData(initialPostData)}
            disabled={isSubmitting}
          >
            <SafeIcon name="RotateCcw" className="mr-2 h-4 w-4" />
            重置
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !postData.title.trim() || !postData.content.trim()}
            className="bg-mystical-gradient hover:opacity-90"
          >
            {isSubmitting ? (
              <>
                <SafeIcon name="Loader" className="mr-2 h-4 w-4 animate-spin" />
                提交中...
              </>
            ) : (
              <>
                <SafeIcon name="Send" className="mr-2 h-4 w-4" />
                提交审核
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tips */}
      <Card className="glass-card mt-8 border-accent/20 bg-accent/5">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center space-x-2">
              <SafeIcon name="Lightbulb" className="h-4 w-4 text-accent" />
              <span>发帖建议</span>
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
              <li>• 标题要清晰明了，能准确概括内容</li>
              <li>• 内容要真实有据，避免虚假宣传</li>
              <li>• 使用相关标签便于其他用户发现</li>
              <li>• 遵守社区规则，尊重他人隐私</li>
              <li>• 提供有价值的见解和经验分享</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
