import crypto from 'crypto';

class User {
  constructor(email, password, age, lastLogin) {
    this.id = crypto.randomUUID();
    this.email = email;
    this.password = password;
    this.age = age;
    this.lastLogin = lastLogin;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      age: this.age || null,
      lastLogin: this.lastLogin || null,
    };
  }
}

export default User;
