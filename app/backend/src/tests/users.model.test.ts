import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import modelUser from '../database/models/User';
import { UserOne } from './mocks/users.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a model de Users', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Retorna o token de um login', async () => {
    sinon.stub(modelUser, 'findOne').resolves(UserOne[0]);

    const result: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'admin1' }));
    

    expect(result.status).to.be.equal(200);
    expect(result.body.token).to.be.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
  })

  it('Retorna um erro ao faltar credenciais', async () => {
    const result: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' }));
    

    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.deep.equal({ message: 'All fields must be filled' });
  })

  it('Retorna um erro quando a senha não é válida', async () => {
    sinon.stub(modelUser, 'findOne').resolves(UserOne[0]);

    const result: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'administrador' }));
    

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
  })

  it('Retorna um erro quando o email não é válida', async () => {
    sinon.stub(modelUser, 'findOne').resolves(null);

    const result: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'administrador@admin.com', password: 'admin' }));
    

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
  })

  it('Retorna um erro quando o email não é um email', async () => {
    sinon.stub(modelUser, 'findOne').resolves(null);

    const result: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'administradoradmin.com', password: 'admin' }));
    

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
  })

   it('Retorna a role de um login', async () => {
    sinon.stub(modelUser, 'findOne').resolves(UserOne[0]);

    const token: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'admin1' }));
    
    const result: Response = (await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', token.body.token)); 

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal({ role: 'admin' });
  })

  it('Retorna um erro com um token invalido', async () => {
    const result: Response = (await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', '1234')); 

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Token must be a valid token' });
  })

  it('Retorna um erro com um token não encontrado', async () => {
    const result: Response = (await chai
      .request(app)
      .get('/login/role'));

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Token not found' });
  })
})
