process.env.SECRET_JWT = process.env.SECRET_JWT || 'mysecret';

const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../app');
const Feedbacks = require('../models/Feedbacks');
const { generateJWT } = require('../helpers/jwt');


describe('POST /api/feedback', function() {
  this.timeout(10000);
  
  let token;
  
  before(async () => {
    await Feedbacks.deleteMany({});
    token = await generateJWT('testuid', 'TestUser');
  });

  it('debería retornar 401 si no se provee token', async () => {
    const res = await request(app)
      .post('/api/feedback')
      .send({
        userId: new mongoose.Types.ObjectId().toHexString(),
        evaluationId: new mongoose.Types.ObjectId().toHexString(),
        comment: "Test feedback comment"
      });
    
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.have.property('msg');
  });

  it('debería crear un nuevo feedback y retornar 201 con los datos del feedback', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const evaluationId = new mongoose.Types.ObjectId().toHexString();
    const feedbackData = {
      userId,
      evaluationId,
      comment: "This is a test feedback"
    };

    const res = await request(app)
      .post('/api/feedback')
      .set('x-token', token)
      .send(feedbackData);
    
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property('ok', true);
    expect(res.body).to.have.property('comment');
    // Verifica que se hayan retornado los datos enviados
    expect(res.body.comment).to.have.property('_id');
    expect(res.body.comment).to.have.property('userId', feedbackData.userId);
    expect(res.body.comment).to.have.property('evaluationId', feedbackData.evaluationId);
    expect(res.body.comment).to.have.property('comment', feedbackData.comment);
  });
});
