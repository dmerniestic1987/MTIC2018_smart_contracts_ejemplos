# Smart Contracts - Ejemplos - MTIC 2018
Ejemplos de diferentes tipos de smart contracts para blockchains públicas. 
Trabajo final - Maestría TIC cohorte 2018-2020 de la universidad UADE.
Diego Alejandro Mernies

## Objetivos
* Aprender los diferentes lenguajes de programación que se pueden utilizar para desarrollar smart contracts.
* Evaluar técnicamente la tecnología blockchain más apropiada para desarrollar Betex
* Documnetar el proceso de selección de la tecnología.

## Blockchain utilizadas

* Ethereum
* POA Network
* TRON
* EOS

## Lenguajes

* Solidity
* C++

## Instalación de herramientas de desarrollo
### Ethereum
Truffle es un framework que permite desarrollar dApps, aplicaciones descentralizadas, utilizando
la blockchain Ethereum. 
Requerimientos
* [Nodejs](https://nodejs.org/) - Javascript del lado del servidor y npm para gestión de dependencias.
* [Ganache](https://truffleframework.com/ganache) - Implementación local de blockchain Ethereum.
* [Truffle](https://truffleframework.com/) - Framework para desarrollo de Dapps, aplicaciones descentralizadas.

```
npm install truffle
```
Una vez instalado ingresar al directorio ethereum
Para compilar:
```
truffle compile
```

Para deploy en localhost configurar Ganache para que escuche en el puerto 8545
```
truffle migrate 
```

## Licencia
Este proyecto opera bajo la licencia MIT.