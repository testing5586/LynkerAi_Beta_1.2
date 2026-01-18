
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SafeIcon from '@/components/common/SafeIcon';
import { MOCK_GEO_OPTIONS } from '@/data/registration';

interface BasicInfoStepProps {
  data: {
    realName: string;
    idNumber: string;
    country: string;
    birthDate: string;
  };
  onChange: (updates: Partial<typeof data>) => void;
  errors: Record<string, string>;
}

export default function BasicInfoStep({ data, onChange, errors }: BasicInfoStepProps) {
  const countries = MOCK_GEO_OPTIONS.filter(opt => opt.type === 'Country');

  return (
    <div className="space-y-6">
      <Alert className="border-primary/20 bg-primary/5">
        <SafeIcon name="AlertCircle" className="h-4 w-4" />
        <AlertDescription>
          命理师需要进行实名认证。请确保所有信息真实有效。
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {/* Real Name */}
        <div className="space-y-2">
          <Label htmlFor="realName" className="text-base font-semibold">
            真实姓名 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="realName"
            placeholder="请输入您的真实姓名"
            value={data.realName}
            onChange={(e) => onChange({ realName: e.target.value })}
            className={errors.realName ? 'border-destructive' : ''}
          />
          {errors.realName && (
            <p className="text-sm text-destructive">{errors.realName}</p>
          )}
        </div>

        {/* ID Number */}
        <div className="space-y-2">
          <Label htmlFor="idNumber" className="text-base font-semibold">
            身份证号 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="idNumber"
            placeholder="请输入您的身份证号"
            value={data.idNumber}
            onChange={(e) => onChange({ idNumber: e.target.value })}
            className={errors.idNumber ? 'border-destructive' : ''}
          />
          {errors.idNumber && (
            <p className="text-sm text-destructive">{errors.idNumber}</p>
          )}
          <p className="text-xs text-muted-foreground">
            您的身份信息将被加密保存，仅用于实名认证
          </p>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country" className="text-base font-semibold">
            国籍 <span className="text-destructive">*</span>
          </Label>
          <Select value={data.country} onValueChange={(value) => onChange({ country: value })}>
            <SelectTrigger id="country" className={errors.country ? 'border-destructive' : ''}>
              <SelectValue placeholder="选择您的国籍" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-destructive">{errors.country}</p>
          )}
        </div>

        {/* Birth Date */}
        <div className="space-y-2">
          <Label htmlFor="birthDate" className="text-base font-semibold">
            出生日期 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="birthDate"
            type="date"
            value={data.birthDate}
            onChange={(e) => onChange({ birthDate: e.target.value })}
            className={errors.birthDate ? 'border-destructive' : ''}
          />
          {errors.birthDate && (
            <p className="text-sm text-destructive">{errors.birthDate}</p>
          )}
          <p className="text-xs text-muted-foreground">
            用于生成您的命盘信息
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-muted/50 border border-muted space-y-2">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <SafeIcon name="Info" className="w-4 h-4 text-primary" />
          为什么需要实名认证？
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1 ml-6">
          <li>• 建立专业命理师的信任度</li>
          <li>• 保护用户和命理师的权益</li>
          <li>• 符合平台的合规要求</li>
          <li>• 生成准确的命理分析</li>
        </ul>
      </div>
    </div>
  );
}
