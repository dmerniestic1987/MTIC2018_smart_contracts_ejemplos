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
//importamos compile.js que está un nivel más arriba de la estructura de 
//directorios
const {interface, bytecode} = require('../compile'); 

let fetchedAccounts;
let inbox; 
before(async () => {
    //Devuelve una promesa que se resuelve con una lista. 
    //Tenemos que resolver la asincronía con la palabra "then" y con el "catch"
    //el manejo de errores
    fetchedAccounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Mensaje inicial de Inbox (constructor)']})
        .send({from: fetchedAccounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('Deploy del contrato', () =>{
        console.log(inbox);    
    });
});
