import { User } from './user';

export interface Notification {
  id: number;
  created: Date;
  seen: boolean;
  type: string;
  newUserRequest: UserRequest;
  newUserAccepted: UserRequest;
  message: Message;
  voucher: Voucher;
  user: User;
  checked: boolean;
}

export const NotificationFilter = {
  USER_REQUEST: 'USER_REQUEST',
  USER_ACCEPTED: 'USER_ACCEPTED',
  MESSAGE_SENT: 'MESSAGE_SENT',
  PROFILE_UPDATED: 'PROFILE_UPDATED',
  TOPPED_UP: 'TOPPED_UP ',
  USER_NAME: 'USER_NAME'
};

export interface UserRequest {
  id: number;
  state: string;
  adminUser: User;
  user: User;
  created: Date;
  updated: Date;
}

export interface Message {
  id: number;
  text: string;
  fromUser: User;
  toUser: User;
  created: Date;
}

export interface Voucher {
  id: number;
  state: string;
  url: string;
  Vendor: string;
  bulkNumber: string;
  code: string;
  creditRemaining: number;
  creditTotal: number;
  depleted: any;
  user: User;
  activated: Date;
  created: Date;
}

export interface ProfileUpdate {

}

export interface Filter {
  name: string;
  value: string;
}
