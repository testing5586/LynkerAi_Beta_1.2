
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SafeIcon from '@/components/common/SafeIcon';

interface StudioInfoSectionProps {
  studioName: string;
  studioLocation: string;
  studioPhone: string;
  studioEmail: string;
  onStudioNameChange: (value: string) => void;
  onStudioLocationChange: (value: string) => void;
  onStudioPhoneChange: (value: string) => void;
  onStudioEmailChange: (value: string) => void;
}

export default function StudioInfoSection({
  studioName,
  studioLocation,
  studioPhone,
  studioEmail,
  onStudioNameChange,
  onStudioLocationChange,
  onStudioPhoneChange,
  onStudioEmailChange,
}: StudioInfoSectionProps) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <SafeIcon name="Building2" className="w-5 h-5" />
          <span>工作室信息</span>
        </CardTitle>
        <CardDescription>填写您的工作室基本信息</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Studio Name */}
        <div className="space-y-2">
          <Label htmlFor="studioName" className="text-base font-medium">
            工作室名称
          </Label>
          <Input
            id="studioName"
            placeholder="例如：灵慧命理工作室"
            value={studioName}
            onChange={(e) => onStudioNameChange(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="studioLocation" className="text-base font-medium">
            工作室地址
          </Label>
          <Input
            id="studioLocation"
            placeholder="例如：北京市朝阳区"
            value={studioLocation}
            onChange={(e) => onStudioLocationChange(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="studioPhone" className="text-base font-medium">
            联系电话
          </Label>
          <Input
            id="studioPhone"
            placeholder="例如：+86 10 1234 5678"
            value={studioPhone}
            onChange={(e) => onStudioPhoneChange(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="studioEmail" className="text-base font-medium">
            联系邮箱
          </Label>
          <Input
            id="studioEmail"
            type="email"
            placeholder="例如：studio@example.com"
            value={studioEmail}
            onChange={(e) => onStudioEmailChange(e.target.value)}
            className="h-11"
          />
        </div>
      </CardContent>
    </Card>
  );
}
