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
      console.log('Balance Inicial: ', balanceInicial);
      assert.equal(web3.utils.toWei('0', 'wei'), balanceInicial, 'Balance inicial debe ser 0');
    });

    it('Jugar', async () => {
      const balanceFinalbalanceInicial= await contratoLoteria.getBalance();      
      console.log('Balance Inicial: ',  web3.utils.fromWei(balanceFinalbalanceInicial, 'ether'), ' ether');
      await contratoLoteria.jugar({from: jugador1, value: web3.utils.toWei('1', 'ether')});
      await contratoLoteria.jugar({from: jugador2, value: web3.utils.toWei('1', 'ether')});
      await contratoLoteria.jugar({from: jugador3, value: web3.utils.toWei('1', 'ether')});

      const balanceFinal= await contratoLoteria.getBalance();
      console.log('Balance Final: ', web3.utils.fromWei(balanceFinal, 'ether'), ' ether');
      assert.ok(balanceFinal);
      assert.equal(web3.utils.fromWei(balanceFinal, 'ether'), 3, 'Deben haber 3 ehter');
    });

    it('getJugadores', async () => {
      let jugadores = await contratoLoteria.getJugadores();
      assert.ok(jugadores);
      console.log(jugadores);
      assert.equal(jugadores[0], jugador1, 'No está en el mismo orden - primero jugdaro1');
      assert.equal(jugadores[1], jugador2, 'No está en el mismo orden - primero jugdaro2');
      assert.equal(jugadores[2], jugador3, 'No está en el mismo orden - primero jugdaro3');
    });

    it('elegir ganador con un jugador', async () => {
      let huboCatch = false;
      try{
        let jugadores = await contratoLoteria.elegirGanador({from: jugador1});
      }
      catch(e){
        huboCatch = true;
        console.log(e);
      }
      assert.equal(huboCatch, true, 'Un jugador no debería poder invocarlo');
    });

    it('elegir ganador con un administrador', async () => {
      let huboCatch = false;
      let trx = undefined;
      let ganador = undefined;
      try{
        trx = await contratoLoteria.elegirGanador({from: administrador});
        console.log('Info Transaccion: ', trx);
        ganador = await contratoLoteria.getUltimoGanador();
        console.log('Ganador ', ganador);
      }
      catch(e){
        huboCatch = true;
        console.log(e);
      }
      assert.equal(huboCatch, false, 'Hubo algún error');
      assert.ok(trx);
      assert.ok(ganador);
    });
  });
});