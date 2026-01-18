
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';
import RegionBadge from '@/components/common/RegionBadge';

interface UserAvatarProps {
  user: {
    name: string;
    avatar?: string;
    country?: string;
    region?: string;
    isPro?: boolean;
    bio?: string;
  };
  size?: 'small' | 'default' | 'large';
  showHoverCard?: boolean;
  className?: string;
}

export default function UserAvatar({
  user,
  size = 'default',
  showHoverCard = true,
  className = '',
}: UserAvatarProps) {
  const sizeClasses = {
    small: 'h-8 w-8',
    default: 'h-10 w-10',
    large: 'h-16 w-16',
  };

  const avatarElement = (
    <div className={`relative inline-block ${className}`}>
      <Avatar className={`${sizeClasses[size]} ${user.isPro ? 'ring-2 ring-accent glow-accent' : ''}`}>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="bg-primary text-primary-foreground">
          {user.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      {user.isPro && (
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
          <SafeIcon name="Crown" className="w-3 h-3 text-accent-foreground" />
        </div>
      )}
      {user.country && size !== 'small' && (
        <div className="absolute -bottom-1 -right-1 text-lg">
          {getFlagEmoji(user.country)}
        </div>
      )}
    </div>
  );

  if (!showHoverCard) {
    return avatarElement;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="cursor-pointer">{avatarElement}</button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-semibold">{user.name}</h4>
              {user.isPro && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  <SafeIcon name="Crown" className="w-3 h-3 mr-1" />
                  Pro命理师
                </Badge>
              )}
            </div>
            {user.bio && (
              <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p>
            )}
            <div className="flex items-center space-x-2">
              {user.country && <RegionBadge country={user.country} region={user.region} />}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
