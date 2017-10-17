export class CallFailureResponse {
  cause: 'Rejected' | 'Canceled';
  message: string;
  originator: string;
}

export interface CustomSettingsI {
  dtmfsGateway: string;
  defaultUtiDomain: string;
  virtualNumbersPrefixs: number[];
  conferenceCallPrefixs: number[];
}
