
import { useMemo } from 'react';

interface RecordMarkdownContentProps {
  content: string;
}

export default function RecordMarkdownContent({ content }: RecordMarkdownContentProps) {
  const renderedContent = useMemo(() => {
    // Simple markdown rendering
    let html = content
      .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^- (.*?)$/gm, '<li class="ml-4">$1</li>')
      .replace(/(<li.*?<\/li>)/s, '<ul class="list-disc space-y-1 my-2">$1</ul>')
      .replace(/\n\n/g, '</p><p class="my-3">')
      .replace(/\n/g, '<br />');

    return `<p class="my-3">${html}</p>`;
  }, [content]);

  return (
    <div
      className="prose prose-invert max-w-none text-foreground space-y-4"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}
