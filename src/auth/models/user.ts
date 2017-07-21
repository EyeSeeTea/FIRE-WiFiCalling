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
  credit: string;
}
