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

      it('Developer Info', async () => {
        let infoDeveloper = await contratoZombiFactory.developerInfo();      
        console.log('Info Developer: ', infoDeveloper);
        assert.ok(infoDeveloper, 'No hay información para mostrar');
        const NOMBRE = "0";
        const URL_GITHUB = "1";
        const URL_LINKEDIN = "2";
        const ID = "3";
        console.log('Nombre  : ' + infoDeveloper[NOMBRE]);
        console.log('GitHub  : ' + infoDeveloper[URL_GITHUB]);
        console.log('Linkedin: ' + infoDeveloper[URL_LINKEDIN]);
        console.log('Id      : ' + infoDeveloper[ID]);
      });  
     });
  });