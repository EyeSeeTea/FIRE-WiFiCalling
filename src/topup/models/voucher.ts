import { User } from '../../auth/models/user';

export interface Voucher {
  id: number;
  user: User;
  state: string;
  creditRemaining: number;
  creditTotal: number;
  code: string;
  url: string;
  bulkNumber: string;
  Vendor: string;
  created: Date;
  activated: Date;
  depleted: Date;
}
