export class Form {
  heading = 'Welcome to the Aurelia Navigation App!';
  firstName = 'John';
  lastName = 'Doe';

  //Getters can't be observed with Object.observe, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below.
  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  formtest(){
    alert(`Welcome, ${this.fullName}!`);
  }
}

export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
