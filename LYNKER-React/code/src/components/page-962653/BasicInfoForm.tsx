
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import type { UserProfileDetailModel } from '@/data/user';

interface BasicInfoFormProps {
  userProfile: UserProfileDetailModel;
}

export default function BasicInfoForm({ userProfile }: BasicInfoFormProps) {
  const [formData, setFormData] = useState({
    alias: userProfile.alias,
    country: userProfile.geoTag.country,
    region: userProfile.geoTag.region,
    birthPlace: '广东深圳', // Mock data
    currentPlace: '广东深圳', // Mock data
    culture: '中华文化', // Mock data
    religion: '道教', // Mock data
  });

  const countries = [
    { code: 'CN', name: '中国' },
    { code: 'US', name: '美国' },
    { code: 'JP', name: '日本' },
    { code: 'KR', name: '韩国' },
    { code: 'TH', name: '泰国' },
    { code: 'VN', name: '越南' },
    { code: 'GB', name: '英国' },
    { code: 'FR', name: '法国' },
    { code: 'DE', name: '德国' },
  ];

  const cultures = [
    '中华文化',
    '西方文化',
    '日本文化',
    '韩国文化',
    '东南亚文化',
    '其他',
  ];

  const religions = [
    '道教',
    '佛教',
    '儒教',
    '基督教',
    '伊斯兰教',
    '无宗教信仰',
    '其他',
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Alias */}
      <div className="space-y-2">
        <Label htmlFor="alias" className="text-base font-medium">
          假名 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="alias"
          value={formData.alias}
          onChange={(e) => handleChange('alias', e.target.value)}
          placeholder="至少5个字"
          className="bg-muted/50"
        />
        <p className="text-xs text-muted-foreground">
          您在平台上的显示名称，至少5个字，不能修改
        </p>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label htmlFor="country" className="text-base font-medium">
          国籍 <span className="text-destructive">*</span>
        </Label>
        <Select value={formData.country} onValueChange={(value) => handleChange('country', value)}>
          <SelectTrigger id="country" className="bg-muted/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Region */}
      <div className="space-y-2">
        <Label htmlFor="region" className="text-base font-medium">
          区域 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="region"
          value={formData.region}
          onChange={(e) => handleChange('region', e.target.value)}
          placeholder="例如：广东深圳"
          className="bg-muted/50"
        />
        <p className="text-xs text-muted-foreground">
          您的所在省份、城市或地区
        </p>
      </div>

      {/* Birth Place */}
      <div className="space-y-2">
        <Label htmlFor="birthPlace" className="text-base font-medium">
          出生地 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="birthPlace"
          value={formData.birthPlace}
          onChange={(e) => handleChange('birthPlace', e.target.value)}
          placeholder="例如：广东深圳"
          className="bg-muted/50"
        />
        <p className="text-xs text-muted-foreground">
          用于命理分析的环境因子计算
        </p>
      </div>

      {/* Current Place */}
      <div className="space-y-2">
        <Label htmlFor="currentPlace" className="text-base font-medium">
          常驻地 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="currentPlace"
          value={formData.currentPlace}
          onChange={(e) => handleChange('currentPlace', e.target.value)}
          placeholder="例如：广东深圳"
          className="bg-muted/50"
        />
        <p className="text-xs text-muted-foreground">
          您目前主要居住的地点
        </p>
      </div>

      {/* Culture */}
      <div className="space-y-2">
        <Label htmlFor="culture" className="text-base font-medium">
          文化背景
        </Label>
        <Select value={formData.culture} onValueChange={(value) => handleChange('culture', value)}>
          <SelectTrigger id="culture" className="bg-muted/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cultures.map((culture) => (
              <SelectItem key={culture} value={culture}>
                {culture}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Religion */}
      <div className="space-y-2">
        <Label htmlFor="religion" className="text-base font-medium">
          宗教信仰
        </Label>
        <Select value={formData.religion} onValueChange={(value) => handleChange('religion', value)}>
          <SelectTrigger id="religion" className="bg-muted/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {religions.map((religion) => (
              <SelectItem key={religion} value={religion}>
                {religion}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Info Card */}
      <Card className="bg-accent/10 border-accent/30 p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">提示：</span>
          您的基本信息将用于计算"环境因子标签"，帮助系统为您提供更精准的同命匹配建议。这些信息仅在您的同意下与其他用户共享。
        </p>
      </Card>
    </div>
  );
}
