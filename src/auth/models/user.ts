export interface Authenticate {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  address: string;
  avatarUrl: string;
  email: string;
  gender: string;
  state: string;
  phoneNumber: string;
  created: Date;
  updated: Date;
  lastAccess: Date;
}
