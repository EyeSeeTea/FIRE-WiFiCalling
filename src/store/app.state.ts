/** App State */
export interface AppState {
  status: string;
  credit: string;
  user: User;
  settings: AppSettings;
  notifications: any;
  authenticated: boolean;
}

export interface User {
  id: number;
  name: string;
  credit: string;
}

export interface AppSettings {
  theme: string;
  ringing_volume: number;
  ringing_tone: string;
}
