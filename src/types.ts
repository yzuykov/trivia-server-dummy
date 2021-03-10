export type SocketRequestStatus = "success" | "error"

export interface SocketHeader {
  method: string;
  id: number;
  refId?: number;
  token?: string;
  status?: SocketRequestStatus;
}

export interface SocketError {
  code: SocketErrors;
  description: string;
}

export interface SocketMessage {
  headers: SocketHeader;
  body?: any;
  error?: SocketError;
}

export enum SocketErrors {
  BREWERY_EXPECTED = 101,
  PLAYER_EXPECTED = 102,
  PLAYER_NAME_EXPECTED = 117,
  PLAYER_ID_EXPECTED = 118,
  PLAYER_UNKNOWN_ID = 119,
  PLAYER_NICK_EXPECTED = 120,
  PLAYER_EMAIL_EXPECTED = 121,
  PLAYER_PASS_EXPECTED = 122,
  UNALLOWED_PLAYER_NICK = 123,
  DUPLICATE_PLAYER_NICK = 124,
  TOKEN_EXPECTED = 125,
  SERVER_ERROR = 200,
  METHOD_ERROR = 201,
  REQUEST_ID_ERROR = 202,
  AUTH_FAILED = 203,
}