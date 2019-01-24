import { Response } from "express";
import { WoopsError } from './WoopsError';
import { WoopsOptions } from './WoopsOptions';

export class Woops {

  // 4xx Client Errors

  public static badRequest(message: string, data?: any): WoopsError {
    return new WoopsError(400, message, data);
  }

  public static unauthorized(message?: string, scheme?: any, attributes?: any): WoopsError {

    let wwwAuthenticateHeaderValue: string | undefined;

    if (typeof scheme === 'string') {
      wwwAuthenticateHeaderValue = scheme;

      if (attributes) {
        if (typeof attributes === 'string') {
          wwwAuthenticateHeaderValue += " " + encodeURIComponent(attributes);
        } else {
          wwwAuthenticateHeaderValue += " " + Object.keys(attributes).map(key => {
            return `${key}="${encodeURIComponent((attributes[key] || '').toString())}"`
          }).join(', ');
        }
      }
    }

    let headers: Map<string, string> | undefined;
    if (wwwAuthenticateHeaderValue) {
      headers = new Map([['WWW-Authenticate', wwwAuthenticateHeaderValue]]);
    }

    return new WoopsError(401, message || "Unauthorized", null, headers);
  }

  public static paymentRequired(message: string, data?: any): WoopsError {
    return new WoopsError(402, message, data);
  }

  public static forbidden(message: string, data?: any): WoopsError {
    return new WoopsError(403, message, data);
  }

  public static notFound(message: string, data?: any): WoopsError {
    return new WoopsError(404, message, data);
  }

  public static methodNotAllowed(message: string, data?: any, allow?: any): WoopsError {

    let allowHeaderValue: string | undefined;
    if (allow) {
      if (Array.isArray(allow)) {
        allowHeaderValue = allow.join(', ');
      } else {
        allowHeaderValue = allow;
      }
    }

    let headers: Map<string, string> | undefined;
    if (allowHeaderValue) {
      headers = new Map([['Allow', allowHeaderValue]]);
    }

    return new WoopsError(405, message, data, headers);
  }

  public static notAcceptable(message: string, data?: any): WoopsError {
    return new WoopsError(406, message, data);
  }

  public static proxyAuthRequired(message: string, data?: any): WoopsError {
    return new WoopsError(407, message, data);
  }

  public static clientTimeout(message: string, data?: any): WoopsError {
    return new WoopsError(408, message, data);
  }

  public static conflict(message: string, data?: any): WoopsError {
    return new WoopsError(409, message, data);
  }

  public static resourceGone(message: string, data?: any): WoopsError {
    return new WoopsError(410, message, data);
  }

  public static lengthRequired(message: string, data?: any): WoopsError {
    return new WoopsError(411, message, data);
  }

  public static preconditionFailed(message: string, data?: any): WoopsError {
    return new WoopsError(412, message, data);
  }

  public static entityTooLarge(message: string, data?: any): WoopsError {
    return new WoopsError(413, message, data);
  }

  public static uriTooLong(message: string, data?: any): WoopsError {
    return new WoopsError(414, message, data);
  }

  public static unsupportedMediaType(message: string, data?: any): WoopsError {
    return new WoopsError(415, message, data);
  }

  public static rangeNotSatisfiable(message: string, data?: any): WoopsError {
    return new WoopsError(416, message, data);
  }

  public static expectationFailed(message: string, data?: any): WoopsError {
    return new WoopsError(417, message, data);
  }

  public static teapot(message: string, data?: any): WoopsError {
    return new WoopsError(418, message, data);
  }

  public static badData(message: string, data?: any): WoopsError {
    return new WoopsError(422, message, data);
  }

  public static locked(message: string, data?: any): WoopsError {
    return new WoopsError(423, message, data);
  }

  public static failedDependency(message: string, data?: any): WoopsError {
    return new WoopsError(424, message, data);
  }

  public static preconditionRequired(message: string, data?: any): WoopsError {
    return new WoopsError(428, message, data);
  }

  public static tooManyRequests(message: string, data?: any): WoopsError {
    return new WoopsError(429, message, data);
  }

  public static illegal(message: string, data?: any): WoopsError {
    return new WoopsError(451, message, data);
  }

  // 5xx Server Errors

  public static internal(message: string, data?: any, statusCode: number = 500): WoopsError {
    return new WoopsError(statusCode, message, data);
  }

  public static notImplemented(message: string, data?: any): WoopsError {
    return new WoopsError(501, message, data);
  }

