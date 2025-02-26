process.env.SECRET_JWT = process.env.SECRET_JWT || 'mysecret';

const request = require('supertest');
const { expect } = require('chai');
const Evaluations = require('../models/Evaluations');
const { generateJWT } = require('../helpers/jwt');
const app = require('../app');
const { default: mongoose } = require('mongoose');

describe('POST /api/evaluations', function() {
  this.timeout(10000);

  before(async () => {
    await Evaluations.deleteMany({});
  });

  it('debería retornar 401 si no se provee token', async () => {
    const res = await request(app)
      .post('/api/evaluations')
      .send({
        employeeId: "67bb6b3dc4da0e4d5b8ab0cb",
        evaluatorId: "67bb6abd2890b4adb53950b6",
        date: new Date().toISOString(),
        nameEvaluation: "Test Evaluation",
        score: 9,
        commets: "Great performance",
        status: "approved"
      });
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.have.property('msg');
  });

  it('debería crear una evaluación y retornar un status 201 con los datos de la evaluación', async () => {
    const token = await generateJWT('testuid', 'TestUser');

    const evaluationData = {
      employeeId: "67bb6b3dc4da0e4d5b8ab0cb",
      evaluatorId: "67bb6abd2890b4adb53950b6",
      date: new Date().toISOString(),
      nameEvaluation: "Test Evaluation",
      score: 9,
      commets: "Great performance",
      status: "approved"
    };

    const res = await request(app)
      .post('/api/evaluations')
      .set('x-token', token)
      .send(evaluationData);

    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property('ok', true);
    expect(res.body).to.have.property('evaluation');
    expect(res.body.evaluation).to.have.property('id');
    expect(res.body.evaluation).to.have.property('employeeId');
    expect(res.body.evaluation).to.have.property('evaluatorId');
    expect(res.body.evaluation).to.have.property('date');
    expect(res.body.evaluation).to.have.property('nameEvaluation', evaluationData.nameEvaluation);
    expect(res.body.evaluation).to.have.property('score', evaluationData.score);
  });
});

