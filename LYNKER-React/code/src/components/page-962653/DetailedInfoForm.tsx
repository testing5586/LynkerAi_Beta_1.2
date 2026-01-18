
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';
import type { UserProfileDetailModel } from '@/data/user';

interface DetailedInfoFormProps {
  userProfile: UserProfileDetailModel;
}

export default function DetailedInfoForm({ userProfile }: DetailedInfoFormProps) {
  const [formData, setFormData] = useState({
    bio: userProfile.selfIntroduction,
    interests: ['命理学', '占星术', '心理学'],
    hobbies: ['阅读', '冥想', '旅游'],
    profession: '产品经理',
    education: '本科',
  });

  const [newInterest, setNewInterest] = useState('');
  const [newHobby, setNewHobby] = useState('');

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest],
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest),
    }));
  };

  const handleAddHobby = () => {
    if (newHobby.trim() && !formData.hobbies.includes(newHobby)) {
      setFormData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, newHobby],
      }));
      setNewHobby('');
    }
  };

  const handleRemoveHobby = (hobby: string) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(h => h !== hobby),
    }));
  };

  const educationOptions = ['高中', '本科', '硕士', '博士', '其他'];

  return (
    <div className="space-y-6">
      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-base font-medium">
          个人简介
        </Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          placeholder="介绍一下您自己，您的兴趣和对命理的看法..."
          className="bg-muted/50 min-h-32"
        />
        <p className="text-xs text-muted-foreground">
          最多 500 字，将显示在您的公开资料中
        </p>
      </div>

      {/* Profession */}
      <div className="space-y-2">
        <Label htmlFor="profession" className="text-base font-medium">
          职业
        </Label>
        <Input
          id="profession"
          value={formData.profession}
          onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
          placeholder="例如：产品经理、设计师、医生"
          className="bg-muted/50"
        />
      </div>

      {/* Education */}
      <div className="space-y-2">
        <Label htmlFor="education" className="text-base font-medium">
          教育背景
        </Label>
        <div className="flex gap-2">
          {educationOptions.map((option) => (
            <Button
              key={option}
              variant={formData.education === option ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFormData(prev => ({ ...prev, education: option }))}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-3">
        <Label className="text-base font-medium">兴趣爱好</Label>
        <div className="flex gap-2">
          <Input
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="添加兴趣爱好"
            className="bg-muted/50"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddInterest();
              }
            }}
          />
          <Button
            variant="outline"
            onClick={handleAddInterest}
            className="px-4"
          >
            <SafeIcon name="Plus" className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.interests.map((interest) => (
            <Badge
              key={interest}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/20"
              onClick={() => handleRemoveInterest(interest)}
            >
              {interest}
              <SafeIcon name="X" className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          点击标签可删除，最多添加 10 个兴趣
        </p>
      </div>

      {/* Hobbies */}
      <div className="space-y-3">
        <Label className="text-base font-medium">爱好</Label>
        <div className="flex gap-2">
          <Input
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            placeholder="添加爱好"
            className="bg-muted/50"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddHobby();
              }
            }}
          />
          <Button
            variant="outline"
            onClick={handleAddHobby}
            className="px-4"
          >
            <SafeIcon name="Plus" className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.hobbies.map((hobby) => (
            <Badge
              key={hobby}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/20"
              onClick={() => handleRemoveHobby(hobby)}
            >
              {hobby}
              <SafeIcon name="X" className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          点击标签可删除，最多添加 10 个爱好
        </p>
      </div>

      {/* Privacy Notice */}
      <Card className="bg-primary/10 border-primary/30 p-4">
        <div className="flex gap-3">
          <SafeIcon name="Lock" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">隐私保护</p>
            <p className="text-sm text-muted-foreground">
              您的详细信息仅用于改进匹配算法和个性化推荐。您可以随时在隐私设置中调整信息可见性。
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
