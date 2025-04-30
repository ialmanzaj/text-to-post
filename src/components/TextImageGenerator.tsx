import React, { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ExportContainer } from './export/ExportContainer';
import type { ExportDimensions } from './export/PlatformExportSelector';

const MOBILE_WIDTH = 360; // px, typical mobile width
const MOBILE_HEIGHT = 640; // px, typical mobile height

const TextImageGenerator = () => {
  const [socialHandle, setSocialHandle] = useState('@username');
  const [tagline, setTagline] = useState('Sharing insights on AI, startups, and growth');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportDimensions, setExportDimensions] = useState<ExportDimensions>({
    width: 1200,
    height: 675,
    label: 'Landscape'
  });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const parseContent = () => {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    type Section = { title: string; items: string[] };
    const sections: Section[] = [];
    let currentSection: Section = { title: '', items: [] };

    lines.forEach(line => {
      line = line.trim();
      if (!line.startsWith('•') && !line.startsWith('-') && !line.startsWith('*')) {
        if (currentSection.items.length > 0 || currentSection.title) {
          sections.push({ ...currentSection });
          currentSection = { title: line, items: [] };
        } else {
          currentSection.title = line;
        }
      } else {
        const item = line.replace(/^[•\-*]\s*/, '').trim();
        if (item) {
          currentSection.items.push(item);
        }
      }
    });
    if (currentSection.title || currentSection.items.length > 0) {
      sections.push(currentSection);
    }
    return sections;
  };

  const renderPreview = () => {
    const sections = parseContent();
    if (sections.length === 0) return (
      <div className="text-gray-400 text-center mt-16">Paste your content to see a preview.</div>
    );
    return (
      <div className="bg-white p-6 rounded-md w-full h-full flex flex-col" style={{ minHeight: '100%', color: '#000' }}>
        <div className="mb-4">
          <div style={{ color: '#222' }} className="text-base font-semibold">{socialHandle}</div>
          <div style={{ color: '#444' }} className="italic mt-1 text-sm">{tagline}</div>
          <hr className="my-3 border-gray-200" />
        </div>
        {title && <h1 style={{ color: '#111' }} className="text-xl font-bold mb-3">{title}</h1>}
        {sections.map((section, idx) => (
          <div key={idx} className="mb-4">
            {section.title && <h2 style={{ color: '#111' }} className="text-lg font-bold mb-1">{section.title}</h2>}
            {section.items.length > 0 && (
              <ul className="list-disc pl-5 space-y-1">
                {section.items.map((item, i) => (
                  <li key={i} style={{ color: '#111' }}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleExport = async ({ platform, dimensions, format }: {
    platform: string;
    dimensions: ExportDimensions;
    format: 'PNG' | 'JPG';
  }) => {
    const node = canvasRef.current;
    if (!node) return;

    setIsExporting(true);
    try {
      // Temporarily set the preview to export size
      const prevStyle = node.style.cssText;
      node.style.width = dimensions.width + 'px';
      node.style.height = dimensions.height + 'px';
      node.style.maxWidth = 'unset';
      node.style.maxHeight = 'unset';

      // Wait for style to apply
      await new Promise(r => setTimeout(r, 50));

      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: '#fff',
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL(`image/${format.toLowerCase()}`);
      link.download = `postready-${platform}-${dimensions.width}x${dimensions.height}.${format.toLowerCase()}`;
      link.click();

      // Restore style
      node.style.cssText = prevStyle;
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Content Settings Column */}
      <div className="flex-1">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Content Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Social Handle
              </label>
              <input
                type="text"
                value={socialHandle}
                onChange={(e) => setSocialHandle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Your tagline here"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="The title of your content"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content (Paste your text below)
            </label>
            <textarea
              value={content}
              onChange={handleContentChange}
              className="w-full p-2 border border-gray-300 rounded h-64 font-mono"
              placeholder="Paste your content here. Use bullet points (•, -, *) for list items."
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: Use section titles followed by bullet points (•, -, *) for each item.
            </p>
          </div>
        </div>
      </div>

      {/* Preview and Export Column */}
      <div className="flex-1">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Preview</h2>
            <ExportContainer
              onExport={handleExport}
              isExporting={isExporting}
              selectedDimensions={exportDimensions}
              onDimensionsChange={setExportDimensions}
            />
          </div>
          <div className="flex justify-center">
            <div
              ref={canvasRef}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md"
              style={{
                width: MOBILE_WIDTH,
                height: MOBILE_HEIGHT,
                maxWidth: '100%',
                maxHeight: '70vh',
                aspectRatio: `${MOBILE_WIDTH} / ${MOBILE_HEIGHT}`,
                position: 'relative',
                boxShadow: '0 0 0 8px #e5e7eb', // outer border for phone look
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'center',
              }}
            >
              {renderPreview()}
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-2 text-center">
            Mobile preview (export will use selected size)
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextImageGenerator; 