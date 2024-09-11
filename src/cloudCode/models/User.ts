import UserBlock from "./UserBlock";

export default class User extends Parse.User {
  constructor() {
    super();
  }

  get authData(): {
    continueWithMobileAuth?: {
      id: string;
      OTP: string;
    };
  } {
    return super.get('authData');
  }
  set authData(value: {
    continueWithMobileAuth?: {
      id: string;
      OTP: string;
    };
  }) {
    super.set('authData', value);
  }
  get gender(): 'male' | 'female' {
    return super.get('gender');
  }
  set gender(value: 'male' | 'female') {
    super.set('gender', value);
  }

  get lang(): 'ar' | 'en' {
    return super.get('lang');
  }
  set lang(value: 'ar' | 'en') {
    super.set('lang', value);
  }

  get userBlock(): UserBlock {
    return super.get('userBlock');
  }
  set userBlock(value: UserBlock) {
    super.set('userBlock', value);
  }

  get mobileNumber(): string {
    return super.get('mobileNumber');
  }
  set mobileNumber(value: string) {
    super.set('mobileNumber', value);
  }

  get birthdate(): Date {
    return super.get('birthdate');
  }
  set birthdate(value: Date) {
    super.set('birthdate', value);
  }

  get fullName(): string {
    return super.get('fullName');
  }
  set fullName(value: string) {
    super.set('fullName', value);
  }

}

Parse.Object.registerSubclass('_User', User);
