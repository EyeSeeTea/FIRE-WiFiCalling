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
  serverHost: string;
  admin: boolean;
  created: Date;
  updated: Date;
  lastAccess: Date;
}

export interface UserListOptions {
  /** Filter User list with key (for search) */
  key: string,
  /** Show search input */
  search: boolean,
  /** To sort users list by name (reverse) */
  orderReverse: boolean,
  /** Check all users in list */
  checkAll: boolean
}
