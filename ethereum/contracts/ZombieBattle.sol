pragma solidity 0.5.0;

import "./ZombieHelper.sol";

contract ZombieBattle is ZombieHelper {
  uint randNonce = 0;

  function randMod(uint _modulus) internal returns(uint) {
    randNonce++;  
    return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % _modulus;
  }
}