  public static badGateway(message: string, data?: any): WoopsError {
    return new WoopsError(502, message, data);
  }

  public static serverUnavailable(message: string, data?: any): WoopsError {
    return new WoopsError(503, message, data);
  }

  public static gatewayTimeout(message: string, data?: any): WoopsError {
    return new WoopsError(504, message, data);
  }

  public static badImplementation(message: string, data?: any): WoopsError {
    const error = new WoopsError(500, message, data);
    error.isDeveloperError = true;
    return error;
  }

  // MARK: Properties

  protected response: Response;
  protected options: WoopsOptions;

  // MARK: Constructor

  constructor(response: Response, options?: WoopsOptions) {
    this.response = response;
    this.options  = options || new WoopsOptions();
  }

  // MARK: - Errors

  // 4xx Client Errors

  public badRequest(message: string, data?: any) {
    this.send(Woops.badRequest(message, data));
  }

  public unauthorized(message?: string, scheme?: string, attributes?: object) {
    this.send(Woops.unauthorized(message, scheme, attributes));
  }

  public paymentRequired(message: string, data?: any) {
    this.send(Woops.paymentRequired(message, data));
  }

  public forbidden(message: string, data?: any) {
    this.send(Woops.forbidden(message, data));
  }

  public notFound(message: string, data?: any) {
    this.send(Woops.notFound(message, data));
  }

  public methodNotAllowed(message: string, data?: any, allow?: any) {
    this.send(Woops.methodNotAllowed(message, data, allow));
  }

  public notAcceptable(message: string, data?: any) {
    this.send(Woops.notAcceptable(message, data));
  }

  public proxyAuthRequired(message: string, data?: any) {
    this.send(Woops.proxyAuthRequired(message, data));
  }

  public clientTimeout(message: string, data?: any) {
    this.send(Woops.clientTimeout(message, data));
  }

  public conflict(message: string, data?: any) {
    this.send(Woops.conflict(message, data));
  }

  public resourceGone(message: string, data?: any) {
    this.send(Woops.resourceGone(message, data));
  }

  public lengthRequired(message: string, data?: any) {
    this.send(Woops.lengthRequired(message, data));
  }

  public preconditionFailed(message: string, data?: any) {
    this.send(Woops.preconditionFailed(message, data));
  }

  public entityTooLarge(message: string, data?: any) {
    this.send(Woops.entityTooLarge(message, data));
  }

  public uriTooLong(message: string, data?: any) {
    this.send(Woops.uriTooLong(message, data));
  }

  public unsupportedMediaType(message: string, data?: any) {
    this.send(Woops.unsupportedMediaType(message, data));
  }

  public rangeNotSatisfiable(message: string, data?: any) {
    this.send(Woops.rangeNotSatisfiable(message, data));
  }

  public expectationFailed(message: string, data?: any) {
    this.send(Woops.expectationFailed(message, data));
  }

  public teapot(message: string, data?: any) {
    this.send(Woops.teapot(message, data));
  }

  public badData(message: string, data?: any) {
    this.send(Woops.badData(message, data));
  }

  public locked(message: string, data?: any) {
    this.send(Woops.locked(message, data));
  }

  public failedDependency(message: string, data?: any) {
    this.send(Woops.failedDependency(message, data));
  }

  public preconditionRequired(message: string, data?: any) {
    this.send(Woops.preconditionRequired(message, data));
  }

  public tooManyRequests(message: string, data?: any) {
    this.send(Woops.tooManyRequests(message, data));
  }

  public illegal(message: string, data?: any) {
    this.send(Woops.illegal(message, data));
  }

  // 5xx Server Errors

  public internal(message: string, data?: any, statusCode = 500) {
    this.send(Woops.internal(message, data, statusCode));
  }

  public notImplemented(message: string, data?: any) {
    this.send(Woops.notImplemented(message, data));
  }

  public badGateway(message: string, data?: any) {
    this.send(Woops.badGateway(message, data));
  }

  public serverUnavailable(message: string, data?: any) {
    this.send(Woops.serverUnavailable(message, data));
  }

  public gatewayTimeout(message: string, data?: any) {
    this.send(Woops.gatewayTimeout(message, data));
  }

  public badImplementation(message: string, data?: any) {
    this.send(Woops.badImplementation(message, data));
  }

  // MARK: Send response

  public send(error: Error) {
    const woopsError = WoopsError.woopsify(error);

    this.response
      .status(woopsError.status)
      .header(woopsError.headersAsObject())
      .send(woopsError.toPayload(this.options));
  }
}