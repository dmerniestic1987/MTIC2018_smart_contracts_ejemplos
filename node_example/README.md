# Smart Contracts - Node Example
Este ejemplo permite compilar y realizar el deploy de smart contracts a pulmón, es decir
sin un framework. En este proyecto creamos 2 smart contracts muy sencillos
escritos en Solidity y los compilamos con el compilador solc. Luego podemos realizar los
test unitarios escritos en javascript con Mocha.

## Objetivos
* Comprender la estructura más básica de un proyecto de smart contracts para ethereum.
* Realizar test unitarios de smart contracts.
* Realizar el deploy a una red pública de Ethereum, en este caso Rinkeby Testnet

## Organización
El proyecto tiene 2 directorios: 
* contracts: Donde están los smart contracts en solidity.
* test: Donde están los test unitarios escritos en javascript.
* release-candidate: Versiones estables para publicar los smart contract en redes públicas.


## Blockchain utilizadas
* Ethereum - Testnet Rinkeby

## Lenguajes
* Solidity
* javascript

## Instalación
```
npm install
```

## Compilación y Deploy
Una vez instalado ingresar al directorio ethereum
Para compilar:
```
node compile.js
node compileApuesta.js
```

Para compilar:
```
node deploy.js
```

## Ejecución de test unitarios
```
npm test
```
