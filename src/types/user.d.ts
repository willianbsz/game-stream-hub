export interface AuthUser {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  [key: string]: unknown;
}
