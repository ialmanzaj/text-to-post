export type ExportFormat = 'PNG' | 'JPG';

export interface ExportDimensions {
  width: number;
  height: number;
  label: string;
}

export interface ExportOptions {
  platform: string;
  dimensions: ExportDimensions;
  format: ExportFormat;
}

export type SocialPlatform = 'twitter' | 'linkedin' | 'instagram';

export interface PlatformOption {
  id: SocialPlatform;
  name: string;
  icon: React.ElementType;
  dimensions: ExportDimensions[];
}

export interface ExportResult {
  url: string;
  filename: string;
  format: ExportFormat;
  dimensions: ExportDimensions;
} 