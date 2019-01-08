var ZombieFactory = artifacts.require("./ZombieFactory.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ZombieFactory);
};
