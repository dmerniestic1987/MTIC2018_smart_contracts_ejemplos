/*
Ejemplo de Smart Contract ZombieFactory creado con el tutorial CryptoZombies.
Agrega el concepto de Evento, que permite informalre a la interfaz de usuario
cuando ocurrió algún evento en la Blockchain
*/
pragma solidity ^0.5.0;

contract ZombiFactory {

    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    mapping(uint => address) zombieToOwner;
    mapping(address => uint) ownerZombieCount;

    function _createZombie(string memory _name, uint _dna) internal {
        uint id = zombies.push(Zombie(_name, _dna)) - 1;
        //Guardamos el ID del zombi para saber quién es el dueño
        zombieToOwner[id] = msg.sender;

        //Incrementamos el contador de zombies
        ownerZombieCount[msg.sender]++;
        emit NewZombie(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256((abi.encodePacked(_str))));
        return rand % dnaModulus;
    }

    /*
    * Solo se puede crear un zombi por usuario
    */
    function createRandomZombie(string memory _name) public {
        require(ownerZombieCount[msg.sender] == 0, "Sólo se permite un zombi por usuario");
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

}