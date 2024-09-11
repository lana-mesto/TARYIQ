export default class Doctor extends Parse.Object {
    constructor() {
      super('Doctor');
    }
  
    get fullName(): string {
      return super.get('fullName');
    }
    set fullName(value: string) {
      super.set('fullName', value);
    }
  
    
  }
  
  Parse.Object.registerSubclass('Doctor', Doctor);
  