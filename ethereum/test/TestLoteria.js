const assert = require('assert')
const Loteria = artifacts.require('Loteria')

describe('Test de Contrato Loteria', () => {
  contract('Loteria', accounts => {
    let contratoLoteria;
    let administrador = accounts[0];
    let jugador1 = accounts[1];
    let jugador2 = accounts[2];
    let jugador3 = accounts[3];

    before('setup contract', async () => {
      contratoLoteria = await Loteria.new({from: administrador});
    });

    it('Verificar Balance', async () => {
      const balanceInicial= await contratoLoteria.getBalance();      
      console.log('Balance Inicial: ', balanceInicial.toWei)
      assert.equal(web3.utils.toWei('0', 'wei'), balanceInicial, 'Balance inicial debe ser 0');
    });


  });
});