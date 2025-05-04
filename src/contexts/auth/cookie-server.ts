'use server';

import { cookies } from 'next/headers';

import { dayjs } from '@/lib/dayjs';
import { getFirebaseAdminApp } from '@/lib/firebase/admin';

const SESSION_TOKEN_COOKIE_NAME = '__session_token';
const SESSION_REFRESH_TOKEN_COOKIE_NAME = '__session_refresh_token';

interface ProfissaSession {
  token: string;
  refreshToken: string;
}

async function createSession(token: string, refreshToken: string): Promise<void> {
  const decodedIdToken = await getFirebaseAdminApp().auth().verifyIdToken(token);

  const expiresInMilliseconds = decodedIdToken.exp * 1000;
  const expiresIn = new Date(expiresInMilliseconds);
  const restantTimeInMilliseconds = dayjs(expiresIn).diff(dayjs(), 'millisecond');

  const sessionCookie = await getFirebaseAdminApp()
    .auth()
    .createSessionCookie(token, { expiresIn: restantTimeInMilliseconds });

  cookies().set(SESSION_TOKEN_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    expires: expiresIn,
    secure: true,
    sameSite: 'none',
    value: sessionCookie,
  });

  cookies().set(SESSION_REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
}

export async function getSession(): Promise<ProfissaSession | undefined> {
  const token = cookies().get(SESSION_TOKEN_COOKIE_NAME)?.value;

  return token
    ? await Promise.resolve({
        token,
        refreshToken: token,
      })
    : undefined;
}

async function removeSession(): Promise<void> {
  cookies().delete(SESSION_TOKEN_COOKIE_NAME);
  cookies().delete(SESSION_REFRESH_TOKEN_COOKIE_NAME);
}

export async function manageSession(token: string | undefined, refreshToken: string | undefined): Promise<void> {
  if (token && refreshToken) await createSession(token, refreshToken);
  else await removeSession();
}
