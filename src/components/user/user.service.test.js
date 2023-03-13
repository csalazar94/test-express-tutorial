import User from './user.entities';
import UserService from './user.service';

describe('UserService', () => {
  let userService;
  let usersToAdd;

  beforeEach(() => {
    userService = new UserService();
    usersToAdd = [
      new User('user1@example.com', 'password123'),
      new User('user2@example.com', 'password456'),
      new User('user3@example.com', 'password789'),
    ];
    usersToAdd.forEach((user) => {
      userService.users.push(user);
    });
  });

  describe('addUser', () => {
    it('should add a new user to the users array', () => {
      const user = new User('test@example.com', 'password123');
      userService.addUser(user);

      expect(userService.users.length).toBe(4);
      expect(userService.users[3]).toBe(user);
    });

    it('should throw an error if a user with the same email already exists', () => {
      const existingUser = new User('user1@example.com', 'password123');

      expect(() => userService.addUser(existingUser)).toThrowError('User already exists');
      expect(userService.users.length).toBe(3);
    });
  });

  describe('getUsers', () => {
    it('should return an empty array if there are no users in the database', () => {
      const newUserService = new UserService();
      const users = newUserService.getUsers();
      expect(users).toEqual([]);
    });

    it('should return an array of all users in the database', () => {
      const users = userService.getUsers();

      expect(users).toEqual(usersToAdd);
    });
  });

  describe('getUser', () => {
    it('should return undefined if the user is not found', () => {
      const user = userService.getUser('3');

      expect(user).toBeUndefined();
    });

    it('should return the correct user if the user is found', () => {
      const foundUser = userService.getUser(usersToAdd[0].id);

      expect(foundUser).toEqual(usersToAdd[0]);
      expect(foundUser).not.toEqual(usersToAdd[1]);
    });
  });

  describe('login', () => {
    it('should throw an error if the email is not found', () => {
      expect(() => userService.login('user4@example.com', '123456').toThrowError('Wrong email'));
      expect(usersToAdd[0].lastLogin).toBeUndefined();
    });

    it('should throw an error if the password is incorrect', () => {
      expect(() => userService.login('user1@example.com', '123456').toThrowError('Wrong password'));
      expect(usersToAdd[0].lastLogin).toBeUndefined();
    });

    it('should log in the user and update the last login time', () => {
      const beforeLogin = new Date();
      const loggedInUser = userService.login('user1@example.com', 'password123');
      const afterLogin = new Date();

      expect(loggedInUser).toEqual(usersToAdd[0]);
      expect(usersToAdd[0].lastLogin.getTime()).toBeGreaterThanOrEqual(beforeLogin.getTime());
      expect(usersToAdd[0].lastLogin.getTime()).toBeLessThanOrEqual(afterLogin.getTime());
    });
  });
});
