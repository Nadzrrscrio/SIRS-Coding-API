/**
 * Utilities and Exception Handling for Vendor Registrations
 */

/**
 * Generates a standard SIRS format API key.
 */
export function generateApiKey(prefix = 'sk-sirs-'): string {
  try {
    const chars = 'abcdef0123456789';
    let randomPart = '';
    for (let i = 0; i < 16; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}${randomPart}`;
  } catch (err) {
    console.error('Error generating API key:', err);
    return `${prefix}${Date.now().toString(16)}`;
  }
}

/**
 * Copies text to clipboard with multi-tier fallback exception handling.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('navigator.clipboard.writeText failed, falling back to execCommand:', err);
  }

  // Fallback for older browsers or non-secure contexts
  try {
    if (typeof document === 'undefined') return false;
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (fallbackErr) {
    console.error('All clipboard copy attempts failed:', fallbackErr);
    return false;
  }
}

/**
 * Local storage wrapper protected by try-catch to prevent browser crashes.
 */
export const safeVendorStorage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return defaultValue;
      const raw = window.localStorage.getItem(key);
      if (!raw) return defaultValue;
      return JSON.parse(raw) as T;
    } catch (err) {
      console.warn(`Error reading localStorage for key "${key}":`, err);
      return defaultValue;
    }
  },
  set<T>(key: string, value: T): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn(`Error writing localStorage for key "${key}":`, err);
      return false;
    }
  },
};
