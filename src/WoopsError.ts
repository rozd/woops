import { httpResponseCodes } from './httpResponseCodes';
import { Woops } from './Woops';

export class WoopsError extends Error {

  public static isWoopsError(error: Error): error is WoopsError {
    return (error as WoopsError).isWoopsError
  }

  public static woopsify(error: Error): WoopsError {
    if (WoopsError.isWoopsError(error)) {
      return error;
    }

    const woopsError: WoopsError = new WoopsError(500, 'An internal server error occurred', error);
    woopsError.stack = error.stack;
    woopsError.origin = error;

    return woopsError;
  }

  public status: number;
  public data?: any;
  public headers?: Map<string, string>;
  public isDeveloperError: boolean = false;
  public origin?: Error;
  public isWoopsError: boolean = true;

  constructor(status: number, message: string, data?: any, headers?: Map<string, string>) {
    super(message);
    this.status = status;
    this.data = data;
    this.headers = headers;
  }

  public headersAsObject(): object {
    const obj: any = {};
    if (this.headers) {
      this.headers.forEach((value, key) => obj[key] = value);
    }
    return obj;
  }

  public toPayload(options: Woops.WoopsOptions): object {
    const payload: WoopsErrorPayload = {
      statusCode: this.status,
      error: httpResponseCodes.get(this.status) || "Unknown",
      errorMessage: this.message,
      data: this.data
    };
    if (this.isDeveloperError) {
      payload.isDeveloperError = true;
    }
    if (options.shouldIncludeErrorStack) {
      payload.errorStack = this.stack;
    }
    if (this.origin) {
      payload.origin = this.origin;
    }
    return payload;
  }

}

interface WoopsErrorPayload {
  statusCode: number;

  error: string;
  errorMessage: string;
  errorStack?: string;

  data?: object;

  isDeveloperError?: boolean;
  origin?: Error;
}