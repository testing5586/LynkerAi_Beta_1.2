
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

interface MemoryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function MemoryPagination({
  currentPage,
  totalPages,
  onPageChange,
}: MemoryPaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

return (
     <div className="flex items-center justify-between gap-2 flex-wrap">
       <div className="text-xs text-muted-foreground">
         第 <span className="font-semibold text-foreground text-xs">{currentPage}</span> / {totalPages} 页
       </div>

       <div className="flex items-center gap-1 flex-wrap">
         <Button
           variant="outline"
           size="sm"
           onClick={() => onPageChange(currentPage - 1)}
           disabled={currentPage === 1}
           className="gap-1 h-7 px-2 text-xs"
         >
           <SafeIcon name="ChevronLeft" className="h-3 w-3" />
           上一页
         </Button>

         <div className="flex items-center gap-0.5">
           {getPageNumbers().map((page, index) => (
             <Button
               key={index}
               variant={page === currentPage ? 'default' : 'outline'}
               size="sm"
               onClick={() => typeof page === 'number' && onPageChange(page)}
               disabled={page === '...'}
               className={`h-7 w-7 p-0 text-xs ${
                 page === currentPage ? 'bg-mystical-gradient text-primary-foreground' : ''
               }`}
             >
               {page}
             </Button>
           ))}
         </div>

         <Button
           variant="outline"
           size="sm"
           onClick={() => onPageChange(currentPage + 1)}
           disabled={currentPage === totalPages}
           className="gap-1 h-7 px-2 text-xs"
         >
           下一页
           <SafeIcon name="ChevronRight" className="h-3 w-3" />
         </Button>
       </div>
     </div>
   );
}
