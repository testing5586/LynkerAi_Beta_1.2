
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import type { SavedMemoryModel } from '@/data/guru_knowledge'

interface SavedMemoryListProps {
  memories: SavedMemoryModel[]
  selectedMemory: SavedMemoryModel | null
  onSelectMemory: (memory: SavedMemoryModel) => void
  onDeleteMemory: (id: string) => void
  currentPage?: number
  itemsPerPage?: number
}

export default function SavedMemoryList({
  memories,
  selectedMemory,
  onSelectMemory,
  onDeleteMemory,
  currentPage = 1,
  itemsPerPage = 8,
}: SavedMemoryListProps) {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedMemories = memories.slice(startIndex, endIndex)
if (memories.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <div className="text-center space-y-2">
          <SafeIcon name="Inbox" className="w-8 h-8 text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground">暂无记忆</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2 p-4">
{paginatedMemories.map((memory, index) => (
        <div
          key={memory.memoryId}
          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
            selectedMemory?.memoryId === memory.memoryId
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50 bg-card/50'
          }`}
          onClick={() => onSelectMemory(memory)}
        >
          {/* Number and Delete */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{startIndex + index + 1}</span>
              </div>
              {memory.tag && (
                <Badge variant="secondary" className="text-xs">
                  {memory.tag}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteMemory(memory.memoryId)
              }}
            >
              <SafeIcon name="Trash2" className="w-4 h-4" />
            </Button>
          </div>

          {/* Content Preview */}
          <p className="text-sm text-foreground line-clamp-2 mb-2">
            {memory.content}
          </p>

          {/* Source and Time */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <SafeIcon name="Link2" className="w-3 h-3" />
              {memory.sourceContext}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <SafeIcon name="Clock" className="w-3 h-3" />
              {formatDate(memory.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return '刚刚'
  if (diffMins < 60) return `${diffMins}分钟前`
  if (diffHours < 24) return `${diffHours}小时前`
  if (diffDays < 7) return `${diffDays}天前`

  return date.toLocaleDateString('zh-CN')
}
