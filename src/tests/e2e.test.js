import request from 'supertest';
import app from '../app';

describe('User Component', () => {
  let user1;

  describe('POST /users', () => {
    it('should add one user', async () => {
      const res = await request(app).post('/users').send({
        email: 'user1@example.com',
        password: '123456',
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.email).toBe('user1@example.com');
      user1 = res.body;
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });

  describe('POST /users/login', () => {
    it('should login', async () => {
      const beforeLoginDate = new Date();
      const res = await request(app).post('/users/login').send({
        email: 'user1@example.com',
        password: '123456',
      });
      expect(res.statusCode).toBe(200);
      expect(new Date(res.body.lastLogin).getTime()).toBeGreaterThanOrEqual(beforeLoginDate.getTime());
    });

    it('should not login', async () => {
      const res = await request(app).post('/users/login').send({
        email: 'user1@example.com',
        password: '1234',
      });
      expect(res.statusCode).toBe(500);
    });
  });

  describe('GET /users/:id', () => {
    it('should return one user', async () => {
      const res = await request(app).get(`/users/${user1.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id');
    });
  });
});
