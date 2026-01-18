'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SafeIcon from '@/components/common/SafeIcon';
import type { HomologyFilterModel } from '@/data/homology_match';

interface HomologyFilterPanelProps {
  filters: HomologyFilterModel;
  onFilterChange: (filters: HomologyFilterModel) => void;
}

export default function HomologyFilterPanel({
  filters,
  onFilterChange,
}: HomologyFilterPanelProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleTimeOptionChange = (key: string, checked: boolean) => {
    const updated = {
      ...localFilters,
      timeOptions: localFilters.timeOptions.map((opt) =>
        opt.key === key ? { ...opt, isChecked: checked } : opt
      ),
    };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleBaziOptionChange = (key: string, checked: boolean) => {
    const updated = {
      ...localFilters,
      baziOptions: localFilters.baziOptions.map((opt) =>
        opt.key === key ? { ...opt, isChecked: checked } : opt
      ),
    };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

const handleZiweiOptionChange = (key: string, checked: boolean) => {
     const updated = {
       ...localFilters,
       ziweiOptions: localFilters.ziweiOptions.map((opt) =>
         opt.key === key ? { ...opt, isChecked: checked } : opt
       ),
     };
     setLocalFilters(updated);
     onFilterChange(updated);
   };

   const handleEmptyHouseOptionChange = (key: string, checked: boolean) => {
     const updated = {
       ...localFilters,
       emptyHouseOptions: localFilters.emptyHouseOptions.map((opt) =>
         opt.key === key ? { ...opt, isChecked: checked } : opt
       ),
     };
     setLocalFilters(updated);
     onFilterChange(updated);
   };

   const handleAstrologyOptionChange = (key: string, checked: boolean) => {
    const updated = {
      ...localFilters,
      astrologyOptions: localFilters.astrologyOptions.map((opt) =>
        opt.key === key ? { ...opt, isChecked: checked } : opt
      ),
    };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleMBTIOptionChange = (key: string, checked: boolean) => {
    const updated = {
      ...localFilters,
      mbtiOptions: localFilters.mbtiOptions.map((opt) =>
        opt.key === key ? { ...opt, isChecked: checked } : opt
      ),
    };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleCustomZiweiChange = (value: string) => {
    const updated = {
      ...localFilters,
      customZiweiStars: value,
    };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleReset = () => {
    setLocalFilters(filters);
  };

  return (
    <Card className="glass-card p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <SafeIcon name="Filter" className="h-5 w-5" />
          <span>筛选条件</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-xs"
        >
          重置
        </Button>
      </div>

      <Accordion type="single" collapsible defaultValue="modern-time">
        {/* Modern Time Filter */}
        <AccordionItem value="modern-time">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center space-x-2">
              <SafeIcon name="Clock" className="h-4 w-4" />
              <span className="font-medium">现代时间</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            {localFilters.timeOptions.map((option) => (
              <div key={option.key} className="flex items-center space-x-2">
                <Checkbox
                  id={`time-${option.key}`}
                  checked={option.isChecked}
                  onCheckedChange={(checked) =>
                    handleTimeOptionChange(option.key, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`time-${option.key}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Bazi Filter */}
        <AccordionItem value="bazi">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center space-x-2">
              <SafeIcon name="BarChart3" className="h-4 w-4" />
              <span className="font-medium">八字</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            {localFilters.baziOptions.map((option) => (
              <div key={option.key} className="flex items-center space-x-2">
                <Checkbox
                  id={`bazi-${option.key}`}
                  checked={option.isChecked}
                  onCheckedChange={(checked) =>
                    handleBaziOptionChange(option.key, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`bazi-${option.key}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Ziwei Filter */}
        <AccordionItem value="ziwei">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center space-x-2">
              <SafeIcon name="Star" className="h-4 w-4" />
              <span className="font-medium">紫微</span>
            </div>
          </AccordionTrigger>
<AccordionContent className="space-y-4 pt-4">
             {/* Ziwei Options */}
             <div className="space-y-3">
               {localFilters.ziweiOptions.map((option) => (
                 <div key={option.key} className="flex items-center space-x-2">
                   <Checkbox
                     id={`ziwei-${option.key}`}
                     checked={option.isChecked}
                     onCheckedChange={(checked) =>
                       handleZiweiOptionChange(option.key, checked as boolean)
                     }
                   />
                   <Label
                     htmlFor={`ziwei-${option.key}`}
                     className="text-sm font-normal cursor-pointer"
                   >
                     {option.label}
                   </Label>
                 </div>
               ))}
             </div>

             {/* Empty House Options */}
             <div className="mt-4 pt-3 border-t">
               <Label className="text-sm font-medium mb-3 block">
                 同空宫在
               </Label>
               <div className="space-y-2">
                 {localFilters.emptyHouseOptions.map((option) => (
                   <div key={option.key} className="flex items-center space-x-2">
                     <Checkbox
                       id={`empty-house-${option.key}`}
                       checked={option.isChecked}
                       onCheckedChange={(checked) =>
                         handleEmptyHouseOptionChange(option.key, checked as boolean)
                       }
                     />
                     <Label
                       htmlFor={`empty-house-${option.key}`}
                       className="text-sm font-normal cursor-pointer"
                     >
                       {option.label}
                     </Label>
                   </div>
                 ))}
               </div>
             </div>

             {/* Custom Ziwei Stars */}
             <div className="mt-3 pt-3 border-t">
               <Label htmlFor="custom-ziwei" className="text-sm font-normal mb-2 block">
                 自定义星曜+宫位（填写）
               </Label>
               <Input
                 id="custom-ziwei"
                 type="text"
                 placeholder="例如：廉贞破军在夫妻宫"
                 value={localFilters.customZiweiStars}
                 onChange={(e) => handleCustomZiweiChange(e.target.value)}
                 className="text-sm"
               />
             </div>
           </AccordionContent>
        </AccordionItem>

        {/* Astrology Filter */}
        <AccordionItem value="astrology">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center space-x-2">
              <SafeIcon name="Compass" className="h-4 w-4" />
              <span className="font-medium">星座</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            {localFilters.astrologyOptions.map((option) => (
              <div key={option.key} className="flex items-center space-x-2">
                <Checkbox
                  id={`astrology-${option.key}`}
                  checked={option.isChecked}
                  onCheckedChange={(checked) =>
                    handleAstrologyOptionChange(option.key, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`astrology-${option.key}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* MBTI Filter */}
        <AccordionItem value="mbti">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center space-x-2">
              <SafeIcon name="Users" className="h-4 w-4" />
              <span className="font-medium">MBTI</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            {localFilters.mbtiOptions.map((option) => (
              <div key={option.key} className="flex items-center space-x-2">
                <Checkbox
                  id={`mbti-${option.key}`}
                  checked={option.isChecked}
                  onCheckedChange={(checked) =>
                    handleMBTIOptionChange(option.key, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`mbti-${option.key}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="my-6" />

      {/* Info Box */}
      <div className="bg-muted/50 rounded-lg p-4 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">💡 筛选提示</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>默认筛选条件已预设</li>
          <li>可同时选择多个维度</li>
          <li>匹配度基于选中条件计算</li>
          <li>在线状态实时更新</li>
        </ul>
      </div>
    </Card>
  );
}