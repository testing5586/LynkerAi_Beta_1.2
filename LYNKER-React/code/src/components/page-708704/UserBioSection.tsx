
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import SafeIcon from '@/components/common/SafeIcon';

interface UserBioSectionProps {}

export default function UserBioSection({}: UserBioSectionProps) {
  // Mock user data
  const userInfo = {
    birthChart: {
      type: '八字',
      elements: ['金', '水', '木'],
      dayMaster: '丙火',
      description: '丙火日主，聪慧灵动，热情开朗。',
    },
    ziwei: {
      type: '紫微斗数',
      mainStar: '紫微星',
      description: '紫微星主，气质高贵，领导力强。',
    },
    astrology: {
      type: '占星',
      sun: '狮子座',
      moon: '天秤座',
      description: '太阳狮子，月亮天秤，兼具热情与优雅。',
    },
    interests: ['命理学', '心理学', '传统文化', '冥想', '瑜伽'],
    languages: ['中文', '英文'],
  };

  return (
    <Card className="glass-card mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <SafeIcon name="BookOpen" className="w-5 h-5" />
          <span>命理信息</span>
        </CardTitle>
        <CardDescription>您的命盘分析摘要</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="baziChart" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="baziChart">八字</TabsTrigger>
            <TabsTrigger value="ziwei">紫微</TabsTrigger>
            <TabsTrigger value="astrology">占星</TabsTrigger>
          </TabsList>

          <TabsContent value="baziChart" className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">日主：{userInfo.birthChart.dayMaster}</h4>
                <p className="text-sm text-muted-foreground mb-3">{userInfo.birthChart.description}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium mb-2">五行属性</h5>
                <div className="flex flex-wrap gap-2">
                  {userInfo.birthChart.elements.map((element) => (
                    <Badge key={element} variant="secondary">
                      {element}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ziwei" className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">主星：{userInfo.ziwei.mainStar}</h4>
                <p className="text-sm text-muted-foreground">{userInfo.ziwei.description}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  紫微斗数详细分析需要在知识库中查看完整内容。
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="astrology" className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">
                  太阳：{userInfo.astrology.sun} | 月亮：{userInfo.astrology.moon}
                </h4>
                <p className="text-sm text-muted-foreground">{userInfo.astrology.description}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  占星详细分析需要在知识库中查看完整内容。
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t space-y-4">
          <div>
            <h5 className="text-sm font-medium mb-2">兴趣爱好</h5>
            <div className="flex flex-wrap gap-2">
              {userInfo.interests.map((interest) => (
                <Badge key={interest} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-sm font-medium mb-2">语言能力</h5>
            <div className="flex flex-wrap gap-2">
              {userInfo.languages.map((lang) => (
                <Badge key={lang} variant="secondary">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
