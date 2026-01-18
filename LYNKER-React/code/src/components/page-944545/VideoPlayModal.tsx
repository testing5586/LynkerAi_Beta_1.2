import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import SafeIcon from '@/components/common/SafeIcon';

interface VideoPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export default function VideoPlayModal({
  isOpen,
  onClose,
  videoUrl,
  title,
}: VideoPlayModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" showOverlay={true}>
        <div className="relative w-full bg-black rounded-lg overflow-hidden">
          <div className="aspect-video flex items-center justify-center bg-black">
            <iframe
              width="100%"
              height="100%"
              src={videoUrl.replace('watch?v=', 'embed/')}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <DialogClose className="absolute right-4 top-4 z-10 p-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity">
          <SafeIcon name="X" className="h-4 w-4" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}