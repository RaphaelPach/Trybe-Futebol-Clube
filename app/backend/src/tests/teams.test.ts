import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
/* import Example from '../database/models/ExampleModel'; */
import Team from '../database/models/Team';

import { Response } from 'superagent';
import teams from './utils/teamMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpont /teams ', () => {
  
   let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(Team, "findAll")
       .resolves( teams as Team[]);
   });

   after(()=>{
     (Team.findAll as sinon.SinonStub).restore();
   })

   it('espera a resposta de todos os times', async () => {
    const response = chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teams);  
   });

  it('testando pelo id', async () => {
    const response = chaiHttpResponse = await chai.request(app).get('/teams/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teams[0]);
  });
});
function before(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

function after(arg0: () => void) {
  throw new Error('Function not implemented.');
}

