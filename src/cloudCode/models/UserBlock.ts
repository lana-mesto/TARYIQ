export default class UserBlock extends Parse.Object {
  constructor() {
    super('UserBlock');
  }

  get isUserBlocked(): boolean {
    return super.get('isUserBlocked');
  }
  set isUserBlocked(value: boolean) {
    super.set('isUserBlocked', value);
  }
}

Parse.Object.registerSubclass('UserBlock', UserBlock);
