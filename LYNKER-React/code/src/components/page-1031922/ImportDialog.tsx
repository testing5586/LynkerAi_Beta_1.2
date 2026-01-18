
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import SafeIcon from '@/components/common/SafeIcon';

interface ImportDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCreateTopic?: (title: string) => void;
  onImportNote?: (title: string, url: string) => void;
}

export default function ImportDialog({
  open = false,
  onOpenChange,
  onCreateTopic,
  onImportNote,
}: ImportDialogProps) {
  const [activeTab, setActiveTab] = useState('topic');
  const [topicTitle, setTopicTitle] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteUrl, setNoteUrl] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');

  const handleCreateTopic = () => {
    if (topicTitle.trim()) {
      onCreateTopic?.(topicTitle);
      setTopicTitle('');
    }
  };

  const handleImportNote = () => {
    if (noteTitle.trim() && noteUrl.trim()) {
      onImportNote?.(noteTitle, noteUrl);
      setNoteTitle('');
      setNoteUrl('');
    }
  };

  const handleImportMarkdown = () => {
    if (noteTitle.trim() && markdownContent.trim()) {
      onImportNote?.(noteTitle, 'markdown');
      setNoteTitle('');
      setMarkdownContent('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SafeIcon name="Plus" className="h-5 w-5" />
            导入内容到知识库
          </DialogTitle>
          <DialogDescription>
            创建新的研究主题或导入外部文章、视频链接、Markdown文件
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="topic">创建主题</TabsTrigger>
            <TabsTrigger value="url">导入链接</TabsTrigger>
            <TabsTrigger value="markdown">导入Markdown</TabsTrigger>
          </TabsList>

          {/* Create Topic Tab */}
          <TabsContent value="topic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic-title">研究主题名称</Label>
              <Input
                id="topic-title"
                placeholder="例如：现代社会婚姻模式对紫微夫妻宫的影响调研"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              创建一个新的研究主题，用于组织和管理相关的命理研究内容。
            </p>
          </TabsContent>

          {/* Import URL Tab */}
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="note-title">笔记标题</Label>
              <Input
                id="note-title"
                placeholder="输入笔记标题"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="note-url">文章/视频链接</Label>
              <Input
                id="note-url"
                placeholder="https://example.com/article"
                value={noteUrl}
                onChange={(e) => setNoteUrl(e.target.value)}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              支持导入文章链接、视频链接等外部资源。系统将自动提取内容。
            </p>
          </TabsContent>

{/* Import Markdown Tab */}
           <TabsContent value="markdown" className="space-y-4">
             <div className="space-y-2">
               <Label htmlFor="md-title">笔记标题</Label>
               <Input
                 id="md-title"
                 placeholder="输入笔记标题"
                 value={noteTitle}
                 onChange={(e) => setNoteTitle(e.target.value)}
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="md-content">Markdown内容或复制粘贴文本</Label>
               <Textarea
                 id="md-content"
                 placeholder="可复制粘贴Markdown格式内容、AI笔记、网页文章等任何文本内容。支持代码块、表格等格式。"
                 value={markdownContent}
                 onChange={(e) => setMarkdownContent(e.target.value)}
                 className="min-h-[200px] font-mono text-sm"
              />
             </div>
             <div className="bg-muted/50 p-3 rounded-md border border-muted-foreground/20">
               <p className="text-xs text-muted-foreground leading-relaxed">
                 <strong>💡 使用提示：</strong>
                 <br />
                 1. 从浏览器复制网页内容，粘贴到此框
                 <br />
                 2. 复制AI生成的markdown笔记并粘贴
                 <br />
                 3. 支持任何纯文本格式（Markdown、纯文本均可）
                 <br />
                 4. 内容将自动保存到您的知识库
               </p>
             </div>
           </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            取消
          </Button>
          <Button
            className="bg-mystical-gradient hover:opacity-90"
            onClick={() => {
              if (activeTab === 'topic') {
                handleCreateTopic();
              } else if (activeTab === 'url') {
                handleImportNote();
              } else {
                handleImportMarkdown();
              }
              onOpenChange?.(false);
            }}
          >
            <SafeIcon name="Check" className="h-4 w-4 mr-2" />
            {activeTab === 'topic' ? '创建主题' : '导入内容'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
