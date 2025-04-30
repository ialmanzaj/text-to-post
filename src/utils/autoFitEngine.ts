interface AutoFitOptions {
  minFontSize: number;
  maxFontSize: number;
  lineHeightNormal: number;
  lineHeightCompressed: number;
  sectionSpacingNormal: number;
  sectionSpacingCompressed: number;
}

interface AutoFitResult {
  fontSize: number;
  lineHeight: number;
  sectionSpacing: number;
  needsWarning: boolean;
}

export const calculateAutoFit = (
  contentHeight: number,
  targetHeight: number,
  options: AutoFitOptions
): AutoFitResult => {
  const {
    minFontSize,
    maxFontSize,
    lineHeightNormal,
    lineHeightCompressed,
    sectionSpacingNormal,
    sectionSpacingCompressed,
  } = options;

  // Start with ideal values
  let fontSize = maxFontSize;
  let lineHeight = lineHeightNormal;
  let sectionSpacing = sectionSpacingNormal;
  let needsWarning = false;

  // Debug logging
  console.debug('AutoFit Initial Values:', {
    contentHeight,
    targetHeight,
    fontSize,
    lineHeight,
    sectionSpacing
  });

  // If content fits, return ideal values
  if (contentHeight <= targetHeight) {
    return { fontSize, lineHeight, sectionSpacing, needsWarning };
  }

  // First try compressing spacing
  sectionSpacing = sectionSpacingCompressed;
  const heightWithCompressedSpacing = (contentHeight * sectionSpacingCompressed) / sectionSpacingNormal;

  console.debug('After spacing compression:', {
    heightWithCompressedSpacing,
    sectionSpacing
  });

  if (heightWithCompressedSpacing <= targetHeight) {
    return { fontSize, lineHeight, sectionSpacing, needsWarning };
  }

  // Then try compressing line height
  lineHeight = lineHeightCompressed;
  const heightWithCompressedLineHeight = heightWithCompressedSpacing * (lineHeightCompressed / lineHeightNormal);

  console.debug('After line height compression:', {
    heightWithCompressedLineHeight,
    lineHeight
  });

  if (heightWithCompressedLineHeight <= targetHeight) {
    return { fontSize, lineHeight, sectionSpacing, needsWarning };
  }

  // Finally, reduce font size as needed
  const scaleFactor = targetHeight / heightWithCompressedLineHeight;
  fontSize = Math.max(minFontSize, Math.floor(fontSize * scaleFactor));

  // Set warning if we hit minimum font size and still don't fit
  if (fontSize === minFontSize && (fontSize * scaleFactor) < minFontSize) {
    needsWarning = true;
  }

  console.debug('Final AutoFit Values:', {
    fontSize,
    lineHeight,
    sectionSpacing,
    needsWarning,
    scaleFactor
  });

  return { fontSize, lineHeight, sectionSpacing, needsWarning };
}; 