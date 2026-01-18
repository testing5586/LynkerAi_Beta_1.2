'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'
import SafeIcon from '@/components/common/SafeIcon'
import SavedMemoryList from './SavedMemoryList'
import SavedMemoryDetail from './SavedMemoryDetail'
import type { SavedMemoryModel } from '@/data/guru_knowledge'
import { MOCK_SAVED_MEMORIES } from '@/data/guru_knowledge'

const ITEMS_PER_PAGE = 8

export default function SavedMemoryPage() {
  const [memories, setMemories] = useState<SavedMemoryModel[]>(MOCK_SAVED_MEMORIES)
  const [selectedMemory, setSelectedMemory] = useState<SavedMemoryModel | null>(MOCK_SAVED_MEMORIES[0] || null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTag, setFilterTag] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Get all unique tags
  const allTags = Array.from(new Set(memories.map(m => m.tag).filter(Boolean)))

  // Filter memories based on search and tag
  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          memory.sourceContext.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !filterTag || memory.tag === filterTag
    return matchesSearch && matchesTag
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredMemories.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedMemories = filteredMemories.slice(startIndex, endIndex)

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filterTag])

  const handleDeleteMemory = (id: string) => {
    setDeleteTargetId(id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (deleteTargetId) {
      const newMemories = memories.filter(m => m.memoryId !== deleteTargetId)
      setMemories(newMemories)
      if (selectedMemory?.memoryId === deleteTargetId) {
        setSelectedMemory(newMemories[0] || null)
      }
    }
    setShowDeleteConfirm(false)
    setDeleteTargetId(null)
  }

  const handleUpdateMemory = (updatedMemory: SavedMemoryModel) => {
    setMemories(memories.map(m => m.memoryId === updatedMemory.memoryId ? updatedMemory : m))
    setSelectedMemory(updatedMemory)
  }

  return (
    <div className="w-full h-[calc(100vh-64px)] flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="border-b px-6 py-4 flex-shrink-0 bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient-mystical flex items-center gap-2">
              <SafeIcon name="Brain" className="w-6 h-6" />
              记忆库
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              管理从聊天、文章、论坛提取的知识片段
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden gap-0">
        {/* Left Panel - Memory List */}
        <div className="w-1/3 border-r flex flex-col bg-card/50">
          {/* Search and Filter */}
          <div className="p-4 border-b space-y-3 flex-shrink-0">
            <div className="relative">
              <SafeIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索记忆..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">标签筛选</p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={filterTag === null ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFilterTag(null)}
                  >
                    全部 ({memories.length})
                  </Badge>
{allTags.filter(tag => !['高风险预警', '丁火身强'].includes(tag)).map(tag => (
                    <Badge
                      key={tag}
                      variant={filterTag === tag ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setFilterTag(tag)}
                    >
                      {tag} ({memories.filter(m => m.tag === tag).length})
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              共 {filteredMemories.length} 条记忆
            </div>
          </div>

          {/* Memory List */}
          <div className="flex flex-col flex-1">
            <ScrollArea className="flex-1">
              <SavedMemoryList
                memories={filteredMemories}
                selectedMemory={selectedMemory}
                onSelectMemory={setSelectedMemory}
                onDeleteMemory={handleDeleteMemory}
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </ScrollArea>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="border-t p-4 flex-shrink-0 bg-card/30">
                <Pagination>
                  <PaginationContent className="justify-between w-full gap-1">
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                    <div className="flex items-center gap-1 flex-wrap justify-center">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={currentPage === page}
                            onClick={() => setCurrentPage(page)}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </div>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationContent>
                </Pagination>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  第 {currentPage} 页，共 {totalPages} 页 ({filteredMemories.length} 条记忆)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Memory Detail */}
        <div className="w-2/3 flex flex-col bg-background/50">
          {selectedMemory ? (
            <SavedMemoryDetail
              memory={selectedMemory}
              onUpdate={handleUpdateMemory}
              onDelete={() => handleDeleteMemory(selectedMemory.memoryId)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
                  <SafeIcon name="BookOpen" className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">选择一条记忆查看详情</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border rounded-lg p-6 max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <SafeIcon name="AlertTriangle" className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-semibold">删除记忆</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              确定要删除这条记忆吗？此操作无法撤销。
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                取消
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
              >
                删除
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}