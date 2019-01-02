/*
Test unitario para interactuar con web3
*/
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

let fetchedAccounts;
before(async () => {
    //Devuelve una promesa que se resuelve con una lista. 
    //Tenemos que resolver la asincronía con la palabra "then" y con el "catch"
    //el manejo de errores
    fetchedAccounts = await web3.eth.getAccounts();
});

describe('Web3 - Cuentas y saldos - Test', () => {
    it('Observamos las cuentas', () =>{
        console.log(fetchedAccounts);    
        assert.equal(fetchedAccounts.length > 0, true);

        fetchedAccounts.forEach(cuenta => {
            //Consultamos los sados de todas las cuentas
            web3.eth.getBalance(cuenta).then(balance => {
                console.log(cuenta + ": "  + balance + " wei");
                assert.equal(balance > 0, true);        
            });    
        });
    });

    it('Transferencias entre cuentas', () => {
        web3.eth.sendTransaction({
            from: fetchedAccounts[0],
            to: fetchedAccounts[1],
            value: '500000'
        })
        .then(receipt => {
            console.log(receipt);
            web3.eth.getBalance(fetchedAccounts[1]).then(balance => {
                console.log(fetchedAccounts[1] + ": "  + balance + " wei");
                assert.equal(fetchedAccounts[1] > 0, true);        
            });  
        });                
    });
});
