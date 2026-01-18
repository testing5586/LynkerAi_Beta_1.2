
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SafeIcon from '@/components/common/SafeIcon';
import RegionBadge from '@/components/common/RegionBadge';
import type { MasterSummaryModel } from '@/data/user';

interface MasterCardProps {
  master: MasterSummaryModel;
}

export default function MasterCard({ master }: MasterCardProps) {
  const handleViewProfile = () => {
    // In a real app, you'd pass the master ID via query params or state
    window.location.href = `./master-profile.html?id=${master.masterId}`;
  };

  return (
    <Card className="glass-card hover:shadow-card transition-all duration-300 overflow-hidden group">
      {/* Header with Avatar */}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <Avatar className="h-16 w-16 ring-2 ring-accent glow-accent">
            <AvatarImage src={master.avatarUrl} alt={master.realName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {master.realName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="text-2xl">
            {getFlagEmoji(master.geoTag.flagIcon)}
          </div>
        </div>

        {/* Name and Title */}
        <div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
            {master.alias}
          </h3>
          <p className="text-xs text-muted-foreground">
            {master.realName}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <SafeIcon
                key={i}
                name="Star"
                className={`h-4 w-4 ${
                  i < Math.floor(master.rating)
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-accent">{master.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({master.serviceCount} 次服务)
          </span>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4">
        {/* Expertise */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">专长领域</p>
          <div className="flex flex-wrap gap-2">
            {master.expertise.split(',').map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {skill.trim()}
              </Badge>
            ))}
          </div>
        </div>

        {/* Region */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">地区</p>
          <RegionBadge
            country={master.geoTag.flagIcon}
            region={master.geoTag.region}
            size="small"
          />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">起价</p>
            <p className="text-lg font-bold text-accent">
              ¥{master.priceMin}
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleViewProfile}
            className="bg-mystical-gradient hover:opacity-90 text-white"
          >
            <span>查看档案</span>
            <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
