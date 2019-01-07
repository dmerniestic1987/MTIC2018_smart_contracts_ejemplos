const assert = require('assert')
const CompraVenta = artifacts.require('CompraVenta')

describe('Test de Contrato CompraVenta', () => {
  contract('CompraVenta', accounts => {
    let ec;
    let comprador;
    let vendedor;

    before('setup contract', async () => {
      comprador = accounts[1];
      vendedor = accounts[2];
      ec = await CompraVenta.new(comprador, vendedor);
    });

    it('Test depositar', async () => {
      const balanceInicial= await ec.balance();
      const deposito = web3.utils.toWei('3', 'ether');
      
      await ec.depositar({from:comprador,value:deposito});
      const balanceDeposito = await ec.balance();
      
      console.log('Balance Inicial: ', balanceInicial)
      assert.equal(web3.utils.toWei('0', 'wei'), 0, 'Balance inicial debe ser 0');
      assert.equal(balanceDeposito, deposito, 'El balance debe concordr con el valor depositado'
      )
    });

    it('Test Aceptar Comprador', async () => {
        const balanceInicial= await ec.balance();
        console.log('Balance Inicial Aceptar 01: ' + balanceInicial);
        
        const compradorOkBefore= await ec.compradorOk();
        console.log('Antes de Aceptar - comprador OK: ' + compradorOkBefore);
        assert.equal(compradorOkBefore, false, 'No debería haber aceptado el comprador aún');

        await ec.aceptar({from:comprador});

        const compradorOkAfter = await ec.compradorOk();
        console.log('Antes de Aceptar - comprador OK: ' + compradorOkAfter);
        assert.equal(compradorOkAfter, true, 'Debería actaulizarse el estado del comprador');

      });

      it('Test Aceptar Vendedor', async () => {
        const balanceInicial= await ec.balance();
        const balanceInicialVendedor = await web3.eth.getBalance(vendedor);
        console.log('Balance Inicial Aceptar 02: ' + balanceInicial);
        
        const vendedorOkBefore= await ec.vendedorOk();
        console.log('Antes de Aceptar - Vendedor OK: ' + vendedorOkBefore);
        assert.equal(vendedorOkBefore, false, 'No debería haber aceptado el vendedor aún');

        await ec.aceptar({from:vendedor});

        const vendedorOkAfter = await ec.vendedorOk();
        console.log('Antes de Aceptar - vendedor OK: ' + vendedorOkAfter);
        assert.equal(vendedorOkAfter, true, 'Debería actaulizarse el estado del vendedor');

        const balanceFinal= await ec.balance();
        console.log('Balance Final Aceptar 02: ' + balanceFinal);
        assert.equal(balanceFinal, 0, 'Balance inicial debe ser 0');

        const balanceFinalVendedor = await web3.eth.getBalance(vendedor);
        console.log('Balance Inicial Vendedor: ' + balanceInicialVendedor);
        console.log('Balance Final Vendedor: ' + balanceFinalVendedor);
        assert.equal(balanceFinalVendedor > balanceInicialVendedor, true, 'El balance final del vendedor debe aumentar');

      });      

      it('Test Cancelar Comprador', async () => {
        const balanceInicial = await web3.eth.getBalance(comprador);
        console.log('Balance Inicial Cancelar 01: ' + balanceInicial);
        
        const deposito = web3.utils.toWei('2', 'ether');
        await ec.depositar({from:comprador,value:deposito});
        await ec.aceptar({from:comprador});

        const compradorOkBefore= await ec.compradorOk();
        console.log('Antes de Aceptar - comprador OK: ' + compradorOkBefore);
        assert.equal(compradorOkBefore, true, 'Dabe aceptar el comprador');

        
        await ec.cancelar({from:comprador});
        await ec.cancelar({from:vendedor});
        const compradorOkAfter = await ec.compradorOk();
        const vendedorOkAfter = await ec.vendedorOk();
        console.log('Después de Cancelar - comprador OK: ' + compradorOkAfter);
        assert.equal(compradorOkAfter, false, 'El comprador debió rechazar');
        assert.equal(vendedorOkAfter, false, 'El vendedor debió rechazar');

        const balanceFinal= await web3.eth.getBalance(comprador);
        console.log('Balance Final Aceptar 01: ' + balanceFinal);

      });       
  })
})