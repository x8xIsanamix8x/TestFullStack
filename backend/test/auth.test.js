const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const Users = require('../models/Users');

// ? POST CREATE USER
describe('POST /register', function() {
  this.timeout(10000); // 10 segundos

  before(async () => {
    await Users.deleteOne({ email: 'juan.perez@example.com' });
  });

  it('debería crear un nuevo usuario y retornar un status 201', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Juan',
        lName: 'Pérez',
        role: 'admin',
        email: 'juan.perez@example.com',
        password: '123456'
      });
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property('uid');
  });
});

// ? POST LOGIN USER
describe('POST /login', function() {
  this.timeout(10000); 

  it('debería loguear el usuario y retornar un token válido', async () => {
    const res = await request(app)
      .post('/api/auth/login') 
      .send({
        email: 'juan.perez@example.com',
        password: '123456'
      });
    
    
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property('uid');
    expect(res.body).to.have.property('token');
    expect(res.body.token).to.be.a('string');
  });
});