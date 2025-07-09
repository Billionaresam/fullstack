const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server.js'); // Make sure this exports your Express app
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

describe('Auth: Login Flow', () => {
  let activeUser, inactiveUser;

  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test-auth');
  });

  beforeEach(async () => {
    await User.deleteMany();

    const hashed = await bcrypt.hash('pass123', 10);
    activeUser = await User.create({
      staffId: 'AD/TEST1/25',
      role: 'Admin',
      password: hashed,
      isActive: true
    });

    inactiveUser = await User.create({
      staffId: 'ED/DEAD1/25',
      role: 'Editor',
      password: hashed,
      isActive: false
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('✅ allows login for active user with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ staffId: activeUser.staffId, password: 'pass123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('❌ blocks login if user is soft-deleted (inactive)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ staffId: inactiveUser.staffId, password: 'pass123' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/disabled/i);
  });

  test('❌ blocks login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ staffId: activeUser.staffId, password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
  });

  test('❌ blocks login with unknown staffId', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ staffId: 'NON/EXIST/25', password: 'pass123' });

    expect(res.statusCode).toBe(401);
  });
});
describe('Auth: Registration Flow', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  test('✅ allows registration with valid data', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        staffId: 'AD/NEW1/25',
        role: 'Admin',
        password: 'newpass123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/success/i);
  });

  test('❌ blocks registration with existing staffId', async () => {
    await User.create({
      staffId: 'AD/EXIST/25',
      role: 'Admin',
      password: 'existpass123'
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        staffId: 'AD/EXIST/25',
        role: 'Admin',
        password: 'newpass123'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });

  test('❌ blocks registration with invalid data', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        staffId: '',
        role: 'Admin',
        password: ''
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid/i);
  });
});