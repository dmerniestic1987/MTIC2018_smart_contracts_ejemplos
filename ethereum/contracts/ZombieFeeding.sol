pragma solidity ^0.5.0;
import "./ZombiFactory.sol";

//Con esta interfaz nos podemos comunicar con el contrato de CryptoKitties.
//Esta firma salió del código fuente del contrato. Para utilizarlo necesitamos
//La dirección del contrato
contract KittyInterface {
  function getKitty(uint256 _id) external view returns (
    bool isGestating,
    bool isReady,
    uint256 cooldownIndex,
    uint256 nextActionAt,
    uint256 siringWithId,
    uint256 birthTime,
    uint256 matronId,
    uint256 sireId,
    uint256 generation,
    uint256 genes
  );
}

contract ZombieFeeding is ZombiFactory{
    //Obtenemos la dirección del contrato de CryptoKitties e inicializamos
    //la interfaz para poder comunicarnos
    address ckAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
    KittyInterface kittyContract = KittyInterface(ckAddress);

    function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _species) public{
        require(msg.sender == zombieToOwner[_zombieId], "Zombi no corresponde al dueño");
        Zombie storage myZombie = zombies[_zombieId];
        _targetDna = _targetDna % dnaModulus;
        uint newDna = (myZombie.dna + _targetDna) / 2;
        if (keccak256(abi.encodePacked(_species)) == keccak256("kitty")) {
            newDna = newDna - newDna % 100 + 99;
        }
        _createZombie("NoName", newDna);
    }
    
    function feedOnKitty(uint _zombieId, uint _kittyId) public {
        uint kittyDna;
        //Invocamos al método del contrato. Nótese que devuevle varios tipos datos
        (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
        feedAndMultiply(_zombieId, kittyDna, "kitty");
    }

}