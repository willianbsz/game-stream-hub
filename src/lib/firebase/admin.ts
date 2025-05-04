import admin, { type ServiceAccount } from 'firebase-admin';

import { config } from '@/config';

export function getFirebaseAdminApp(): admin.app.App {
  if (admin.apps.length) {
    return admin.app();
  }

  return admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(config.firebase.serviceAccount) as ServiceAccount),
  });
}
