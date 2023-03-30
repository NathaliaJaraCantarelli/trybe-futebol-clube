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
      .send({ email: 'admin@admin.com', password: 'admin' }));
    

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
    expect(result.body).to.be.deep.equal({ message: 'Email or password invalid' });
  })

  it('Retorna um erro quando o email não é válida', async () => {
    sinon.stub(modelUser, 'findOne').resolves(null);

    const result: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'administrador@admin.com', password: 'admin' }));
    

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Email or password invalid' });
  })
})
