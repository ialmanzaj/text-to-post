import React, { useState } from 'react';
import { PlatformExportSelector, ExportDimensions } from './PlatformExportSelector';

interface ExportContainerProps {
  onExport: (options: {
    platform: string;
    dimensions: ExportDimensions;
    format: 'PNG' | 'JPG';
  }) => Promise<void>;
  isExporting?: boolean;
  selectedDimensions: ExportDimensions;
  onDimensionsChange: (dimensions: ExportDimensions) => void;
}

export function ExportContainer({ 
  onExport, 
  isExporting = false,
  selectedDimensions,
  onDimensionsChange
}: ExportContainerProps) {
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [fileFormat, setFileFormat] = useState<'PNG' | 'JPG'>('PNG');

  const handleExport = async () => {
    await onExport({
      platform: selectedPlatform,
      dimensions: selectedDimensions,
      format: fileFormat
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <PlatformExportSelector
        selectedPlatform={selectedPlatform}
        selectedDimensions={selectedDimensions}
        onPlatformChange={setSelectedPlatform}
        onDimensionsChange={onDimensionsChange}
        fileFormat={fileFormat}
        onFileFormatChange={setFileFormat}
      />
      
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`py-1.5 px-3 rounded-md text-sm font-medium text-white transition-colors ${
          isExporting
            ? 'bg-blue-400'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isExporting ? 'Exporting...' : 'Export'}
      </button>
    </div>
  );
} 