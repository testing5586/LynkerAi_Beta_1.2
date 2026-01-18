import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import SafeIcon from '@/components/common/SafeIcon';

interface AppointmentLink {
  linkId: string;
  title: string;
  serviceType: string;
  duration: number;
  price: number;
  description: string;
  availableSlots: string[];
  createdDate: string;
  linkUrl: string;
  isActive: boolean;
  bookingCount: number;
}

interface LinkManagementTableProps {
  links: AppointmentLink[];
  onDelete: (linkId: string) => void;
  onToggleActive: (linkId: string) => void;
  onPreview: (link: AppointmentLink) => void;
}

const ITEMS_PER_PAGE = 4;

export default function LinkManagementTable({
  links,
  onDelete,
  onToggleActive,
  onPreview,
}: LinkManagementTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  // Calculate pagination
  const totalPages = Math.ceil(links.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const paginatedLinks = useMemo(() => 
    links.slice(startIndex, endIndex), 
    [links, startIndex, endIndex]
  );

  // Generate page numbers for pagination
  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  return (
    <div className="space-y-4">
      {/* Links Grid - Compact Layout with 2 columns on large screens, 1 on mobile */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {paginatedLinks.map((link, index) => (
          <Card key={link.linkId} className="glass-card p-3 hover:shadow-card transition-shadow">
            <div className="space-y-2">
              {/* Number Badge and Title */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {startIndex + index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{link.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {link.description}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={link.isActive ? 'default' : 'secondary'} 
                  className="text-xs flex-shrink-0"
                >
                  {link.isActive ? '活跃' : '已停用'}
                </Badge>
              </div>

              {/* Details Grid - Compact 2x2 */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
                <div>
                  <p className="text-xs text-muted-foreground">服务类型</p>
                  <p className="text-xs font-medium">{link.serviceType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">价格</p>
                  <p className="text-xs font-medium">¥{link.price}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">时长</p>
                  <p className="text-xs font-medium">{link.duration}分钟</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">预约数</p>
                  <p className="text-xs font-medium text-accent">{link.bookingCount}</p>
                </div>
              </div>

              {/* Available Slots - Show first 2, truncate rest */}
              {link.availableSlots.length > 0 && (
                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">时间段</p>
                  <div className="flex flex-wrap gap-1">
                    {link.availableSlots.slice(0, 2).map((slot, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs py-0.5 px-1.5">
                        <SafeIcon name="Clock" className="w-2.5 h-2.5 mr-0.5" />
                        {slot}
                      </Badge>
                    ))}
                    {link.availableSlots.length > 2 && (
                      <Badge variant="outline" className="text-xs py-0.5 px-1.5 text-muted-foreground">
                        +{link.availableSlots.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Footer with date and actions */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground truncate">
                  {link.createdDate}
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <SafeIcon name="MoreVertical" className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => onPreview(link)} className="text-xs cursor-pointer">
                      <SafeIcon name="Eye" className="mr-2 h-3.5 w-3.5" />
                      预览
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopyLink(link.linkUrl)} className="text-xs cursor-pointer">
                      <SafeIcon name="Copy" className="mr-2 h-3.5 w-3.5" />
                      复制链接
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-xs cursor-pointer">
                      <a href={link.linkUrl} target="_blank" rel="noopener noreferrer">
                        <SafeIcon name="ExternalLink" className="mr-2 h-3.5 w-3.5" />
                        在新标签页打开
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onToggleActive(link.linkId)} 
                      className="text-xs cursor-pointer"
                    >
                      <SafeIcon 
                        name={link.isActive ? 'Pause' : 'Play'} 
                        className="mr-2 h-3.5 w-3.5" 
                      />
                      {link.isActive ? '停用' : '启用'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(link.linkId)}
                      className="text-xs text-destructive cursor-pointer"
                    >
                      <SafeIcon name="Trash2" className="mr-2 h-3.5 w-3.5" />
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>

              {pageNumbers.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    isActive={page === currentPage}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}