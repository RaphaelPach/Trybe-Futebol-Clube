import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import Team from '../database/models/Team';

import { Response } from 'superagent';
import teams from './utils/teamMock';
import loginMock from './utils/loginMock'
import createTokenJWT  from '../Utils/jwt';
import newMock from './utils/newLoginMock';
import users from './utils/loginMock';
import loginId from './utils/loginMockId';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpont /teams ', () => {
  
   let chaiHttpResponse: Response;

   after(()=>{
      sinon.restore();
   })

   it('espera a resposta de todos os times', async () => {
    sinon
       .stub(Team, "findAll")
       .resolves( teams as Team[]);
    const response = chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teams);  
   });

  it('testando pelo id', async () => {
    sinon
       .stub(Team, "findOne")
       .resolves( loginId as Team);
    const response = chaiHttpResponse = await chai.request(app).get('/teams/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(loginId);
  });
});

describe('Testes do endpoint /login ', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "create")
      .resolves();
  })

  after(()=>{
    (User.create as sinon.SinonStub).restore();
  })

   
  it('testando o retorno do token', async () => {
    const token = createTokenJWT(newMock);
     chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(users[1])
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({token});  


  })
});



function after(arg0: () => void) {
  throw new Error('Function not implemented.');
}

function before(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

