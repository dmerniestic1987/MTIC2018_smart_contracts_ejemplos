var ZombieHelper = artifacts.require("./ZombieHelper.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ZombieHelper);
};
