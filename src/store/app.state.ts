/** App State */
export interface AppState {
    status: string;
    credit: string;
    loggedIn: User;
    settings: AppSettings;
    notifications: any;
}

export interface User {
    id: number;
    name: string;
}

export interface AppSettings {
    theme: string;
    ringing_volume: number;
    ringing_tone: string;
}
