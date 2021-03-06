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
    KittyInterface kittyContract;

    function setKittyContractAddress(address _address) external onlyOwner {
        kittyContract = KittyInterface(_address);
    }

    function _triggerCooldown(Zombie storage _zombie) internal {
        _zombie.readyTime = uint32(now + cooldownTime);
    }

    function _isReady(Zombie storage _zombie) internal view returns (bool) {
        return (_zombie.readyTime <= now);
    }

    function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _species) public{
        require(msg.sender == zombieToOwner[_zombieId], "Zombi no corresponde al dueño");
        Zombie storage myZombie = zombies[_zombieId];
        require(_isReady(myZombie), "El zombi no terminó de enfriarse para la próxima comida");
        _targetDna = _targetDna % dnaModulus;
        uint newDna = (myZombie.dna + _targetDna) / 2;
        if (keccak256(abi.encodePacked(_species)) == keccak256("kitty")) {
            newDna = newDna - newDna % 100 + 99;
        }
        _createZombie("NoName", newDna);
        _triggerCooldown(myZombie);
    }
    
    function feedOnKitty(uint _zombieId, uint _kittyId) public {
        uint kittyDna;
        //Invocamos al método del contrato. Nótese que devuevle varios tipos datos
        (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
        feedAndMultiply(_zombieId, kittyDna, "kitty");
    }

}