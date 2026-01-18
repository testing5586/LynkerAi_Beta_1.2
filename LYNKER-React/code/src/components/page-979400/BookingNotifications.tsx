
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Notification {
  id: string;
  type: 'reminder' | 'confirmed' | 'rescheduled' | 'cancelled';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  appointmentId: string;
}

interface BookingNotificationsProps {
  notifications: Notification[];
}

export default function BookingNotifications({ notifications }: BookingNotificationsProps) {
  const [readNotifications, setReadNotifications] = useState<Set<string>>(
    new Set(notifications.filter((n) => n.isRead).map((n) => n.id))
  );

  const unreadCount = notifications.filter((n) => !readNotifications.has(n.id)).length;

  const handleMarkAsRead = (id: string) => {
    setReadNotifications((prev) => new Set([...prev, id]));
  };

  const handleMarkAllAsRead = () => {
    setReadNotifications(new Set(notifications.map((n) => n.id)));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'Clock';
      case 'confirmed':
        return 'CheckCircle2';
      case 'rescheduled':
        return 'RefreshCw';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'text-yellow-500';
      case 'confirmed':
        return 'text-green-500';
      case 'rescheduled':
        return 'text-blue-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const getNotificationBadgeColor = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'bg-yellow-500/20 text-yellow-700';
      case 'confirmed':
        return 'bg-green-500/20 text-green-700';
      case 'rescheduled':
        return 'bg-blue-500/20 text-blue-700';
      case 'cancelled':
        return 'bg-red-500/20 text-red-700';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const unreadNotifications = notifications.filter((n) => !readNotifications.has(n.id));
  const readNotificationsList = notifications.filter((n) => readNotifications.has(n.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">通知中心</h2>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `您有 ${unreadCount} 条未读通知` : '所有通知已读'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead} className="gap-2">
            <SafeIcon name="CheckAll" className="h-4 w-4" />
            全部标记为已读
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="unread" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="unread" className="flex items-center space-x-2">
            <SafeIcon name="Bell" className="h-4 w-4" />
            <span>未读 ({unreadCount})</span>
          </TabsTrigger>
          <TabsTrigger value="read" className="flex items-center space-x-2">
            <SafeIcon name="CheckCircle2" className="h-4 w-4" />
            <span>已读 ({readNotificationsList.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Unread Notifications */}
        <TabsContent value="unread" className="space-y-3">
          {unreadNotifications.length > 0 ? (
            unreadNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                isRead={false}
                onMarkAsRead={() => handleMarkAsRead(notification.id)}
                getIcon={getNotificationIcon}
                getColor={getNotificationColor}
                getBadgeColor={getNotificationBadgeColor}
              />
            ))
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <SafeIcon name="Bell" className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground text-center">暂无未读通知</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Read Notifications */}
        <TabsContent value="read" className="space-y-3">
          {readNotificationsList.length > 0 ? (
            readNotificationsList.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                isRead={true}
                onMarkAsRead={() => {}}
                getIcon={getNotificationIcon}
                getColor={getNotificationColor}
                getBadgeColor={getNotificationBadgeColor}
              />
            ))
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <SafeIcon name="Archive" className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground text-center">暂无已读通知</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotificationCard({
  notification,
  isRead,
  onMarkAsRead,
  getIcon,
  getColor,
  getBadgeColor,
}: {
  notification: Notification;
  isRead: boolean;
  onMarkAsRead: () => void;
  getIcon: (type: string) => string;
  getColor: (type: string) => string;
  getBadgeColor: (type: string) => string;
}) {
  const notificationDate = new Date(notification.date);
  const formattedDate = notificationDate.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className={`glass-card transition-all ${!isRead ? 'border-primary/50 bg-primary/5' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`flex-shrink-0 mt-1 ${getColor(notification.type)}`}>
            <SafeIcon name={getIcon(notification.type)} className="h-6 w-6" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{notification.title}</h3>
              <Badge className={getBadgeColor(notification.type)}>{notification.type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
            <p className="text-xs text-muted-foreground/70">{formattedDate}</p>
          </div>

          {/* Actions */}
          <div className="flex-shrink-0 flex items-center gap-2">
            {!isRead && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAsRead}
                className="h-8 w-8 p-0"
                title="标记为已读"
              >
                <SafeIcon name="Check" className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              title="查看详情"
              asChild
            >
              <a href="./booking-appointment.html">
                <SafeIcon name="ChevronRight" className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
