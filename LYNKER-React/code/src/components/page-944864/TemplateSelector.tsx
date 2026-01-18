import { Card, CardContent } from '@/components/ui/card';
import SafeIcon from '@/components/common/SafeIcon';
import { PUBLISH_TEMPLATES, PublishTemplate } from './PublishTemplate';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const currentTemplate = PUBLISH_TEMPLATES.find(t => t.id === selectedTemplate);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h3 className="font-bold text-xl text-foreground">选择模板</h3>
        <p className="text-base text-muted-foreground leading-relaxed">
          选择一个精美的模板来装扮您的发布内容
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {PUBLISH_TEMPLATES.map((template) => (
          <button
            key={template.id}
            id={template.id === 'cute' ? 'in22k' : (template.id === 'mysterious' ? 'iq8t6' : undefined)}
            onClick={() => onSelectTemplate(template.id)}
            className={`relative group transition-all rounded-2xl ${
              selectedTemplate === template.id ? 'ring-2 ring-primary ring-offset-1 ring-offset-background' : ''
            }`}
          >
            <Card 
              id={template.id === 'cute' ? 'igdel' : (template.id === 'mysterious' ? 'im9qk' : undefined)}
              className={`cursor-pointer border-2 transition-all h-full rounded-2xl overflow-hidden ${
                selectedTemplate === template.id
                  ? `border-primary ${template.borderColor}`
                  : 'border-muted hover:border-primary/50'
              }`}
            >
<CardContent 
                id={template.id === 'cute' ? 'i6i7w' : (template.id === 'mysterious' ? 'ijew3' : (template.id === 'business' ? 'imxcff' : (template.id === 'serious' ? 'iyirt' : undefined)))}
                className={`p-5 flex flex-col items-center justify-center min-h-[160px] rounded-2xl ${template.previewClass}`}
              >
                <div className={`w-14 h-14 rounded-xl ${template.bgColor} flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                  <SafeIcon name={template.icon} className={`h-7 w-7 ${template.textColor}`} />
                </div>
<p 
                  id={template.id === 'cute' ? 'idg3a' : (template.id === 'mysterious' ? 'ixarg' : (template.id === 'love' ? 'i11mo' : (template.id === 'serious' ? 'i00ti2' : (template.id === 'funny' ? 'i7i7gg' : (template.id === 'business' ? 'ifd65j' : (template.id === 'complaint' ? 'izk5aw' : undefined))))))}
                  style={{
color: template.id === 'cute' ? '#ffb796' : 
                            template.id === 'mysterious' ? '#c388ff' :
                            template.id === 'love' ? '#fe8ecb' :
                            template.id === 'serious' ? '#ffffff' :
                            template.id === 'funny' ? '#ffbd28' :
                            template.id === 'business' ? '#56c1ff' :
                            template.id === 'complaint' ? '#dc9f5b' :
                            undefined
                  }}
                  className="text-base font-semibold text-center text-foreground"
                >
                  {template.displayName}
                </p>
                <p className="text-sm text-muted-foreground text-center mt-2 leading-snug">{template.description}</p>
                
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    <SafeIcon name="Check" className="h-4 w-4" />
                  </div>
                )}
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      {/* Current Template Preview */}
      {currentTemplate && (
        <Card className={`border-2 ${currentTemplate.borderColor} ${currentTemplate.previewClass} rounded-2xl overflow-hidden transition-all`}>
          <CardContent className="p-5">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl ${currentTemplate.bgColor} flex items-center justify-center flex-shrink-0`}>
                <SafeIcon name={currentTemplate.icon} className={`h-6 w-6 ${currentTemplate.textColor}`} />
              </div>
<div className="min-w-0">
                 <p 
                   id={currentTemplate.id === 'mysterious' ? 'in6r4l' : undefined}
                   style={{
                     color: currentTemplate.id === 'cute' ? '#ffb796' : 
                            currentTemplate.id === 'mysterious' ? '#c388ff' :
                            currentTemplate.id === 'love' ? '#fe8ecb' :
                            currentTemplate.id === 'serious' ? '#59b1c7' :
                            currentTemplate.id === 'funny' ? '#ffbd28' :
                            currentTemplate.id === 'business' ? '#56c1ff' :
                            currentTemplate.id === 'complaint' ? '#dc9f5b' :
                            undefined
                   }}
                   className="font-semibold text-base text-foreground"
                 >
                   {currentTemplate.displayName}
                 </p>
                 <p className="text-sm text-muted-foreground leading-snug">{currentTemplate.description}</p>
               </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}