# Smart Contracts - Ejemplos con Solidity
Este ejemplo permite compilar y realizar el deploy de smart contracts con el framework
de desarrollo Truffle. Sólo nos focalizamos en el desarrollo de Smart Contracts con el 
lenguaje Solidity y los test unitarios con Mocha. 
Para estos ejemplos hicimos algunos contratos propios y luego seguimos el tutorial de
CryptoZombies. 

## Objetivos
* Comprender la utilización del framework Truffle.
* Profunizar en el lenguaje de programación Solidity.
* Realizar el deploy a una red pública de Ethereum, en este caso Rinkeby Testnet.

## Organización
El proyecto tiene 2 directorios: 
* contracts: Donde están los smart contracts en solidity.
* test: Donde están los test unitarios escritos en javascript.
* info_deploy: Un archivo con la direccciones de transacciones y contratos en Rinkeby.
* migrations: Archivos javascript que permite realizar el deploy.


## Blockchain utilizadas
* Ethereum - Testnet Rinkeby

## Lenguajes
* Solidity
* javascript

## Instalación
```
npm install -g truffle
npm install -g truffle-hdwallet-provider@web3-one
```

## Compilación y Deploy
Una vez instalado ingresar al directorio ethereum
Para compilar:
```
truffle compile
```

Para deploy:
```
truffle migrate --network rinkeby
```

## Ejecución de test unitarios
```
truffle test
```
