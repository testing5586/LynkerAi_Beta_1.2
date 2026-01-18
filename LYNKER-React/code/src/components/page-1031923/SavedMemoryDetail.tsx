
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import SafeIcon from '@/components/common/SafeIcon'
import type { SavedMemoryModel } from '@/data/guru_knowledge'

interface SavedMemoryDetailProps {
  memory: SavedMemoryModel
  onUpdate: (memory: SavedMemoryModel) => void
  onDelete: () => void
}

export default function SavedMemoryDetail({
  memory,
  onUpdate,
  onDelete,
}: SavedMemoryDetailProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(memory.content)
  const [editedTag, setEditedTag] = useState(memory.tag || '')

  const handleSave = () => {
    onUpdate({
      ...memory,
      content: editedContent,
      tag: editedTag || undefined,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedContent(memory.content)
    setEditedTag(memory.tag || '')
    setIsEditing(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(memory.content)
    // Show toast notification
  }

  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="text-lg font-semibold">记忆详情</h3>
        <div className="flex items-center gap-2">
          {!isEditing && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                <SafeIcon name="Copy" className="w-4 h-4" />
                复制
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <SafeIcon name="Edit" className="w-4 h-4" />
                编辑
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onDelete}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <SafeIcon name="Trash2" className="w-4 h-4" />
                删除
              </Button>
            </>
          )}
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Content */}
      <ScrollArea className="flex-1 mb-4">
        <div className="space-y-4 pr-4">
          {/* Source Info */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">来源</p>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <SafeIcon name="Link2" className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-foreground">{memory.sourceContext}</p>
            </div>
          </div>

          {/* Timestamp */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">保存时间</p>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <SafeIcon name="Clock" className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-foreground">{formatFullDate(memory.timestamp)}</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">内容</p>
            {isEditing ? (
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-32 resize-none"
                placeholder="编辑记忆内容..."
              />
            ) : (
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-foreground whitespace-pre-wrap break-words">
                  {memory.content}
                </p>
              </div>
            )}
          </div>

          {/* Tag */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">标签</p>
            {isEditing ? (
              <Input
                value={editedTag}
                onChange={(e) => setEditedTag(e.target.value)}
                placeholder="添加标签（可选）"
                className="text-sm"
              />
            ) : (
              <div>
                {memory.tag ? (
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    {memory.tag}
                  </Badge>
                ) : (
                  <p className="text-sm text-muted-foreground">未添加标签</p>
                )}
              </div>
            )}
          </div>

          {/* AI Usage Info */}
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 space-y-2">
            <p className="text-xs font-semibold text-accent flex items-center gap-2">
              <SafeIcon name="Zap" className="w-4 h-4" />
              AI知识依据
            </p>
            <p className="text-xs text-muted-foreground">
              此记忆已被您的专属AI助手学习，将在后续分析中作为知识依据使用。
            </p>
          </div>
        </div>
      </ScrollArea>

      {/* Actions */}
      {isEditing && (
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1"
          >
            取消
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-mystical-gradient hover:opacity-90"
          >
            保存
          </Button>
        </div>
      )}
    </div>
  )
}

function formatFullDate(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
