/*
Ejemplo de creación de test unitarios de smart contracts con Mocha. 
Los pasos son: 
1. Deploy del contrato. 
2. Manipulación del contrato. 
3. Hacer el assert
Ejemplo tomado de: 
    Ethereum and Solidity: The Complete Developer's Guide de  Stephen Grider
    https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/
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

describe('Web3 - Cuentas y saldos', () => {
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
});
