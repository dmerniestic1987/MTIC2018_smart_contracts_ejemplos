const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compileApuesta'); 
let fetchedAccounts;
let apuesta; 
let apuestaDeployed;

before( async() => {
    fetchedAccounts = await web3.eth.getAccounts();
    apuesta = await new web3.eth.Contract(JSON.parse(interface))
                        .deploy({ 
                                data: bytecode,
                                arguments: [Date.now.valueOf()]
                                })
                        .send({
                            from: fetchedAccounts[0],
                            gas: '1000000'
                        });

    apuesta.setProvider(ganache.provider());
    apuestaDeployed = await new web3.eth.Contract( JSON.parse(interface)
                                                , apuesta.options.address);                    
});

describe('Prueba de apuestas', () =>{
    it('Deploy Apuesta', async () => {
        assert.ok(apuesta.options.address);
        console.log(apuesta);
    });

    it('Valor apostado', async () => {
        const message = await apuestaDeployed.methods.getValorPostado().call();
        console.log(message);
        assert.equal(message, 0);
    });

    it ('Abrir apuesta', async() => {
        await apuestaDeployed.methods.abrirApuesta().send({
                from: fetchedAccounts[1],
                value: 5000000,
                gas: 1000000
        });

        const message = await apuestaDeployed.methods.getValorPostado().call();
        console.log(message);
        assert.equal(message, 5000000);
    });

    it ('Aceptar Apuesta', async() => {
        await apuestaDeployed.methods.aceptarApuesta().send({
            from: fetchedAccounts[2],
            value: 5000000,
            gas: 1000000
        });

        const message = await apuestaDeployed.methods.getValorPostado().call();
        console.log(message);
        assert.equal(message, 5000000);
    });    
});