describe('GET /api/evaluations/:id', function() {
  this.timeout(10000);
  let evaluationId;

  before(async () => {
    // Limpia las evaluaciones y crea una de prueba para el GET
    await Evaluations.deleteMany({});
    const token = await generateJWT('testuid', 'TestUser');

    const evaluationData = {
      employeeId: "67bb6b3dc4da0e4d5b8ab0cb",
      evaluatorId: "67bb6abd2890b4adb53950b6",
      date: new Date().toISOString(),
      nameEvaluation: "Test Evaluation GET",
      score: 8,
      commets: "Good performance",
      status: "pending"
    };

    const res = await request(app)
      .post('/api/evaluations')
      .set('x-token', token)
      .send(evaluationData);
    
    evaluationId = res.body.evaluation.id;
  });

  it('debería retornar 200 y la evaluación cuando existe', async () => {
    const token = await generateJWT('testuid', 'TestUser');
    const res = await request(app)
      .get(`/api/evaluations/${evaluationId}`)
      .set('x-token', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('ok', true);
    expect(res.body).to.have.property('evaluation');
    expect(res.body.evaluation).to.have.property('id', evaluationId);
  });

  it('debería retornar 404 si la evaluación no existe', async () => {
    const token = await generateJWT('testuid', 'TestUser');
    const fakeId = '123456789012345678901234';
    const res = await request(app)
      .get(`/api/evaluations/${fakeId}`)
      .set('x-token', token);
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property('msg', 'Evaluation not found');
  });
});

describe('PUT /api/evaluations/:id', function() {
    this.timeout(10000);
    
    let evaluationId;
    let token;
    let originalEmployeeId, originalEvaluatorId;
  
    before(async () => {
      // Limpia la colección de evaluaciones
      await Evaluations.deleteMany({});
      
      // Genera un token válido para la prueba
      token = await generateJWT('testuid', 'TestUser');
      
      // Crea una evaluación de prueba y almacena su id y los valores originales de employeeId y evaluatorId
      const evaluationData = {
        employeeId: "67bb6b3dc4da0e4d5b8ab0cb",
        evaluatorId: "67bb6abd2890b4adb53950b6",
        date: new Date().toISOString(),
        nameEvaluation: "Initial Evaluation",
        score: 5,
        commets: "Initial comment",
        status: "pending"
      };
  
      const res = await request(app)
        .post('/api/evaluations')
        .set('x-token', token)
        .send(evaluationData);
  
      evaluationId = res.body.evaluation.id;
      originalEmployeeId = res.body.evaluation.employeeId;
      originalEvaluatorId = res.body.evaluation.evaluatorId;
    });
  
    it('debería actualizar la evaluación y retornar 200 con los datos actualizados', async () => {
      const updateData = {
        date: new Date().toISOString(),
        nameEvaluation: "Updated Evaluation",
        score: 10,
        commets: "Updated comment",
        status: "approved",
        // Estos campos se envían pero deben ser ignorados en la actualización
        employeeId: "ShouldNotUpdate",
        evaluatorId: "ShouldNotUpdate"
      };
  
      const res = await request(app)
        .put(`/api/evaluations/${evaluationId}`)
        .set('x-token', token)
        .send(updateData);
  
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('ok', true);
      expect(res.body).to.have.property('evaluation');
      // Se verifica que la evaluación actualizada incluya la propiedad "id" con el mismo valor que evaluationId
      expect(res.body.evaluation).to.have.property('id', evaluationId);
      expect(res.body.evaluation).to.have.property('nameEvaluation', updateData.nameEvaluation);
      expect(res.body.evaluation).to.have.property('score', updateData.score);
      // Verifica que employeeId y evaluatorId no hayan cambiado
      expect(res.body.evaluation.employeeId).to.equal(originalEmployeeId);
      expect(res.body.evaluation.evaluatorId).to.equal(originalEvaluatorId);
    });
  
    it('debería retornar 404 si se intenta actualizar una evaluación inexistente', async () => {
      const fakeId = new mongoose.Types.ObjectId().toHexString();
      const updateData = {
        date: new Date().toISOString(),
        nameEvaluation: "Updated Evaluation",
        score: 10,
        commets: "Updated comment",
        status: "approved"
      };
  
      const res = await request(app)
        .put(`/api/evaluations/${fakeId}`)
        .set('x-token', token)
        .send(updateData);
  
      expect(res.statusCode).to.equal(404);
      expect(res.body).to.have.property('msg', 'Evaluation not found');
    });
});

describe('GET /api/evaluations/employee/:id', function() {
    this.timeout(10000);
    
    let token;
    const employeeId = "67bb6b3dc4da0e4d5b8ab0cb"; // ID fijo para la prueba
  
    before(async () => {
      // Limpia la colección de evaluaciones
      await Evaluations.deleteMany({});
      // Genera un token válido
      token = await generateJWT('testuid', 'TestUser');
  
      // Crea dos evaluaciones para el employeeId
      const evaluationData1 = {
        employeeId,
        evaluatorId: "67bb6abd2890b4adb53950b6",
        date: new Date().toISOString(),
        nameEvaluation: "Evaluation 1",
        score: 7,
        commets: "Comment 1",
        status: "pending"
      };
  
      const evaluationData2 = {
        employeeId,
        evaluatorId: "67bb6abd2890b4adb53950b6",
        date: new Date().toISOString(),
        nameEvaluation: "Evaluation 2",
        score: 9,
        commets: "Comment 2",
        status: "approved"
      };
  
      await request(app)
        .post('/api/evaluations')
        .set('x-token', token)
        .send(evaluationData1);
  
      await request(app)
        .post('/api/evaluations')
        .set('x-token', token)
        .send(evaluationData2);
    });
  
    it('debería retornar 200 y las evaluaciones para el employeeId dado', async () => {
      const res = await request(app)
        .get(`/api/evaluations/employee/${employeeId}`)
        .set('x-token', token);
  
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('ok', true);
      expect(res.body).to.have.property('evaluations');
      expect(res.body.evaluations).to.be.an('array');
      expect(res.body.evaluations.length).to.equal(2);
    });
  
    it('debería retornar 404 si no existen evaluaciones para el employeeId dado', async () => {
      // Generamos un ID aleatorio para un empleado sin evaluaciones
      const fakeEmployeeId = new mongoose.Types.ObjectId().toHexString();
      const res = await request(app)
        .get(`/api/evaluations/employee/${fakeEmployeeId}`)
        .set('x-token', token);
  
      expect(res.statusCode).to.equal(404);
      expect(res.body).to.have.property('ok', false);
      expect(res.body).to.have.property('msg', 'No evaluations found for this employee');
    });
  });


