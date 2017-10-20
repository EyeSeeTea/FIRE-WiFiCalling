export class CallFailureResponse {
  cause: 'Rejected' | 'Canceled';
  message: string;
  originator: string;
}

export interface CallSettings {
  uri;
  sockets;
  authorization_user?;
  connection_recovery_max_interval?;
  connection_recovery_min_interval?;
  contact_uri?;
  display_name?;
  instance_id?;
  no_answer_timeout?;
  session_timers?;
  password?;
  realm?;
  ha1?;
  register?;
  register_expires?;
  registrar_server?;
  use_preloaded_route?;
}

export interface CustomSettingsI {
  dtmfsGateway: string;
  defaultUtiDomain: string;
  virtualNumbersPrefixs: number[];
  conferenceCallPrefixs: number[];
}

export interface IncomingResponse {
  originator: string;
  response: {
    body: string;
    call_id: string;
    cseq: number;
    data: string;
    from: NameAddrHeader;
    from_tag: string;
    headers;
    method: string;
    reason_phrase: string;
    status_code: number;
    to: NameAddrHeader;
    to_tag: string;
    via_branch: string;
  }
}


export interface NameAddrHeader {
  parameters: {
    tag: string;
  };
  uri: any;
  display_name: string;
}
