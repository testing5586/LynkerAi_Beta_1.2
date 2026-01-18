
import { useMemo } from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderedContent = useMemo(() => {
    // Simple markdown to HTML conversion
    let html = content
      // Headers
      .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Code blocks
      .replace(/```(.*?)```/gs, '<pre class="bg-background/50 border border-border rounded p-3 overflow-x-auto my-3"><code class="text-sm font-mono">$1</code></pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code class="bg-background/50 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      // Lists
      .replace(/^\- (.*?)$/gm, '<li class="ml-4">$1</li>')
      .replace(/(<li.*?<\/li>)/s, '<ul class="list-disc space-y-1 my-2">$1</ul>')
      // Line breaks
      .replace(/\n\n/g, '</p><p class="my-3">')
      .replace(/\n/g, '<br />')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // Wrap in paragraph
      .replace(/^(?!<[h|u|p|pre])/gm, '<p class="my-2">')
      .replace(/(?<!>)$/gm, '</p>');

    return html;
  }, [content]);

  return (
    <div
      className="prose prose-invert max-w-none space-y-3 text-foreground"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}
