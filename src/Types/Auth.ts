export interface UserInfo {
  _id: string;
}

export interface LoginResponse {
  access_token?: string | Record<string, unknown> | null;
  name?: string | null;
  role?: string | null;
  status?: string | null;
  email?: string | null;
  accessToken?: string | null | Record<string, unknown> | undefined;
  avatar?: string;
}