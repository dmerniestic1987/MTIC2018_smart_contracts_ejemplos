const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
const mnemotecnic = '....';
const endpoint = 'https://rinkeby.infura.io/v3/...';
const provider = new HDWalletProvider(mnemotecnic, endpoint);
const web3 = new Web3(provider);

//Definimos la función asincrónica para hacer el deploy
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Haciendo deploy con cuenta: ' , accounts[0]);
    
    //Estimamos el gas necesario par ahacer el deploy
    console.log('Se está estimando el gas');
    let gasDeploy = '2100000';
    await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode
            , arguments: ['Hola']})
    .estimateGas()
    .then(function(gasAmount){
        console.log('Gas estimado: ' + gasAmount); 
        gasDeploy = gasAmount;
    }) 
    .catch((error) => {
        console.log('** Error en Deploy: ', error);
    });    
    
    //Hacemos el deploy.  
    console.log('Está haciendo el deploy');
    
    let lastBlock = await web3.eth.getBlock("latest");
    console.log('Last Block: ' + JSON.stringify(lastBlock));

    const resutlDeploy = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode
            , arguments: ['Hola']})
    .send({ from: accounts[0]
          , gas: lastBlock.gasLimit });

    console.log('Contrato deployado: ' + resutlDeploy.options.address);        
}
deploy();