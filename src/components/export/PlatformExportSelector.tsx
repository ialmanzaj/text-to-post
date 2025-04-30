import React from 'react';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

export interface ExportDimensions {
  width: number;
  height: number;
  label: string;
}

export interface PlatformOption {
  id: 'twitter' | 'linkedin' | 'instagram';
  name: string;
  icon: React.ElementType;
  dimensions: ExportDimensions[];
}

const platformOptions: PlatformOption[] = [
  {
    id: 'twitter',
    name: 'X',
    icon: Twitter,
    dimensions: [
      { width: 1200, height: 675, label: 'Landscape' }
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    dimensions: [
      { width: 1200, height: 627, label: 'Landscape' },
      { width: 1080, height: 1350, label: 'Portrait' }
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    dimensions: [
      { width: 1080, height: 1080, label: 'Square' },
      { width: 1080, height: 1350, label: 'Portrait' }
    ]
  }
];

interface PlatformExportSelectorProps {
  selectedPlatform: string;
  selectedDimensions: ExportDimensions;
  onPlatformChange: (platform: string) => void;
  onDimensionsChange: (dimensions: ExportDimensions) => void;
  fileFormat: 'PNG' | 'JPG';
  onFileFormatChange: (format: 'PNG' | 'JPG') => void;
}

export function PlatformExportSelector({
  selectedPlatform,
  selectedDimensions,
  onPlatformChange,
  onDimensionsChange,
  fileFormat,
  onFileFormatChange
}: PlatformExportSelectorProps) {
  const selectedPlatformOption = platformOptions.find(p => p.id === selectedPlatform);

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {platformOptions.map((platform) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.id}
              onClick={() => {
                onPlatformChange(platform.id);
                onDimensionsChange(platform.dimensions[0]);
              }}
              className={`flex-1 flex items-center justify-center p-1.5 rounded-md ${
                selectedPlatform === platform.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={platform.name}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>

      {selectedPlatformOption && (
        <div className="flex gap-1.5">
          {selectedPlatformOption.dimensions.map((dim) => (
            <button
              key={`${dim.width}x${dim.height}`}
              onClick={() => onDimensionsChange(dim)}
              className={`flex-1 py-1 px-2 text-xs rounded-md ${
                selectedDimensions.width === dim.width && selectedDimensions.height === dim.height
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {dim.label}
            </button>
          ))}
          <button
            onClick={() => onFileFormatChange(fileFormat === 'PNG' ? 'JPG' : 'PNG')}
            className="py-1 px-2 text-xs rounded-md text-gray-600 hover:bg-gray-50"
          >
            {fileFormat}
          </button>
        </div>
      )}
    </div>
  );
} 