const assert = require('assert')
const ZombiFactory = artifacts.require('ZombiFactory')

describe('Test de Contrato ZombiFactory', () => {
    contract('ZombiFactory', accounts => {
      let contratoZombiFactory;
  
      before('setup contract', async () => {
        contratoZombiFactory = await ZombiFactory.new({from: accounts[0]});
        assert.ok(contratoZombiFactory, 'Contrato no instanciado');
      });
  
      it('Crear Zombies', async () => {
        let trx= await contratoZombiFactory.createRandomZombie('Sarlanga Marlanga');      
        console.log('TRX: ', trx);
        assert.ok(trx, 'Transacción no definida');

        trx= await contratoZombiFactory.createRandomZombie('Chicharito Hernandez', {from: accounts[1]});      
        console.log('TRX: ', trx);
        assert.ok(trx, 'Transacción no definida');
      });  
     });
  });