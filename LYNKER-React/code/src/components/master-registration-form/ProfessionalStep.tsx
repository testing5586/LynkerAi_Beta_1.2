
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';

interface ProfessionalStepProps {
  data: {
    specialties: string[];
    serviceTypes: string[];
    yearsOfExperience: string;
    bio: string;
  };
  onChange: (updates: Partial<typeof data>) => void;
  errors: Record<string, string>;
}

const SPECIALTIES = [
  { id: 'bazi', label: '八字命理', icon: 'BookOpen' },
  { id: 'ziwei', label: '紫微斗数', icon: 'Star' },
  { id: 'astrology', label: '占星学', icon: 'Sparkles' },
  { id: 'fengshui', label: '风水堪舆', icon: 'Compass' },
  { id: 'tarot', label: '塔罗牌', icon: 'Wand2' },
  { id: 'palmistry', label: '手相面相', icon: 'Hand' },
];

const SERVICE_TYPES = [
  { id: 'consultation', label: '一对一咨询' },
  { id: 'group', label: '小组课程' },
  { id: 'workshop', label: '工作坊' },
  { id: 'article', label: '文章撰写' },
  { id: 'video', label: '视频教程' },
];

const EXPERIENCE_YEARS = [
  { value: '0-2', label: '0-2年' },
  { value: '2-5', label: '2-5年' },
  { value: '5-10', label: '5-10年' },
  { value: '10+', label: '10年以上' },
];

export default function ProfessionalStep({
  data,
  onChange,
  errors,
}: ProfessionalStepProps) {
  const toggleSpecialty = (id: string) => {
    const updated = data.specialties.includes(id)
      ? data.specialties.filter(s => s !== id)
      : [...data.specialties, id];
    onChange({ specialties: updated });
  };

  const toggleServiceType = (id: string) => {
    const updated = data.serviceTypes.includes(id)
      ? data.serviceTypes.filter(s => s !== id)
      : [...data.serviceTypes, id];
    onChange({ serviceTypes: updated });
  };

  return (
    <div className="space-y-6">
      <Alert className="border-primary/20 bg-primary/5">
        <SafeIcon name="AlertCircle" className="h-4 w-4" />
        <AlertDescription>
          请准确描述您的专业背景和服务范围，这将帮助用户更好地了解您
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {/* Specialties */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            专业领域 <span className="text-destructive">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {SPECIALTIES.map((specialty) => (
              <div
                key={specialty.id}
                className="flex items-center space-x-2 p-3 rounded-lg border border-muted hover:border-primary/50 cursor-pointer transition-colors"
                onClick={() => toggleSpecialty(specialty.id)}
              >
                <Checkbox
                  id={specialty.id}
                  checked={data.specialties.includes(specialty.id)}
                  onCheckedChange={() => toggleSpecialty(specialty.id)}
                />
                <Label
                  htmlFor={specialty.id}
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  <SafeIcon name={specialty.icon} className="w-4 h-4 text-primary" />
                  {specialty.label}
                </Label>
              </div>
            ))}
          </div>
          {errors.specialties && (
            <p className="text-sm text-destructive">{errors.specialties}</p>
          )}
        </div>

        {/* Service Types */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            服务类型 <span className="text-destructive">*</span>
          </Label>
          <div className="space-y-2">
            {SERVICE_TYPES.map((service) => (
              <div
                key={service.id}
                className="flex items-center space-x-2 p-3 rounded-lg border border-muted hover:border-primary/50 cursor-pointer transition-colors"
                onClick={() => toggleServiceType(service.id)}
              >
                <Checkbox
                  id={service.id}
                  checked={data.serviceTypes.includes(service.id)}
                  onCheckedChange={() => toggleServiceType(service.id)}
                />
                <Label htmlFor={service.id} className="cursor-pointer flex-1">
                  {service.label}
                </Label>
              </div>
            ))}
          </div>
          {errors.serviceTypes && (
            <p className="text-sm text-destructive">{errors.serviceTypes}</p>
          )}
        </div>

        {/* Years of Experience */}
        <div className="space-y-2">
          <Label htmlFor="experience" className="text-base font-semibold">
            从业年限 <span className="text-destructive">*</span>
          </Label>
          <Select value={data.yearsOfExperience} onValueChange={(value) => onChange({ yearsOfExperience: value })}>
            <SelectTrigger id="experience" className={errors.yearsOfExperience ? 'border-destructive' : ''}>
              <SelectValue placeholder="选择您的从业年限" />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_YEARS.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.yearsOfExperience && (
            <p className="text-sm text-destructive">{errors.yearsOfExperience}</p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio" className="text-base font-semibold">
            个人介绍 <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="bio"
            placeholder="请介绍您的背景、经历和服务理念（至少50字）"
            value={data.bio}
            onChange={(e) => onChange({ bio: e.target.value })}
            className={`min-h-[120px] ${errors.bio ? 'border-destructive' : ''}`}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>这将显示在您的公开档案中</span>
            <span>{data.bio.length}/500</span>
          </div>
          {errors.bio && (
            <p className="text-sm text-destructive">{errors.bio}</p>
          )}
        </div>
      </div>

      {/* Languages Support */}
      <div className="p-4 rounded-lg bg-muted/50 border border-muted space-y-3">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <SafeIcon name="Globe" className="w-4 h-4 text-primary" />
          支持的语言
        </h4>
        <p className="text-sm text-muted-foreground">
          灵客AI支持以下语言的服务：中文、英文、韩文、日文、泰文、越南文
        </p>
        <div className="flex flex-wrap gap-2">
          {['中文', '英文', '韩文', '日文', '泰文', '越南文'].map((lang) => (
            <div key={lang} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              {lang}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
