export enum ConnectionActionTypes {
  // user information
  UpdateUsername = '[Connection] Update username',
  UpdatePassword = '[Connection] Update password',
  UpdateAge = '[Connection] Update age',
  // navigation
  GoToPageOne = '[Connection Navigation] Go to page one',
  GoToPageTwo = '[Connection Navigation] Go to page two',
}

export class UpdateUsername {
  static readonly type = ConnectionActionTypes.UpdateUsername;
  constructor(public username: string) {}
}

export class UpdatePassword {
  static readonly type = ConnectionActionTypes.UpdatePassword;
  constructor(public password: string) {}
}

export class UpdateAge {
  static readonly type = ConnectionActionTypes.UpdateAge;
  constructor(public age: number) {}
}

export class GoToPageOne {
  static readonly type = ConnectionActionTypes.GoToPageOne;
}

export class GoToPageTwo {
  static readonly type = ConnectionActionTypes.GoToPageTwo;
}
