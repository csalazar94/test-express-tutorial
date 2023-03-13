class UserService {
  constructor() {
    this.users = [];
  }

  addUser = (user) => {
    if (this.users.find((u) => u.email === user.email)) {
      throw new Error('User already exists');
    }
    this.users.push(user);
    return user;
  };

  getUsers = () => this.users;

  getUser = (id) => {
    const user = this.users.find((u) => u.id === id);
    return user;
  };

  login = (email, password) => {
    const user = this.users.find((u) => u.email === email);
    if (user.password !== password) {
      throw new Error('Wrong password');
    }
    user.lastLogin = new Date();
    return user;
  };
}

export default UserService;
