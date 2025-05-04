import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { dayjs } from '@/lib/dayjs';

const SESSION_TOKEN_COOKIE_NAME = '__session_token';

function createSession(token: string): void {
  const expirationAt = dayjs().add(1, 'month').toDate();

  setCookie(SESSION_TOKEN_COOKIE_NAME, token, {
    secure: true,
    expires: expirationAt,
  });
}

function removeSession(): void {
  deleteCookie(SESSION_TOKEN_COOKIE_NAME);
}

export function getSession(): string | undefined {
  return getCookie(SESSION_TOKEN_COOKIE_NAME);
}

export function manageSession(token: string | undefined): void {
  if (token) createSession(token);
  else removeSession();
}
