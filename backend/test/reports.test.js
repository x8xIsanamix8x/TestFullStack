process.env.SECRET_JWT = process.env.SECRET_JWT || 'mysecret';

const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const { generateJWT } = require('../helpers/jwt');
const app = require('../app');
const Evaluations = require('../models/Evaluations');
const Feedbacks = require('../models/Feedbacks');

describe('GET /api/reports/employee/:id', function() {
  this.timeout(10000);
  
  let token;
  const employeeId = "67bb6b3dc4da0e4d5b8ab0cb"; // ID fijo para la prueba

  before(async () => {
    // Limpia las colecciones de evaluaciones y feedbacks
    await Evaluations.deleteMany({});
    await Feedbacks.deleteMany({});
    
    // Genera un token válido
    token = await generateJWT('testuid', 'TestUser');
    
    // Crea dos evaluaciones para el employeeId dado mediante el endpoint de evaluaciones
    const evalData1 = {
      employeeId,
      evaluatorId: new mongoose.Types.ObjectId().toHexString(),
      date: new Date().toISOString(),
      nameEvaluation: "Report Evaluation 1",
      score: 7,
      commets: "Initial comment 1",
      status: "pending"
    };

    const evalData2 = {
      employeeId,
      evaluatorId: new mongoose.Types.ObjectId().toHexString(),
      date: new Date().toISOString(),
      nameEvaluation: "Report Evaluation 2",
      score: 9,
      commets: "Initial comment 2",
      status: "approved"
    };

    const res1 = await request(app)
      .post('/api/evaluations')
      .set('x-token', token)
      .send(evalData1);
      
    const res2 = await request(app)
      .post('/api/evaluations')
      .set('x-token', token)
      .send(evalData2);
      
    // Crea feedbacks para cada evaluación utilizando directamente el modelo Feedbacks
    await new Feedbacks({
      userId: new mongoose.Types.ObjectId().toHexString(),
      evaluationId: res1.body.evaluation.id,
      comment: "Feedback for evaluation 1"
    }).save();

    await new Feedbacks({
      userId: new mongoose.Types.ObjectId().toHexString(),
      evaluationId: res2.body.evaluation.id,
      comment: "Feedback for evaluation 2"
    }).save();
  });

  it('debería retornar 200 y las evaluaciones con sus feedbacks para el employeeId dado', async () => {
    const res = await request(app)
      .get(`/api/reports/employee/${employeeId}`)
      .set('x-token', token);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('ok', true);
    expect(res.body).to.have.property('evaluations');
    expect(res.body.evaluations).to.be.an('array');
    // Se esperan 2 evaluaciones creadas
    expect(res.body.evaluations.length).to.equal(2);
    // Verifica que cada evaluación incluya un arreglo "feedbacks"
    res.body.evaluations.forEach(evaluation => {
      expect(evaluation).to.have.property('feedbacks');
      expect(evaluation.feedbacks).to.be.an('array');
    });
  });

  it('debería retornar 404 si no se encuentran evaluaciones para el employeeId dado', async () => {
    // Genera un ID de empleado inexistente
    const fakeEmployeeId = new mongoose.Types.ObjectId().toHexString();
    const res = await request(app)
      .get(`/api/reports/employee/${fakeEmployeeId}`)
      .set('x-token', token);
    
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property('ok', false);
    expect(res.body).to.have.property('msg', 'No evaluations found for this employee');
  });
});
