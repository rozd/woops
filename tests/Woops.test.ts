import { Woops } from '../src/Woops';
import { WoopsOptions } from '../src/WoopsOptions';

import { Response } from 'jest-express/lib/response';
import { WoopsError } from '../lib/WoopsError';

describe('Woops', () => {

  describe('basic functionality', () => {

    it('should send error with headers', () => {
      const response = new Response();
      const woops = new Woops(response as any, new WoopsOptions());
      const error = WoopsError.woopsify(new Error('Test error'));
      error.headers = new Map<string, string>([["Header", "Value"]]);
      woops.send(error);
      expect(response.headers).toEqual({Header: "Value"});
    });

    it('should send any error as Internal Server Error', () => {
      const response = new Response();
      const woops = new Woops(response as any, new WoopsOptions());
      woops.send(new Error('Test error'));
      expect(response.status).toBeCalledWith(500);
      expect(response.send).toBeCalledWith(expect.objectContaining({statusCode: 500, error: 'Internal Server Error'}));
    });

  });

  describe('static methods', () => {

    let error: WoopsError | null;

    beforeEach(() => {
      error = null;
    });

    it('bad request', () => {
      error = Woops.badData("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('bad gateway', () => {
      error = Woops.badGateway("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('bad implementation', () => {
      error = Woops.badImplementation("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('bad request', () => {
      error = Woops.badRequest("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('client timeout', () => {
      error = Woops.clientTimeout("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('conflict', () => {
      error = Woops.conflict("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('entity too large', () => {
      error = Woops.entityTooLarge("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('expectation failed', () => {
      error = Woops.expectationFailed("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('failed dependency', () => {
      error = Woops.failedDependency("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('forbidden', () => {
      error = Woops.forbidden("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('gateway timeout', () => {
      error = Woops.gatewayTimeout("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('illegal', () => {
      error = Woops.illegal("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('internal', () => {
      error = Woops.internal("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('length required', () => {
      error = Woops.lengthRequired("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('locked', () => {
      error = Woops.locked("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('method not allowed', () => {
      error = Woops.methodNotAllowed("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
      error = Woops.methodNotAllowed("Test message", "TestScheme", 'Test1');
      expect(error.headers).toEqual(new Map([['Allow', 'Test1']]));
      error = Woops.methodNotAllowed("Test message", "TestScheme", ['Test1', 'Test2']);
      expect(error.headers).toEqual(new Map([['Allow', 'Test1, Test2']]));
    });

    it('not acceptable', () => {
      error = Woops.notAcceptable("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('not found', () => {
      error = Woops.notFound("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('not implemented', () => {
      error = Woops.notImplemented("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('payment required', () => {
      error = Woops.paymentRequired("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('precondition failed', () => {
      error = Woops.preconditionFailed("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('precondition required', () => {
      error = Woops.preconditionRequired("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('proxy auth required', () => {
      error = Woops.proxyAuthRequired("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('range not satisfiable', () => {
      error = Woops.rangeNotSatisfiable("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('resource gone', () => {
      error = Woops.resourceGone("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('server unavailable', () => {
      error = Woops.serverUnavailable("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('I\'m a teapot', () => {
      error = Woops.teapot("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('too many requests', () => {
      error = Woops.tooManyRequests("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('unauthorized', () => {
      error = Woops.unauthorized("Test message");
      expect(error.message).toEqual("Test message");
      error = Woops.unauthorized("Test message", "TestScheme");
      expect(error.headers).toEqual(new Map([['WWW-Authenticate', 'TestScheme']]));
      error = Woops.unauthorized("Test message", "TestScheme", {realm: 'TestRealm'});
      expect(error.headers).toEqual(new Map([['WWW-Authenticate', 'TestScheme realm=\"TestRealm\"']]));
    });

    it('unsupported media type', () => {
      error = Woops.unsupportedMediaType("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

    it('uri too long', () => {
      error = Woops.uriTooLong("Test message", "Test data");
      expect(error.message).toEqual("Test message");
      expect(error.data).toEqual("Test data");
    });

  });

});
