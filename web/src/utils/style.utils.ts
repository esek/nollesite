export const toInlineStyles = (obj: Record<string, string>) =>
  Object.entries(obj).reduce((prev, [key, value]) => {
    return `${prev} ${key}: ${value};`;
  }, '');
