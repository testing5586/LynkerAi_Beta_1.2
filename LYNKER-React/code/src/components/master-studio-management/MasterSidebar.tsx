
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_MASTER_PROFILE } from '@/data/user';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: string;
}

export default function MasterSidebar() {
  const [activeItem, setActiveItem] = useState('studio');

  return (
    <aside className="w-64 border-r bg-sidebar flex flex-col h-full">
    </aside>
  );
}
