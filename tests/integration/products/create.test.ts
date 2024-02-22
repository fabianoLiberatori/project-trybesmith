import sinon from 'sinon';
import chai, { expect } from 'chai';
import ProductModel from '../../../src/database/models/product.model';
import chaiHttp from 'chai-http';
import { ProductsPayload } from '../../../src/types/ProductsPayload';
import app from '../../../src/app';
import modelResponseCreate from '../../../tests/mocks/productsMock'

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  describe('teste para cadastro de produtos', function () {
    it('se retornar com status e sendBody corretos', async function () {
      const mockProducts = ProductModel.build(modelResponseCreate)
      sinon.stub(ProductModel, 'create').resolves(mockProducts);
  
      const body: ProductsPayload = {
        name: 'Martelo de Thor',
        price: '30 peças de ouro',
        userId: 1
      }

      const httpResponse = await chai.request(app)
      .post('/products')
      .send(body);

      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.deep.equal(modelResponseCreate)

    })
  })

});
