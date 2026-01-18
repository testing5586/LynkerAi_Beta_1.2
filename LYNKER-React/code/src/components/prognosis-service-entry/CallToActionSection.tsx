
import { Button } from '@/components/ui/button';
import SafeIcon from '@/components/common/SafeIcon';

export default function CallToActionSection() {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/20 border border-primary/30 p-12 sm:p-16">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              准备好探寻您的命运了吗？
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              加入数万名用户，通过灵客AI的专业命理师获得人生指引。每一次咨询都是一次自我认识的机会。
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-mystical-gradient hover:opacity-90 text-base"
                onClick={() => window.location.href = './master-list.html'}
              >
                <SafeIcon name="Sparkles" className="mr-2 h-5 w-5" />
                浏览命理师
              </Button>
<Button
                 size="lg"
                 variant="outline"
                 className="border-primary/50 hover:bg-primary/10 text-base"
                 onClick={() => window.location.href = './registration-type-selection.html'}
               >
                 <SafeIcon name="Crown" className="mr-2 h-5 w-5" />
                 命理师入驻
               </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="flex flex-col items-center gap-2">
                <SafeIcon name="Shield" className="h-6 w-6 text-accent" />
                <span className="text-sm font-medium">安全隐私保护</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SafeIcon name="Zap" className="h-6 w-6 text-accent" />
                <span className="text-sm font-medium">AI智能匹配</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SafeIcon name="Award" className="h-6 w-6 text-accent" />
                <span className="text-sm font-medium">专业认证师资</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
