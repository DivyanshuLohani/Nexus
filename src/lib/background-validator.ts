export function isValidBackground(value: string): boolean {
  if (!value) return false;

  const trimmed = value.trim().toLowerCase();

  // Explicitly disallow dangerous schemes and functions
  const disallowed = ["url(", "data:", "image-set(", "element(", "cross-fade(", "canvas("];
  if (disallowed.some(keyword => trimmed.includes(keyword))) {
    return false;
  }

  // Allowed patterns
  const isHex = /^#([A-Fa-f0-9]{3}){1,2}$|^#([A-Fa-f0-9]{4}){1,2}$/.test(trimmed);
  const isRgb = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$/.test(trimmed);
  const isHsl = /^hsla?\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*(?:,\s*[\d.]+\s*)?\)$/.test(trimmed);
  const isGradient = /^(linear|radial|conic)-gradient\(.*\)$/.test(trimmed);
  
  return isHex || isRgb || isHsl || isGradient;
}

export function sanitizeBackground(value: string): string {
  if (isValidBackground(value)) {
    return value;
  }
  // Fallback to a safe default if invalid
  return "#0a0a0a";
}
