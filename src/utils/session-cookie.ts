/**
 * Lightweight client cookie for middleware route protection (UX only).
 */

const FLAG = 'pda_session';

export function setSessionFlag(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${FLAG}=1; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearSessionFlag(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${FLAG}=; Path=/; Max-Age=0; SameSite=Lax`;
}
