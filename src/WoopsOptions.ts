export class WoopsOptions {
  public shouldIncludeErrorStack: boolean = false;
  constructor(shouldIncludeErrorStackTrace?: boolean) {
    this.shouldIncludeErrorStack = shouldIncludeErrorStackTrace === true;
  }
}