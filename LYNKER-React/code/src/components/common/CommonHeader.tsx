
import Header from '@/components/common/Header';

interface CommonHeaderProps {
  variant?: 'default' | 'minimal';
  currentPath?: string;
}

export default function CommonHeader({ variant = 'default', currentPath = '/' }: CommonHeaderProps) {
  return <Header variant={variant} currentPath={currentPath} />;
}
