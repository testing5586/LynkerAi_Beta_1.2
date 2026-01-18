
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';

interface BlackboxSecurityOverlayProps {
  onSecurityViolation?: (type: string) => void;
}

export default function BlackboxSecurityOverlay({
  onSecurityViolation,
}: BlackboxSecurityOverlayProps) {
  const [violations, setViolations] = useState<string[]>([]);

  useEffect(() => {
    // Monitor for security violations
    const handleViolation = (type: string) => {
      setViolations((prev) => [...prev, type]);
      onSecurityViolation?.(type);

      // Clear violation after 3 seconds
      setTimeout(() => {
        setViolations((prev) => prev.filter((v) => v !== type));
      }, 3000);
    };

    // Detect copy attempts
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      handleViolation('copy');
    };

    // Detect screenshot attempts (limited detection)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        handleViolation('screenshot');
      }
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSecurityViolation]);

  if (violations.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {violations.map((violation, index) => (
        <Alert
          key={`${violation}-${index}`}
          variant="destructive"
          className="animate-in slide-in-from-top-2"
        >
          <SafeIcon name="AlertTriangle" className="h-4 w-4" />
          <AlertDescription>
            {violation === 'copy' && '复制功能已禁用'}
            {violation === 'screenshot' && '截图功能已禁用'}
            {violation === 'inspect' && '开发者工具已禁用'}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
