process.env.SECRET_JWT = process.env.SECRET_JWT || 'mysecret';

const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const { generateJWT } = require('../helpers/jwt');
const Evaluations = require('../models/Evaluations');

describe('GET /api/employees', function() {
  this.timeout(10000); 

  it('debería retornar 401 si no se provee token', async () => {
    const res = await request(app).get('/api/employees');
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.have.property('msg', 'No token provided');
  });

  it('debería retornar la lista de usuarios si se provee un token válido', async () => {
   
    const token = await generateJWT('testuid', 'TestUser');

    const res = await request(app)
      .get('/api/employees')
      .set('x-token', token);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('ok', true);
    expect(res.body).to.have.property('users').that.is.an('array');
  });
});

