var ZombieFeeding = artifacts.require("./ZombieFeeding.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ZombieFeeding);
};
